import React, { useState } from 'react';
import api from '../../services/api';

interface ShareNoteModalProps {
  noteId: string;
  onClose: () => void;
  onNoteShared: (updatedNote: any) => void;
}

const ShareNoteModal: React.FC<ShareNoteModalProps> = ({ noteId, onClose, onNoteShared }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!username.trim()) {
        setError('Please enter a username.');
        return;
    }

    try {
      // Send the username to the backend's share endpoint
      const { data } = await api.post(`/notes/share/${noteId}`, { usernameToShareWith: username });
      setSuccess(`Note shared with ${username}!`);
      onNoteShared(data); // Update the parent component's state
      setUsername(''); // Clear the input field
      // Automatically close modal after a delay
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to share note. Please try again.');
    }
  };

  return (
    // This creates the modal overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Share Note</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username to share with"
            className="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareNoteModal;