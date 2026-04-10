const ctx = require.context('.', true, /module\.js?$/);

const loadedModules = ctx.keys().map((key, index) => {
  const mod = ctx(key);
  const vector = mod.default || mod;

  return {
    ...vector,
    __originalIndex: index,
  };
});

const modules = [...loadedModules].sort((a, b) => {
  const aHasOrder = Number.isFinite(a.displayOrder);
  const bHasOrder = Number.isFinite(b.displayOrder);

  // ordered ones come before unordered ones
  if (aHasOrder && !bHasOrder) return -1;
  if (!aHasOrder && bHasOrder) return 1;

  // both have displayOrder -> sort by it
  if (aHasOrder && bHasOrder) {
    if (a.displayOrder !== b.displayOrder) {
      return a.displayOrder - b.displayOrder;
    }

    // duplicate displayOrder -> keep original load order
    return a.__originalIndex - b.__originalIndex;
  }

  // neither has displayOrder -> keep original load order
  return a.__originalIndex - b.__originalIndex;
});

export const VECTORS = Object.fromEntries(
  modules.map(({ __originalIndex, ...m }) => [m.id, m])
);

export const ALL_VECTORS = modules.map(({ __originalIndex, ...m }) => m);

export function getVector(id) {
  if (id && VECTORS[id]) return VECTORS[id];
  return ALL_VECTORS[0];
}
