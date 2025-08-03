import { useState, useMemo } from 'react';
import { ClipLoader } from 'react-spinners';
import { useNotes } from '../hooks/useNotes';
import { useAuth } from '../hooks/useAuth';
import NoteCard from '../components/notes/NoteCard';

const SharedNotesPage = () => {
  const { user } = useAuth();
  
  const { notes, loading, error, updateNote } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');

  
  const sharedNotes = useMemo(() => notes.filter(note => note.owner._id !== user?._id), [notes, user]);

  
  const filteredNotes = useMemo(() => sharedNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  ), [sharedNotes, searchQuery]);

  return (
    
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          {/* The header text is updated for this page */}
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Shared With Me</h1>
          <p className="mt-1 text-lg text-gray-600">Notes that other users have shared with you.</p>
          <input
            type="text"
            placeholder="Search shared notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-4 px-4 py-2 border border-gray-300 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </header>

        {loading && <div className="flex justify-center mt-10"><ClipLoader color="#14b8a6" size={50} /></div>}
        {error && <p className="text-center text-red-500 mt-10">{error}</p>}
        
        {!loading && !error && (
            (sharedNotes.length === 0) 
            
            ? <div className="text-center py-16"><p className="text-gray-500">No notes have been shared with you yet.</p></div>
            : (filteredNotes.length === 0) 
              ? <div className="text-center py-16"><p className="text-gray-500">No shared notes match your search.</p></div>
              
              : <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
                  {filteredNotes.map(note => (
                    
                    <NoteCard key={note._id} note={note} onNoteUpdated={updateNote} />
                  ))}
                </div>
        )}
      </main>
    </div>
  );
};

export default SharedNotesPage;