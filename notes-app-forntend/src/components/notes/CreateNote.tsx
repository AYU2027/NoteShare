import React, { useState } from 'react';
import api from '../../services/api';

interface CreateNoteProps {
    onNoteCreated: (newNote: any) => void;
}

const CreateNote: React.FC<CreateNoteProps> = ({ onNoteCreated }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!title.trim() || !content.trim()) {
            setError('Title and content cannot be empty.');
            return;
        }

        try {
            // Send a POST request to the backend to create the note
            const { data } = await api.post('/notes', { title, content });
            // Call the function passed from the parent to update the UI
            onNoteCreated(data);
            // Reset the form fields
            setTitle('');
            setContent('');
        } catch (err) {
            console.error("Failed to create note", err);
            setError('Failed to create note. Please try again.');
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Create a New Note</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div>
                    <input
                        type="text"
                        placeholder="Note Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Note Content..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-300">
                    Add Note
                </button>
            </form>
        </div>
    );
};

export default CreateNote;