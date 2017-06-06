import cssTransforms from '../../src/txt/cssTransforms';

describe('txt: cssTransforms', () => {
  test('block', () => {
    // expect(cssTransforms.block()).toEqual({ display: 'block' });
    // expect(cssTransforms.block({})).toEqual({ display: 'block' });
    // expect(cssTransforms.block({ display: 'block' })).toEqual({ display: 'block' });
    // expect(cssTransforms.block({ display: 'inline' })).toEqual({ display: 'inline-block' });
    // expect(cssTransforms.block({ display: 'inline-block' })).toEqual({ display: 'inline-block' });
    // expect(cssTransforms.block({ width: 100 })).toEqual({
    //   display: 'block', width: 100,
    // });
    // expect(cssTransforms.block({ display: 'block', width: 100 })).toEqual({
    //   display: 'block', width: 100,
    // });
    // expect(cssTransforms.block({ display: 'inline', width: 100 })).toEqual({
    //   display: 'inline-block', width: 100,
    // });
  });

  test('lineHeightPx', () => {
    // expect(cssTransforms.lineHeightPx()).toEqual({});
    // expect(cssTransforms.lineHeightPx({})).toEqual({});
    // expect(cssTransforms.lineHeightPx({ width: 100 })).toEqual({ width: 100 });
    // expect(cssTransforms.lineHeightPx({ fontSize: 20, lineHeight: 1.5 })).toEqual({
    //   fontSize: 20, lineHeight: '30px',
    // });
    // expect(cssTransforms.lineHeightPx({ fontSize: '20px', lineHeight: 1.5 })).toEqual({
    //   fontSize: '20px', lineHeight: '30px',
    // });
    // expect(cssTransforms.lineHeightPx({ fontSize: 20, lineHeight: '30px' })).toEqual({
    //   fontSize: 20, lineHeight: '30px',
    // });
    // expect(cssTransforms.lineHeightPx({ fontSize: '20px', lineHeight: '30px' })).toEqual({
    //   fontSize: '20px', lineHeight: '30px',
    // });
    // expect(cssTransforms.lineHeightPx({ fontSize: 20, lineHeight: 1.5, width: 100 })).toEqual({
    //   fontSize: 20, lineHeight: '30px', width: 100,
    // });
  });
});
