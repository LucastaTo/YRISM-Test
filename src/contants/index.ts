export const STATUS_CODE = {
    SUCCESS: 200,
    CREATE: 201
}

export const getYearsArray = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = 1975; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
};
