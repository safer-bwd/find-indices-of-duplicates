import findIndexes from '../src';

const users = [
  { id: 1, name: 'Jon' },
  { id: 2, name: 'Fred' },
  { id: 3, name: 'Bob' },
  { id: 2, name: 'Jon' },
  { id: 4, name: 'Mike' },
  { id: 2, name: 'Fred' },
  { id: 1, name: 'Jon' },
  { id: 1, name: 'Jon' },
];

it('should work with a default `comparator`', async () => {
  expect(findIndexes([])).toEqual([]);
  expect(findIndexes(users)).toEqual([[0, 6, 7], [1, 5]]);
});

it('should work with a custom `comparator`', async () => {
  expect(findIndexes([], () => true)).toEqual([]);
  const comparator1 = (a, b) => a.id === b.id;
  expect(findIndexes(users, comparator1)).toEqual([[0, 6, 7], [1, 3, 5]]);
  const comparator2 = (a, b) => a.name === b.name;
  expect(findIndexes(users, comparator2)).toEqual([[0, 3, 6, 7], [1, 5]]);
});

it('should work with a positive option `fromIndex`', async () => {
  expect(findIndexes(users, undefined, { fromIndex: 1 })).toEqual([[1, 5], [6, 7]]);
  expect(findIndexes(users, undefined, { fromIndex: 4 })).toEqual([[6, 7]]);
});
