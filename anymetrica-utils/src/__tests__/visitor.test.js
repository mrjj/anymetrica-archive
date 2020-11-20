const { visitor, visitorAsync } = require('../utils/visitor');

const GET_INPUT_DATA_TREE = () => ({
  ak: 'av',
  bk: 'bv',
  c: 3,
  nestedArr: [
    'item1',
    {
      suba: 'subav',
      subb: [
        null,
      ],
    },
  ],
});

const REFERENSE = {
  ak: 'av',
  bk: 'bv',
  c: 3,
  endk: 'endv',
  nestedArr: [
    'item1',
    {
      endk: 'endv',
      suba: 'subav',
      subb: [
        null,
        'ending',
      ],
    },
    'ending',
  ],
};

const VISIT_PRE_SYNC = (v) => {
  if (!v) {
    return v;
  }
  if (Array.isArray(v)) {
    return [...v, 'ending'];
  }
  if (typeof v === 'object') {
    return {
      ...v,
      endk: 'endv',
    };
  }
  return v;
};

const VISIT_PRE_ASYNC = async (v) => {
  if (!v) {
    return v;
  }
  if (Array.isArray(v)) {
    return [...v, 'ending'];
  }
  if (typeof v === 'object') {
    return {
      ...v,
      endk: 'endv',
    };
  }
  return v;
};

describe('blobStore', () => {
  test('visitor is working with root object', () => {
    expect(
      visitor(GET_INPUT_DATA_TREE(), VISIT_PRE_SYNC),
    ).toEqual(REFERENSE);
  });

  test('visitor is working with root array', () => {
    expect(
      visitor([GET_INPUT_DATA_TREE()], VISIT_PRE_SYNC),
    ).toEqual([REFERENSE, 'ending']);
  });

  test('async visitor is working', async () => {
    expect(await visitorAsync(GET_INPUT_DATA_TREE(), VISIT_PRE_ASYNC)).toEqual(REFERENSE);
  }, 300);
});
