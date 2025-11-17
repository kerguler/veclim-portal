// CRA/webpack: require.context lets us load every */module.js automatically.
const ctx = require.context('./', true, /module\.js?$/);
const modules = ctx.keys().map((key) => {
  const mod = ctx(key);
  return mod.default || mod;
});

// ID → module map
export const VECTORS = Object.fromEntries(modules.map((m) => [m.id, m]));
console.log('vectors', VECTORS);

// Return chosen vector or the first one as a safe default
export function getVector(id) {
  if (id && VECTORS[id]) return VECTORS[id];
  return modules[0];
}

export const ALL_VECTORS = modules;
