/**
 * converts an array to Object with array items as keys and values
 * @example ['books'] becomes { books: 'books' }
 * @param  {Array} keys  array of keys
 * @return {Object}      Object with keys and values mirrored
 */
export default (keys) => {
  keys = Array.isArray(keys) ? keys : Object.keys(keys);
  const mirror = {};
  keys.forEach((key) => {
    mirror[key] = key;
    return mirror;
  });
  return mirror;
};
