export const fetchBusinesses = async (queryURL: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/business?${queryURL}`
  );

  const data = await response.json();

  // check for error response
  if (!response.ok) {
    const error = data;
    throw new Error(error);
  }
  return data;
};
