export const keyPress = (e, action) => {
  if (e.key === "Enter" || (e.key === "Enter" && e.shiftKey === true)) {
    action();
  }
};
