import transforms from '../../src/txt/transforms';

describe('txt: transforms', () => {

  test('block', () => {

    expect(transforms.block()).toEqual({ display: 'block' });
    expect(transforms.block({})).toEqual({ display: 'block' });

    expect(transforms.block({ display: 'block' })).toEqual({ display: 'block' });
    expect(transforms.block({ display: 'inline' })).toEqual({ display: 'inline-block' });
    expect(transforms.block({ display: 'inline-block' })).toEqual({ display: 'inline-block' });

    expect(transforms.block({ width: 100 })).toEqual({
      display: 'block', width: 100,
    });
    expect(transforms.block({ display: 'block', width: 100 })).toEqual({
      display: 'block', width: 100,
    });
    expect(transforms.block({ display: 'inline', width: 100 })).toEqual({
      display: 'inline-block', width: 100,
    });

  });

  test('lineHeightPx', () => {

    expect(transforms.lineHeightPx()).toEqual({});
    expect(transforms.lineHeightPx({})).toEqual({});
    expect(transforms.lineHeightPx({ width: 100 })).toEqual({ width: 100 });

    expect(transforms.lineHeightPx({ fontSize: 20, lineHeight: 1.5 })).toEqual({
      fontSize: 20, lineHeight: '30px',
    });
    expect(transforms.lineHeightPx({ fontSize: '20px', lineHeight: 1.5 })).toEqual({
      fontSize: '20px', lineHeight: '30px',
    });
    expect(transforms.lineHeightPx({ fontSize: 20, lineHeight: '30px' })).toEqual({
      fontSize: 20, lineHeight: '30px',
    });
    expect(transforms.lineHeightPx({ fontSize: '20px', lineHeight: '30px' })).toEqual({
      fontSize: '20px', lineHeight: '30px',
    });

    expect(transforms.lineHeightPx({ fontSize: 20, lineHeight: 1.5, width: 100 })).toEqual({
      fontSize: 20, lineHeight: '30px', width: 100,
    });

  });

});
