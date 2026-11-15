export type Gender = 'Male' | 'Female' | 'Other' | '';

export interface Person {
  id: string;
  fullName: string;
  gender: Gender;
  birthDate?: string; // ISO string
  deathDate?: string; // ISO string
  note?: string;
}

export interface Relationship {
  type: 'parent' | 'partner';
  fromId: string; // parent or partner A
  toId: string;   // child or partner B
}

export interface FamilyTree {
  persons: Record<string, Person>;
  relationships: Relationship[];
}

/**
 * Validation utilities
 */
export function canAddParentChild(
  tree: FamilyTree,
  parentId: string,
  childId: string
): { ok: boolean; message?: string } {
  if (parentId === childId) {
    return { ok: false, message: 'A person cannot be their own parent.' };
  }
  // check max two parents
  const existingParents = tree.relationships.filter(
    (r) => r.type === 'parent' && r.toId === childId
  );
  if (existingParents.length >= 2) {
    return { ok: false, message: 'A person may have at most two parents.' };
  }
  // check for cycles (ancestor loop)
  const visited = new Set<string>();
  const dfs = (currentId: string): boolean => {
    if (visited.has(currentId)) return false;
    visited.add(currentId);
    const parents = tree.relationships.filter(
      (r) => r.type === 'parent' && r.toId === currentId
    ).map((r) => r.fromId);
    if (parents.includes(parentId)) return true; // cycle found
    return parents.some(dfs);
  };
  if (dfs(parentId)) {
    return { ok: false, message: 'Adding this relationship would create a cycle.' };
  }
  return { ok: true };
}

export function canAddPartner(
  tree: FamilyTree,
  aId: string,
  bId: string
): { ok: boolean; message?: string } {
  if (aId === bId) {
    return { ok: false, message: 'A person cannot be partnered with themselves.' };
  }
  const exists = tree.relationships.some(
    (r) =>
      r.type === 'partner' &&
      ((r.fromId === aId && r.toId === bId) ||
        (r.fromId === bId && r.toId === aId))
  );
  if (exists) {
    return { ok: false, message: 'These two persons are already partners.' };
  }
  return { ok: true };
}

export function validatePersonDates(person: Person): { ok: boolean; message?: string } {
  if (person.birthDate && person.deathDate && person.deathDate < person.birthDate) {
    return { ok: false, message: 'Date of death cannot be earlier than date of birth.' };
  }
  return { ok: true };
}
