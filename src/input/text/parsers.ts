const padString = (s, pad) => (pad && !s[1] ? `0${s}` : s);

interface DateOptions {
  padDate: boolean;
  padMonth: boolean;
  fullYear: boolean;
}
export interface DateProps {
  noDay: boolean;
}

const formatNull = (func: (v, ...args) => string) => (
  (v, ...args) => v === null ? '' : func(v, ...args)
);

export default {

  text: {
    format: formatNull((value: string) => value),
    parse: (text: string) => ({ value: text, text }),
  },

  int: {
    format: formatNull((value: number) => `${value}`),
    parse: (text: string) => {
      const t = text.replace(/[^\d]/g, '');
      const value = t ? parseInt(t, 10) : null;
      return { value, text: value === null ? '' : `${value}` };
    },
  },

  float: {
    format: formatNull((value: number) => `${value}`),
    parse: (text: string) => {

      let value: number | null = null;
      let point = false;
      let zeros = 0;

      const cleanValue = (text || '').replace(/[^\d\.]/g, '').replace(/\.+/g, '.');
      if (cleanValue) {
        const pointPosition = cleanValue.indexOf('.');
        if (pointPosition === (cleanValue.length - 1)) {
          point = true;
        } else if (pointPosition !== -1) {
          point = !!cleanValue.match(/\.0+\.?$/);
          zeros = ((cleanValue.match(/(0+)\.?$/) || [])[1] || []).length;
        }
        value = parseFloat(`0${cleanValue}`);
      }

      return {
        value,
        text: `${value === null ? '' : `${value}`}${point ? '.' : ''}${Array(zeros + 1).join('0')}`,
      };
    }
  },

  date: {
    allowNull: true,
    format: formatNull((
      value: Date,
      { padDate = true, padMonth = true, fullYear = false }: DateOptions,
      { noDay }: DateProps,
    ) => {
      const dd = padString(value.getDate().toString(), padDate);
      const mm = padString((value.getMonth() + 1).toString(), padMonth);
      let yy = value.getFullYear().toString();
      if (!fullYear) { yy = yy.substring(2); }
      return noDay ? `${mm}/${yy}` : `${dd}/${mm}/${yy}`;
    }),
    parse: (text: string, { noDay }: DateProps) => {

      let options = { padDate: true, padMonth: true, fullYear: false };

      const v = text.replace(/[^\d\/]/g, '');
      const dateSplit = v.split('/');
      if (dateSplit.length === (noDay ? 2 : 3)) {
        const [dStr, mStr, yStr] = noDay ? ['01', dateSplit[0], dateSplit[1]] : dateSplit;

        const dd = +dStr;
        const mm = +mStr - 1;
        let yy = +yStr;
        if (yStr.length === 2) yy += (yy < 30) ? 2000 : 1900;

        options = {
          padDate: dStr.length >= 2,
          padMonth: mStr.length >= 2,
          fullYear: yStr.length >= 4,
        };

        const date = new Date(yy, mm, dd);
        if (
          (date.getDate() === dd) && (date.getMonth() === mm) &&
          (date.getFullYear() === yy) && (yy > 999) && (yy < 2100)
        ) {
          return { value: date, text: v || '', options };
        }
      }
      return { value: null, text: v || '', options };

    },
  },

  textlist: {
    format: formatNull((value: string[]) => value.join(',\n')),
    parse: (text: string) => {
      const value = text.split(',').map(s => s.trim());
      return { value, text };
    },
  },

}
