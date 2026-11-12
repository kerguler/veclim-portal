const lastTab = {};

export const rememberPanelTab = (itemKey, index) => {
  if (!itemKey || !Number.isInteger(index)) return;
  lastTab[itemKey] = index;
};

export const recallPanelTab = (itemKey) => lastTab[itemKey] ?? 0;
