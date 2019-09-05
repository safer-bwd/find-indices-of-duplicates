import isEqual from 'lodash.isequal';
import findIndexes from 'find-indices';

/**
 * @name find-indices-of-duplicates
 * @param {Array} array The array to search
 * @param {Function} [comparator=lodash.isequal] The compare function
 * @param {Object} [options = {}]
 * @param {number} [options.fromIndex=0] The index to search from
 * @param {boolean} [options.onlyFirstSet=false] The flag, if true only the first set is returned
 * @param {boolean} [options.onlyFirst=false] The flag, if true only the first duplicate is returned
 * @return {Array<Array>} The array of found indexes sets
 * @example
 * import findIndexesOfDuplicates from 'find-indices-of-duplicates';
 *
 * const users = [
 *  { id: 1, name: 'Jon' },
 *  { id: 2, name: 'Fred' },
 *  { id: 3, name: 'Bob' },
 *  { id: 2, name: 'Jon' },
 *  { id: 4, name: 'Mike' },
 *  { id: 2, name: 'Fred' },
 *  { id: 1, name: 'Jon' },
 * ];
 *
 * findIndexesOfDuplicates(users); // [[0, 6], [1, 5]]
 *
 * const comparator = (user1, user2) => user1.id === user2.id
 * findIndexesOfDuplicates(users, comparator); // [[0, 6], [1, 3, 5]]
 * */
export default (array, comparator = isEqual, options = {}) => {
  if (array.length === 0) {
    return [];
  }

  const {
    fromIndex = 0,
    onlyFirstSet = false,
    onlyFirst = false
  } = options;

  const visited = new Set();

  const search = (current, duplicates) => {
    if (current >= array.length) {
      return duplicates;
    }

    if ((onlyFirstSet || onlyFirst) && duplicates.length > 0) {
      return duplicates;
    }

    if (!visited.has(current)) {
      const value = array[current];
      const predicate = comparator.bind(null, value);
      const limit = onlyFirst ? 1 : -1;
      const indexes = findIndexes(array, predicate, current + 1, limit);
      if (indexes.length > 0) {
        duplicates.push([current, ...indexes]);
        indexes.forEach(index => visited.add(index));
      }
    }

    return search(current + 1, duplicates);
  };

  return search(fromIndex, []);
};
