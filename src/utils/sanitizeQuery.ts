const sanitizeQuery = (query: string) => {
  const escaped = query?.replace(/[^a-zA-Z0-9]/g, '');
  return Math.abs(parseInt(escaped, 10));
};

export { sanitizeQuery };
