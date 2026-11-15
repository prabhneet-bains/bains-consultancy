import React, { createContext, useEffect, useState } from 'react';
import { FamilyTree, Person, Relationship } from './models';
import { loadTree, saveTree, clearTree } from './storage';
import TreeView from './components/TreeView';
import PersonDetails from './components/PersonDetails';
import PersonForm from './components/PersonForm';
import RelationshipForm from './components/RelationshipForm';
import SearchBar from './components/SearchBar';
import ExportImport from './components/ExportImport';
import './App.css';

interface TreeContextProps {
  tree: FamilyTree;
  setTree: React.Dispatch<React.SetStateAction<FamilyTree>>;
  selectedPersonId: string | null;
  setSelectedPersonId: React.Dispatch<React.SetStateAction<string | null>>;
}
export const TreeContext = createContext<TreeContextProps | undefined>(undefined);

const App: React.FC = () => {
  const [tree, setTree] = useState<FamilyTree>(loadTree());
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [showPersonForm, setShowPersonForm] = useState<boolean>(false);
  const [editPerson, setEditPerson] = useState<Person | null>(null);
  const [showRelForm, setShowRelForm] = useState<boolean>(false);
  const [relMode, setRelMode] = useState<'parent' | 'partner'>('parent');

  // persist on change (debounced)
  useEffect(() => {
    const timeout = setTimeout(() => saveTree(tree), 300);
    return () => clearTimeout(timeout);
  }, [tree]);

  const handleAddPerson = () => {
    setEditPerson(null);
    setShowPersonForm(true);
  };

  const handleEditPerson = (person: Person) => {
    setEditPerson(person);
    setShowPersonForm(true);
  };

  const handleAddRelationship = (mode: 'parent' | 'partner') => {
    setRelMode(mode);
    setShowRelForm(true);
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all data and reload sample?')) {
      clearTree();
      setTree(loadTree());
      setSelectedPersonId(null);
    }
  };

  return (
    <TreeContext.Provider
      value={{ tree, setTree, selectedPersonId, setSelectedPersonId }}
    >
      <div className="app-container">
        <header className="toolbar">
          <button onClick={handleAddPerson}>Add Person</button>
          <button onClick={() => handleAddRelationship('parent')}>Add Parent/Child</button>
          <button onClick={() => handleAddRelationship('partner')}>Add Partner</button>
          <SearchBar />
          <ExportImport onClearAll={handleClearAll} />
        </header>
        <main className="main-content">
          <TreeView />
          <PersonDetails
            onEdit={handleEditPerson}
            onDelete={(person) => {
              if (window.confirm(`Delete ${person.fullName}?`)) {
                const newPersons = { ...tree.persons };
                delete newPersons[person.id];
                const newRels = tree.relationships.filter(
                  (r) => r.fromId !== person.id && r.toId !== person.id
                );
                setTree({ persons: newPersons, relationships: newRels });
                setSelectedPersonId(null);
              }
            }}
          />
        </main>
        {showPersonForm && (
          <PersonForm
            person={editPerson}
            onClose={() => setShowPersonForm(false)}
          />
        )}
        {showRelForm && (
          <RelationshipForm
            mode={relMode}
            onClose={() => setShowRelForm(false)}
          />
        )}
      </div>
    </TreeContext.Provider>
  );
};

export default App;
