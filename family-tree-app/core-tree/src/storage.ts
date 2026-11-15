import { FamilyTree } from './models';
import sampleData from './sampleData';

const STORAGE_KEY = 'familyTreeAppData';

export function loadTree(): FamilyTree {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as FamilyTree;
    } catch {
      // fall back to sample
    }
  }
  return sampleData;
}

export function saveTree(tree: FamilyTree) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tree));
}

export function clearTree() {
  localStorage.removeItem(STORAGE_KEY);
}
