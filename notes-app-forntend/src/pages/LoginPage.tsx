import LoginForm from "../components/auth/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <div className="relative min-h-screen w-full flex justify-center items-center p-4 overflow-hidden">
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 animate-gradient-xy"></div>
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
                    <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Welcome Back</h2>
                    <p className="text-center text-gray-500 mb-6">Login to access your workspace.</p>
                    <LoginForm />
                </div>
                <p className="text-center text-sm mt-6 text-white text-opacity-80">
                    Don't have an account? <Link to="/register" className="text-teal-400 hover:underline font-semibold">Register here</Link>
                </p>
            </div>
        </div>
    );
};
export default LoginPage;