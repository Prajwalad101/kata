// Provides sorting type for keys of a given object
// Eg: {name: string, age: number} => "name" | "-name" | "age" | "-age"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SortBy<T extends { [key: string]: any }> =
  | `${string & keyof T}`
  | `-${string & keyof T}`;
