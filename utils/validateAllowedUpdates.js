export const validateAllowedUpdates = (allowedUpdates, updates) => {
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  return isValidUpdate;
};
