export const parseDate = (rawDate: Date) => {
  const year = rawDate.getFullYear();
  const month = rawDate.getMonth();
  const date = rawDate.getDate();
  const day = rawDate.getDay();

  return {
    year,
    month,
    date,
    day,
  };
};
