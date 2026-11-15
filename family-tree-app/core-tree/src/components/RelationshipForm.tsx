import React, { useContext, useState } from 'react';
import { TreeContext } from '../App';
import { canAddParentChild, canAddPartner, Relationship } from '../models';
import './Modal.css';

interface Props {
  mode: 'parent' | 'partner';
  onClose: () => void;
}
const RelationshipForm: React.FC<Props> = ({ mode, onClose }) => {
  const ctx = useContext(TreeContext);
  if (!ctx) return null;
  const { tree, setTree } = ctx;

  const [personA, setPersonA] = useState<string>('');
  const
