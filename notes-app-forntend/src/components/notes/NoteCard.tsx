import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import ShareNoteModal from './ShareNoteModal';

// Interfaces
interface Note {
  _id: string;
  title: string;
  content: string;
  owner: { _id: string, username: string };
  sharedWith: { _id: string, username: string }[];
}

// 1. UPDATE THE PROPS INTERFACE to be clear and correct
interface NoteCardProps {
  note: Note;
  onNoteUpdated: (updatedNote: Note) => void;
  // This is optional because SharedNotesPage does not pass it
  onNoteDeleted?: (deletedNoteId: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onNoteUpdated, onNoteDeleted }) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isOwner = user?.username === note.owner.username;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  // 2. THIS IS THE FIX: The share action is an "update". It must call onNoteUpdated.
  const handleSuccessfulShare = (updatedNote: Note) => {
    onNoteUpdated(updatedNote); // Use the main update handler from the parent
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    const promise = api.put(`/notes/${note._id}`, { title: editedTitle, content: editedContent });
    toast.promise(promise, {
        loading: 'Saving...',
        success: (response) => {
            onNoteUpdated(response.data); // Correctly calls the prop
            setIsEditing(false);
            return <b>Note saved!</b>;
        },
        error: <b>Could not save.</b>,
    });
  };

  const handleDeleteClick = () => {
    // 3. Add a safety check. Only show the confirmation if onNoteDeleted exists.
    if (!onNoteDeleted) return;

    toast((t) => (
      <span>
        Delete this note?
        <button className="ml-4 bg-rose-500 hover:bg-rose-600 text-white font-bold py-1 px-2 rounded text-sm" onClick={() => { handleDeleteConfirm(); toast.dismiss(t.id); }}>Delete</button>
        <button className="ml-2 bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded text-sm" onClick={() => toast.dismiss(t.id)}>Cancel</button>
      </span>
    ), { duration: 4000 });
  };

  const handleDeleteConfirm = async () => {
    // Also safety check here before making the API call
    if (!onNoteDeleted) return;

    const promise = api.delete(`/notes/${note._id}`);
    toast.promise(promise, {
      loading: 'Deleting...',
      success: () => {
        onNoteDeleted(note._id); // Correctly calls the prop
        return <b>Note deleted.</b>;
      },
      error: <b>Could not delete.</b>,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(note.title);
    setEditedContent(note.content);
  };

  return (
    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm break-inside-avoid mb-4 flex flex-col transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        {/* ... The entire JSX for the card remains the same as the last step ... */}
        {isEditing ? (
            <div className="flex-grow">
                <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="font-bold text-lg text-slate-800 mb-2 w-full p-1 rounded border border-teal-300 focus:ring-2 focus:ring-teal-300" />
                <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} className="text-slate-600 mb-4 w-full p-1 rounded border border-teal-300 focus:ring-2 focus:ring-teal-300" rows={5} />
            </div>
        ) : (
            <div className="flex-grow">
                <h3 className="font-bold text-lg text-slate-800 mb-2">{note.title}</h3>
                <p className="text-slate-600 mb-4 whitespace-pre-wrap">{note.content}</p>
            </div>
        )}
        <div className="border-t border-slate-200 pt-3 mt-auto text-xs text-slate-500">
            <p><strong>Owner:</strong> {note.owner.username}</p>
            {note.sharedWith.length > 0 && (<p className="mt-1"><strong>Shared with:</strong> {note.sharedWith.map(u => u.username).join(', ')}</p>)}
        </div>
        {isOwner && (
            <div className="mt-4 flex items-center space-x-2">
            {isEditing ? (
                <>
                    <button onClick={handleSave} className="text-sm bg-teal-500 hover:bg-teal-600 text-white font-semibold py-1 px-3 rounded-md">Save</button>
                    <button onClick={handleCancel} className="text-sm bg-slate-500 hover:bg-slate-600 text-white font-semibold py-1 px-3 rounded-md">Cancel</button>
                </>
            ) : (
                <>
                    <button onClick={() => setIsEditing(true)} className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-1 px-3 rounded-md">Edit</button>
                    <button onClick={() => setIsModalOpen(true)} className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-1 px-3 rounded-md">Share</button>
                    {/* 4. Only render the delete button if the onNoteDeleted function is provided */}
                    {onNoteDeleted && (<button onClick={handleDeleteClick} className="text-sm bg-rose-500 hover:bg-rose-600 text-white font-semibold py-1 px-3 rounded-md">Delete</button>)}
                </>
            )}
            </div>
        )}
        {isModalOpen && (<ShareNoteModal noteId={note._id} onClose={() => setIsModalOpen(false)} onNoteShared={handleSuccessfulShare} />)}
    </div>
  );
};

export default NoteCard;