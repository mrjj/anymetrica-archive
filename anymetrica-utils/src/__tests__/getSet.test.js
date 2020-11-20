/**
 * @fileOverview Example test of third-party
 * Taken from https://github.com/micro-js/;
 */

const get = require('lodash.get');
const set = require('lodash.set');


describe('get', () => {
  test('should get property using string', () => {
    const obj = { foo: 'bar' };
    expect(get(obj, 'foo')).toEqual('bar');
  });

  test('should get property using array', () => {
    const obj = { foo: 'bar' };
    expect(get(obj, ['foo'])).toEqual('bar');
  });

  test('should get nested property using string', () => {
    const obj = { foo: { bar: 'baz' } };
    expect(get(obj, 'foo.bar')).toEqual('baz');
  });

  test('should get nested property using array', () => {
    const obj = { foo: { bar: 'baz' } };
    expect(get(obj, ['foo', 'bar'])).toEqual('baz');
  });
});
describe('set', () => {
  test('should work', () => {
    let obj = { a: { b: 1 } };
    let newObj = set(obj, 'a.b', 2);

    expect(obj.a.b).toEqual(2);
    expect(newObj.a.b).toEqual(2);
    expect(obj).toEqual(newObj);

    obj = { a: 1 };
    newObj = set(obj, 'a', 2);

    expect(obj.a).toEqual(2);
    expect(newObj.a).toEqual(2);
    expect(obj).toEqual(newObj);
  });

  test('should create new objects for sub-paths that dont exist yet', () => {
    const obj = {};
    const newObj = set(obj, 'a.b.c', 1);

    expect(newObj.a.b.c).toEqual(1);
  });
});
