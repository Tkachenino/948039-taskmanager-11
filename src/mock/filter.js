const filterName = [`all`, `overdue`, `today`, `favorites`, `repeating`, `archive`];

export const generateFilter = () => {
  return filterName.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 48),
    };
  });
};

