import isEqual from 'lodash.isequal';
import findIndexes from 'find-indices';

export default (array, comparator = isEqual, options = {}) => {
  if (array.length === 0) {
    return [];
  }

  const visited = new Set();

  const search = (current, duplicates) => {
    if (current >= array.length) {
      return duplicates;
    }

    if (!visited.has(current)) {
      const value = array[current];
      const predicate = comparator.bind(null, value);
      const indexes = findIndexes(array, predicate, current + 1);
      if (indexes.length > 0) {
        duplicates.push([current, ...indexes]);
        indexes.forEach(index => visited.add(index));
      }
    }

    return search(current + 1, duplicates);
  };

  return search(0, []);
};
