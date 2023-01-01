// Provides the union of all the values of an object type T
// Eg: if T = {name: 'hello', age: 12}, ValueOf<T> returns "hello" | 12
export type ValueOf<T> = T[keyof T];
