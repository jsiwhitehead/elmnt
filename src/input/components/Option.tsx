import * as React from 'react';
import r from 'refluent';

import css from '../../css';
import Div from '../../div';
import Txt from '../../txt';
import { restyle } from '../../utils';

import Marker from './Marker';

export default r
  .do('isSelected', 'isList', 'style.layout', (isSelected, isList, layout) => ({
    icon: isSelected && (isList || layout === 'modal' ? 'tick' : 'disc'),
  }))
  .do(
    restyle('isList', (isList, style) => {
      const base = style
        .merge(!isList ? { borderRadius: 1000 } : {})
        .scale({ iconSize: { fontSize: 0.9 } })
        .numeric('paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft');
      const padded =
        base.layout !== 'modal'
          ? base.merge({
              padding: Math.round(
                (base.paddingTop +
                  base.paddingRight +
                  base.paddingBottom +
                  base.paddingLeft) *
                  0.25,
              ),
            })
          : base;
      return {
        div: padded.filter('padding', 'background').merge({
          cursor: 'pointer',
          userSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          WebkitUserSelect: 'none',
          ...(padded.layout !== 'modal' && padded.layout !== 'table'
            ? { background: 'none', padding: 0 }
            : {}),
          ...(padded.layout === 'modal' ? { width: '100%' } : {}),
          ...(padded.layout === 'table' ? { background: 'none' } : {}),
        }),
        bar: padded
          .scale({
            spacing:
              padded.layout !== 'modal'
                ? { fontSize: 0.5 }
                : { paddingRight: 1 },
          })
          .filter('spacing')
          .merge({
            layout: 'bar',
            margin: padded.layout === 'table' && '0 auto',
          }),
        icon: padded
          .scale({
            fontSize: { iconSize: 1 },
            ...(padded.layout !== 'modal' ? { padding: 0.4 } : {}),
          })
          .scale({
            width: {
              iconSize: 1,
              ...(padded.layout !== 'modal'
                ? {
                    paddingLeft: 1,
                    paddingRight: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                  }
                : {}),
            },
          })
          .filter(
            'fontSize',
            'color',
            'background',
            'width',
            ...(padded.layout !== 'modal'
              ? ['padding', 'border', 'borderRadius', 'boxShadow']
              : []),
          ),
        text: padded.filter(...css.groups.text),
      };
    }),
  )
  .yield(({ text, icon, style }) => (
    <div style={style.div}>
      <Div style={style.bar}>
        <Marker type={icon} style={style.icon} />
        {text && <Txt style={style.text}>{text}</Txt>}
      </Div>
    </div>
  ));
