import findIndexes from '../src';

const numbers = [1, 2, 3, 2, 5, 5, 6, 7, 2];
const mixedSet = [{ v: 1 }, 1, 5, 6, { v: 1 }, [1], 7, [1], []];
const users = [
  { id: 1, name: 'Jon' },
  { id: 2, name: 'Fred' },
  { id: 3, name: 'Bob' },
  { id: 2, name: 'Jon' },
  { id: 4, name: 'Mike' },
  { id: 2, name: 'Fred' },
  { id: 1, name: 'Jon' },
];

it('should work with a default `comparator`', async () => {
  expect(findIndexes([])).toEqual([]);
  expect(findIndexes(numbers)).toEqual([[1, 3, 8], [4, 5]]);
  expect(findIndexes(mixedSet)).toEqual([[0, 4], [5, 7]]);
  expect(findIndexes(users)).toEqual([[0, 6], [1, 5]]);
});

it('should work with a custom `comparator`', async () => {
  expect(findIndexes([], () => true)).toEqual([]);

  const comparator1 = (a, b) => a.id === b.id;
  expect(findIndexes(users, comparator1)).toEqual([[0, 6], [1, 3, 5]]);

  const comparator2 = (a, b) => a.name === b.name;
  expect(findIndexes(users, comparator2)).toEqual([[0, 3, 6], [1, 5]]);

  const comparator3 = (a, b) => Array.isArray(a) && Array.isArray(b);
  expect(findIndexes(mixedSet, comparator3)).toEqual([[5, 7, 8]]);

  const comparator4 = (a, b) => a === b;
  expect(findIndexes(mixedSet, comparator4)).toEqual([]);
});
