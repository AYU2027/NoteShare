import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
    const { user } = useAuth();

    return (
        <div className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
            {}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 animate-gradient-xy"></div>

            <div className="relative z-10 text-center text-white p-6">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
                    Capture Ideas, Instantly.
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                    NoteShare is your minimalist, blazingly fast hub for notes.
                    Share and collaborate with zero friction.
                </p>

                <div className="space-x-4">
                    <Link to={user ? "/dashboard" : "/register"} className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 shadow-lg">
                        Get Started
                    </Link>
                </div>
            </div>

            <footer className="absolute bottom-4 text-white text-opacity-50 text-sm">
                Built with React, Node.js, and Tailwind CSS.
            </footer>
        </div>
    );
};

export default HomePage;