interface AddOrRemoveProps {
  <T extends string | number>(_array: T[], _value: T): T[];
}

/**
 * Adds item to the array if item is not present in the array
 * and removes item if item is present in the array
 * @param array Array to mutate
 * @param item Value to add or remove
 * @returns mutated array
 */
const addOrRemove: AddOrRemoveProps = (array, item) => {
  if (array.includes(item)) {
    return array.filter((val) => val !== item);
  } else {
    return [...array, item];
  }
};

export default addOrRemove;
