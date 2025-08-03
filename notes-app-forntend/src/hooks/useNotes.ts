import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';


interface Note {
  _id: string;
  title: string;
  content: string;
  owner: { _id:string, username: string };
  sharedWith: { _id:string, username: string }[];
}

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/notes');
      setNotes(data);
      setError('');
    } catch (err) {
      setError('Failed to load notes.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  
  
  const addNote = (newNote: Note) => setNotes(prev => [newNote, ...prev]);
  const removeNote = (noteId: string) => setNotes(prev => prev.filter(n => n._id !== noteId));
  const updateNote = (updatedNote: Note) => setNotes(prev => prev.map(n => (n._id === updatedNote._id ? updatedNote : n)));

  return { notes, loading, error, fetchNotes, addNote, removeNote, updateNote };
};