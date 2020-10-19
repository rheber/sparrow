const deleteFirstWhere = <T>(arr: T[], pred: (item: T) => boolean) => {
  const matchIdx = arr.findIndex(pred);
  arr.splice(matchIdx, 1);
};

export {
  deleteFirstWhere,
};
