import { useSyncExternalStore } from 'react';

const PREFIX = 'veclim.simSeen.';
const listeners = new Set();
let count = 0;
let current = null;

const readSeen = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed) : null;
  } catch (e) {
    return null;
  }
};

const writeSeen = (key, seen) => {
  try {
    localStorage.setItem(key, JSON.stringify([...seen]));
  } catch (e) {
    return;
  }
};

const setCount = (next) => {
  if (next === count) return;
  count = next;
  listeners.forEach((listener) => listener());
};

export const syncAttention = (userKey, list, inProgressStatuses) => {
  const key = PREFIX + (userKey || 'user');
  const finished = list
    .filter((sim) => !inProgressStatuses.includes(sim.status))
    .map((sim) => sim.id);

  let seen = readSeen(key);
  if (!seen) {
    seen = new Set(finished);
    writeSeen(key, seen);
  } else if (list.length > 0) {
    const present = new Set(list.map((sim) => sim.id));
    const kept = [...seen].filter((id) => present.has(id));
    if (kept.length !== seen.size) {
      seen = new Set(kept);
      writeSeen(key, seen);
    }
  }

  current = { key, finished, seen };
  setCount(finished.filter((id) => !seen.has(id)).length);
};

export const acknowledgeAttention = () => {
  if (!current) {
    setCount(0);
    return;
  }
  const seen = new Set([...current.seen, ...current.finished]);
  current = { ...current, seen };
  writeSeen(current.key, seen);
  setCount(0);
};

export const resetAttention = () => {
  current = null;
  setCount(0);
};

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getCount = () => count;

export const useSimulationAttention = () =>
  useSyncExternalStore(subscribe, getCount);
