import dayjs from "dayjs";

export const formatWithFromNow = dateTime => dayjs(dateTime).fromNow();

export const formatWithDayAndDate = dateTime => dayjs(dateTime).format(`LLLL`);

export const buildNewCategoryOptions = (categories, selectedCategory) =>
  categories
    .filter(category => category.id !== selectedCategory.id)
    .map(category => ({ label: category.title, value: category.id }));

export const filterArticles = (selectedArticles, newArticle) => {
  const index = selectedArticles.indexOf(newArticle);
  const arr = [...selectedArticles];
  if (index === -1) {
    arr.push(newArticle);
  } else {
    arr.splice(index, 1);
  }

  return arr;
};
