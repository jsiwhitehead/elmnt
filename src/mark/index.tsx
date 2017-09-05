import * as React from 'react';
import * as commonmark from 'commonmark';
import * as CommonmarkRenderer from 'commonmark-react-renderer';
import { cssGroups, CSSTree, mapStyle, memoize } from 'mishmash';
import { compose } from 'recompose';

import Div from '../div';
import Txt from '../txt';

const parser = new commonmark.Parser();
const buildRenderer = memoize(
  style =>
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
          <a
            href={href}
            {...(((/https?:\/\/([^\/]+)/.exec(href) || [])[1] ||
              location.host) !== location.host
              ? { target: '_blank' }
              : {})}
            style={style.link}
            key={nodeKey}
          >
            {children}
          </a>
        ),
        paragraph: ({ nodeKey, children }) => (
          <Txt style={style.text} key={nodeKey}>
            {children}
          </Txt>
        ),
        heading: ({ nodeKey, children }) => <Txt key={nodeKey}>{children}</Txt>,
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
              } as any,
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
);

export interface MarkProps {
  content?: string;
  style?: CSSTree<'em' | 'st' | 'link' | 'list' | 'hr'>;
}
export default compose<any, MarkProps>(
  mapStyle([
    ['defaults', { fontSize: 16, lineHeight: 1.5, color: 'black' }],
    ['expandFor', 'fontSize'],
    ['scale', { lineGap: { fontSize: -1, lineHeight: 1 } }],
  ]),
  mapStyle(
    ['style.fontSize', 'style.color', 'style.lineGap'],
    (fontSize, color, lineGap) => ({
      div: [
        ['filter', ...cssGroups.box, ...cssGroups.other],
        ['merge', { layout: 'stack', spacing: lineGap * 3 }],
      ],
      text: [['filter', ...cssGroups.text]],
      em: [
        ['defaults', { fontStyle: 'italic' }],
        ['mergeKeys', 'em'],
        ['filter', ...cssGroups.text],
      ],
      st: [
        ['defaults', { fontWeight: 'bold' }],
        ['mergeKeys', 'st'],
        ['filter', ...cssGroups.text],
      ],
      link: [
        ['defaults', { fontWeight: 'bold', textDecoration: 'underline' }],
        ['mergeKeys', 'link'],
        ['filter', ...cssGroups.text],
      ],
      item: [
        ['filter', ...cssGroups.text],
        ['merge', { padding: `${lineGap * 0.5}px 0` }],
      ],
      list: [
        ['filter', ...cssGroups.text],
        ['scale', { paddingLeft: { fontSize: 2 } }],
        ['merge', { margin: `${lineGap * -0.5 - 1}px 0` }],
      ],
      image: [['merge', { display: 'block', padding: `${lineGap * 0.5}px 0` }]],
      hr: [
        [
          'defaults',
          {
            height: Math.round(parseFloat(fontSize) * 0.2),
            background: color,
          },
        ],
        ['mergeKeys', 'hr'],
      ],
    }),
  ),
)(({ content, style }) => (
  <Div style={style.div}>
    {buildRenderer(style).render(parser.parse(content || ''))}
  </Div>
));
