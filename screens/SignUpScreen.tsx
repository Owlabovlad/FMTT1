
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthLayout: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="min-h-screen bg-neutral-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-2xl">T</div>
                <span className="text-2xl font-bold text-black">Phase 1</span>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
                {title}
            </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow-card rounded-lg sm:px-10">
                {children}
            </div>
        </div>
    </div>
);

const PasswordStrengthMeter: React.FC<{ score: number }> = ({ score }) => {
    const levels = [
        { width: '25%', color: 'bg-danger-600', text: 'Weak' },
        { width: '50%', color: 'bg-warning-600', text: 'Fair' },
        { width: '75%', color: 'bg-yellow-500', text: 'Good' },
        { width: '100%', color: 'bg-success-600', text: 'Strong' },
    ];
    const level = levels[score] || levels[0];
    return (
        <div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className={`h-2 rounded-full ${level.color}`} style={{ width: level.width }}></div>
            </div>
            <p className="text-sm text-neutral-500 mt-1">{level.text}</p>
        </div>
    );
};


const SignUpScreen: React.FC = () => {
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState(0);

    const checkStrength = (pw: string) => {
        let score = 0;
        if (pw.length > 8) score++;
        if (pw.match(/[a-z]/) && pw.match(/[A-Z]/)) score++;
        if (pw.match(/[0-9]/)) score++;
        if (pw.match(/[^a-zA-Z0-9]/)) score++;
        setStrength(score > 0 ? score -1 : 0);
        setPassword(pw);
    };

    return (
        <AuthLayout title="Create an account">
            <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-base font-medium text-neutral-700">First Name</label>
                        <input type="text" required className="mt-1 appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-base"/>
                    </div>
                    <div>
                        <label className="block text-base font-medium text-neutral-700">Last Name</label>
                        <input type="text" required className="mt-1 appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-base"/>
                    </div>
                </div>

                <div>
                    <label className="block text-base font-medium text-neutral-700">Work Email</label>
                    <input type="email" required className="mt-1 appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-base"/>
                </div>

                <div>
                    <label className="block text-base font-medium text-neutral-700">Password</label>
                    <input type="password" onChange={(e) => checkStrength(e.target.value)} required className="mt-1 appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-base"/>
                    {password && <div className="mt-2"><PasswordStrengthMeter score={strength} /></div>}
                </div>
                 <div>
                    <label className="block text-base font-medium text-neutral-700">Confirm Password</label>
                    <input type="password" required className="mt-1 appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-base"/>
                </div>
                
                <div className="flex items-center">
                    <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"/>
                    <label htmlFor="terms" className="ml-2 block text-base text-black">
                        I agree to the <a href="#" className="font-medium text-primary hover:text-primary/80">Terms</a> & <a href="#" className="font-medium text-primary hover:text-primary/80">Privacy Policy</a>
                    </label>
                </div>

                <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        Create Account
                    </button>
                </div>
            </form>
             <div className="mt-6 text-center text-base">
                <p className="text-neutral-700">
                    Already have an account?{' '}
                    <Link to="/signin" className="font-medium text-primary hover:text-primary/80">
                        Sign In
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default SignUpScreen;