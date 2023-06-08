/**
 * mutates the original query object by adding custom filter query
 * @param query business query object
 * @param features field passed into the query params
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterFeatures = (query: any, features: string) => {
  let featuresArr: string[] = [];

  // if features is not passed, do not query by that field
  if (!features) return;

  featuresArr = features?.split(',');
  query.find({ features: { $all: featuresArr } });
};
