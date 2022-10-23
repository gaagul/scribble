export const buildNewCategoryOptions = (categories, selectedCategory) =>
  categories
    .filter(category => category.id !== selectedCategory.id)
    .map(category => ({ label: category.title, value: category.id }));
