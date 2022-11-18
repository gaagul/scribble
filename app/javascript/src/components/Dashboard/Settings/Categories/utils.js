import dayjs from "dayjs";

export const formatWithShortDate = dateTime => dayjs(dateTime).fromNow();

export const formatWithDayAndDate = dateTime =>
  dayjs(dateTime).format("dddd, hh:mmA");

export const buildNewCategoryOptions = (categories, selectedCategory) =>
  categories
    .filter(category => category.id !== selectedCategory.id)
    .map(category => ({ label: category.title, value: category.id }));
