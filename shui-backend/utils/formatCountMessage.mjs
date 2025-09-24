export const formatCountMessage = (count, singular, plural) => {
  const word = count === 1 ? singular : plural || `${singular}s`;
  const verb = count === 1 ? "is" : "are";
  return `There ${verb} ${count} ${word}`;
};
