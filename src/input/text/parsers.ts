import { Obj } from 'mishmash';

import { DateExtraProps } from '../typings';

import Parser from './Parser';

const parsers = {} as Obj<Parser<any>>;

parsers.text = new Parser<string>(text => ({ value: text }));

parsers.textlist = new Parser<string[]>(text => {
  const value = text.split(',').map(s => s.trim());
  return { value };
}, {
  format: value => value.join(',\n'),
});

parsers.int = new Parser<number>(text => {
  const t = text.replace(/[^\d]/g, '');
  return { value: t ? parseInt(t, 10) : null, text: t };
});

export interface FloatConfig {
  point?: boolean;
  zeros?: number;
};
const formatFloat = (value, { point = false, zeros = 0 }: FloatConfig) =>  (
  `${value === null ? '' : `${value}`}${point ? '.' : ''}${Array(zeros + 1).join('0')}`
);
parsers.float = new Parser<number, FloatConfig>(text => {

  const cleanValue = (text || '').replace(/[^\d\.]/g, '').replace(/\.+/g, '.');
  if (cleanValue) {
    const config: FloatConfig = {};
    const pointPosition = cleanValue.indexOf('.');
    if (pointPosition === (cleanValue.length - 1)) {
      config.point = true;
    } else if (pointPosition !== -1) {
      config.point = !!cleanValue.match(/\.0+\.?$/);
      config.zeros = ((cleanValue.match(/(0+)\.?$/) || [])[1] || []).length;
    }
    const value = parseFloat(`0${cleanValue}`);
    return { value, config, text: formatFloat(value, config) };
  }

  return { value: null, text: '' };

}, {
  format: formatFloat,
});

export interface DateConfig {
  padDate?: boolean;
  padMonth?: boolean;
  fullYear?: boolean;
};
const padString = (s, pad) => (pad && !s[1] ? `0${s}` : s);
parsers.date = new Parser<Date, DateConfig, DateExtraProps>((text, { noDay }) => {

  const v = text.replace(/[^\d\/]/g, '');
  const dateSplit = v.split('/');
  if (dateSplit.length === (noDay ? 2 : 3)) {
    const [dStr, mStr, yStr] = noDay ? ['01', dateSplit[0], dateSplit[1]] : dateSplit;

    const dd = +dStr;
    const mm = +mStr - 1;
    let yy = +yStr;
    if (yStr.length === 2) yy += (yy < 30) ? 2000 : 1900;

    const config: DateConfig = {
      padDate: dStr.length >= 2,
      padMonth: mStr.length >= 2,
      fullYear: yStr.length >= 4,
    };

    const date = new Date(yy, mm, dd);
    if (
      (date.getDate() === dd) && (date.getMonth() === mm) &&
      (date.getFullYear() === yy) && (yy > 999) && (yy < 2100)
    ) {
      return { value: date, config, text: v };
    }
  }

  return { value: null, text: v };

}, {

  format: (value, { padDate = true, padMonth = true, fullYear = false }, { noDay }) => {
    const dd = padString(value.getDate().toString(), padDate);
    const mm = padString((value.getMonth() + 1).toString(), padMonth);
    let yy = value.getFullYear().toString();
    if (!fullYear) { yy = yy.substring(2); }
    return noDay ? `${mm}/${yy}` : `${dd}/${mm}/${yy}`;
  },

  equals: ((a, b) => a.getTime() === b.getTime()),

});

export default parsers;
