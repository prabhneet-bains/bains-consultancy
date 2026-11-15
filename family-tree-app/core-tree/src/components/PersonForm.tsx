import React, { useContext, useState } from 'react';
import { TreeContext } from '../App';
import { Person, validatePersonDates } from '../models';
import { v4 as uuidv4 } from 'uuid';
import './Modal.css';

interface Props {
  person: Person | null;
  onClose: () => void;
}
const PersonForm: React.FC<Props> = ({ person, onClose }) => {
  const ctx = useContext(TreeContext);
  if (!ctx) return null;
  const { tree, setTree } = ctx;

  const [fullName, setFullName] = useState(person?.fullName ?? '');
  const [gender, setGender] = useState(person?.gender ?? '');
  const [birthDate, setBirthDate] = useState(person?.birthDate ?? '');
  const [deathDate, setDeathDate] = useState(person?.deathDate ?? '');
  const [note, setNote] = useState(person?.note ?? '');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!fullName.trim()) {
      setError('Full name is required.');
      return;
    }
    const newPerson: Person = {
      id: person?.id ?? uuidv4(),
      fullName,
      gender,
      birthDate: birthDate || undefined,
      deathDate: deathDate || undefined,
      note: note || undefined,
    };
    const validation = validatePersonDates(newPerson);
    if (!validation.ok) {
      setError(validation.message);
      return;
    }
    const newPersons = { ...tree.persons, [newPerson.id]: newPerson };
    setTree({ ...tree, persons: newPersons });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{person ? 'Edit Person' : 'Add Person'}</h2>
        {error && <p className="error">{error}</p>}
        <label>
          Full Name*
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </label>
        <label>
          Gender
          <select value={gender} onChange={(e) => setGender(e.target.value as any)}>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          Birth Date
          <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </label>
        <label>
          Death Date
          <input type="date" value={deathDate} onChange={(e) => setDeathDate(e.target.value)} />
        </label>
        <label>
          Note
          <textarea value={note} onChange={(e) => setNote(e.target.value)} />
        </label>
        <div className="modal-actions">
          <button onClick={handleSubmit}>{person ? 'Save' : 'Add'}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PersonForm;
