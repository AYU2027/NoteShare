import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const CreateNotePage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            toast.error('Title and content cannot be empty.');
            return;
        }
        const promise = api.post('/notes', { title, content });
        toast.promise(promise, {
            loading: 'Creating note...',
            success: () => {
                navigate('/dashboard');
                return <b>Note created successfully!</b>;
            },
            error: <b>Could not create note.</b>,
        });
    };

    return (
        <div className="container mx-auto max-w-3xl p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Create a New Note</h1>
              <p className="mt-1 text-lg text-slate-600">This note will be added to your "My Notes" collection.</p>
            </header>
            
            <div className="p-8 bg-white rounded-lg shadow-md border border-slate-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" rows={10} required></textarea>
                    </div>
                    <button type="submit" className="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition duration-300 text-lg">
                        Save Note
                    </button>
                </form>
            </div>
        </div>
    );
};
export default CreateNotePage;