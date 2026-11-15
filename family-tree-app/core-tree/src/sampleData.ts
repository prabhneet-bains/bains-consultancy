import { FamilyTree } from './models';
import { v4 as uuidv4 } from 'uuid';

const p1 = { id: uuidv4(), fullName: 'John Doe', gender: 'Male', birthDate: '1950-01-01' };
const p2 = { id: uuidv4(), fullName: 'Jane Smith', gender: 'Female', birthDate: '1952-03-12' };
const p3 = { id: uuidv4(), fullName: 'Michael Doe', gender: 'Male', birthDate: '1975-06-20' };
const p4 = { id: uuidv4(), fullName: 'Emily Doe', gender: 'Female', birthDate: '1978-09-15' };
const p5 = { id: uuidv4(), fullName: 'Sophia Doe', gender: 'Female', birthDate: '2000-02-02' };

const sample: FamilyTree = {
  persons: {
    [p1.id]: p1,
    [p2.id]: p2,
    [p3.id]: p3,
    [p4.id]: p4,
    [p5.id]: p5,
  },
  relationships: [
    { type: 'partner', fromId: p1.id, toId: p2.id },
    { type: 'parent', fromId: p1.id, toId: p3.id },
    { type: 'parent', fromId: p2.id, toId: p3.id },
    { type: 'parent', fromId: p1.id, toId: p4.id },
    { type: 'parent', fromId: p2.id, toId: p4.id },
    { type: 'partner', fromId: p3.id, toId: p4.id },
    { type: 'parent', fromId: p3.id, toId: p5.id },
    { type: 'parent', fromId: p4.id, toId: p5.id },
  ],
};

export default sample;
