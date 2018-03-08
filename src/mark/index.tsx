import * as React from 'react';
import * as commonmark from 'commonmark';
import * as CommonmarkRenderer from 'commonmark-react-renderer';
import m, { Comp } from 'mishmash';
import * as memoize from 'fast-memoize';
import st, { CSSTree } from 'style-transform';

import css from '../css';
import Div from '../div';
import Txt from '../txt';

const regex = {
  email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  url: /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?/gi,
};

const getLinkProps = (href: string, domain?: string) => {
  const currentDomain =
    domain || (typeof window !== 'undefined' && window.location.host) || '';
  const [hrefDomain, hrefPath] = (
    href.match(/https?:\/\/([^\/]+)(.*)/) || []
  ).slice(1);
  const isExternal =
    (hrefDomain && hrefDomain !== currentDomain) || href.startsWith('mailto:');
  return {
    href: (!isExternal && hrefPath) || href,
    ...(isExternal ? { target: '_blank' } : {}),
  };
};

const parser = new commonmark.Parser();
const buildRenderer = memoize(
  (style, domain) =>
    new CommonmarkRenderer({
      allowedTypes: [
        'text',
        'softbreak',
        'linebreak',
        'emph',
        'strong',
        'link',
        'paragraph',
        'heading',
        'item',
        'list',
        'image',
        'thematic_break',
        'html_block',
      ],
      renderers: {
        softbreak: ({ nodeKey }) => <br key={nodeKey} />,
        emph: ({ nodeKey, children }) => (
          <span style={style.em} key={nodeKey}>
            {children}
          </span>
        ),
        strong: ({ nodeKey, children }) => (
          <span style={style.st} key={nodeKey}>
            {children}
          </span>
        ),
        link: ({ href, nodeKey, children }) => (
          <a {...getLinkProps(href, domain)} style={style.link} key={nodeKey}>
            {children}
          </a>
        ),
        paragraph: ({ nodeKey, children }) => (
          <Txt style={style.text} key={nodeKey}>
            {children}
          </Txt>
        ),
        heading: ({ level, nodeKey, children }) => (
          <Txt style={style[`h${Math.min(level, 4)}`]} key={nodeKey}>
            {children}
          </Txt>
        ),
        item: ({ nodeKey, children }) => (
          <li key={nodeKey}>
            <Txt style={style.item}>{children}</Txt>
          </li>
        ),
        list: ({ type, start, nodeKey, children }) => (
          <div style={{ padding: '1px 0' }}>
            {React.createElement(
              type.toLowerCase() === 'bullet' ? 'ul' : 'ol',
              {
                start: start !== null ? start : undefined,
                style: {
                  ...style.list,
                  listStyleType:
                    type.toLowerCase() === 'bullet' ? 'disc' : 'decimal',
                },
                key: nodeKey,
              },
              children,
            )}
          </div>
        ),
        image: ({ src, alt, nodeKey }) => (
          <img src={src} alt={alt} style={style.image} key={nodeKey} />
        ),
        thematic_break: ({ nodeKey }) => <div style={style.hr} key={nodeKey} />,
      },
      softBreak: 'br',
    }),
  (...args) => JSON.stringify(args),
);

export interface MarkProps {
  domain?: string;
  style?: CSSTree<'em' | 'st' | 'link' | 'heading' | 'hr'>;
  children?: string;
}
export default m.merge('style', style => {
  const base = st(style)
    .defaults({ fontSize: 16, lineHeight: 1.5, color: 'black' })
    .numeric('fontSize')
    .scale({ lineGap: { fontSize: -1, lineHeight: 1 } });

  const heading = st(base)
    .filter(
      ...css.groups.text.filter(k => k !== 'font'),
      'fontStyle',
      'fontVariant',
      'fontWeight',
      'fontStretch',
      'lineHeight',
      'fontFamily',
    )
    .defaults({
      fontSize: (base.fontSize as number) * 2,
      fontWeight: 'bold',
    })
    .mergeKeys('heading')
    .numeric('fontSize');
  const headingScale = Math.pow(
    (heading.fontSize as number) / (base.fontSize as number),
    1 / 4,
  );
  const getHeadingSize = (pow: number) =>
    Math.round((base.fontSize as number) * Math.pow(headingScale, pow));

  return {
    style: {
      div: st(base)
        .filter(...css.groups.box, ...css.groups.other)
        .merge({ layout: 'stack', spacing: Math.round(base.lineGap * 3) }),
      text: st(base).filter(...css.groups.text),
      em: st(base)
        .defaults({ fontStyle: 'italic' })
        .mergeKeys('em')
        .filter(...css.groups.text)
        .merge({ fontSize: 'inherit' }),
      st: st(base)
        .defaults({ fontWeight: 'bold' })
        .mergeKeys('st')
        .filter(...css.groups.text)
        .merge({ fontSize: 'inherit' }),
      link: st(base)
        .defaults({ fontWeight: 'bold', textDecoration: 'underline' })
        .mergeKeys('link')
        .filter(...css.groups.text)
        .merge({ fontSize: 'inherit' }),
      h1: heading,
      h2: heading.merge({ fontSize: getHeadingSize(3) }),
      h3: heading.merge({ fontSize: getHeadingSize(2) }),
      h4: heading.merge({ fontSize: getHeadingSize(1) }),
      item: st(base)
        .filter(...css.groups.text)
        .merge({ padding: `${Math.round(base.lineGap * 0.5)}px 0` }),
      list: st(base)
        .filter(...css.groups.text)
        .scale({ paddingLeft: { fontSize: 2 } })
        .merge({ margin: `${Math.round(base.lineGap * -0.5) - 1}px 0` }),
      image: st(base).merge({
        display: 'block',
        margin: `${Math.round(base.lineGap * 0.5)}px 0`,
      }),
      hr: st(base)
        .defaults({
          height: Math.round((base.fontSize as number) * 0.2),
          background: base.color,
          margin: `${Math.round(base.lineGap * 1)}px 0`,
        })
        .mergeKeys('hr'),
    },
  };
})(({ domain, style, children }) => (
  <Div style={style.div}>
    {buildRenderer(style, domain).render(
      parser.parse(
        (children || '').replace(regex.url, (match, i) => {
          const end =
            match.length -
            match
              .split('')
              .reverse()
              .findIndex(c => !'.,!?\'":;-)]'.includes(c));
          const m = match.slice(0, end);
          const pre = (children || '').substring(0, i).trim();
          const post = (children || '').substring(i + m.length).trim();

          if (
            (pre.slice(-2) === '](' && post[0] === ')') ||
            (pre.slice(-1) === '"' && post[0] === '"')
          ) {
            return match;
          }
          return `[${m}](${
            regex.email.test(m) ? 'mailto:' : ''
          }${m})${match.slice(end)}`;
        }),
      ),
    )}
  </Div>
)) as Comp<MarkProps>;
