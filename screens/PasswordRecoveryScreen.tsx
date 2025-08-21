
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthLayout: React.FC<{ title: string; children: React.ReactNode; description?: string; }> = ({ title, description, children }) => (
    <div className="min-h-screen bg-neutral-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-2xl">T</div>
                <span className="text-2xl font-bold text-black">Phase 1</span>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
                {title}
            </h2>
            {description && <p className="mt-2 text-center text-base text-neutral-700">{description}</p>}
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow-card rounded-lg sm:px-10">
                {children}
            </div>
        </div>
    </div>
);

const PasswordRecoveryScreen: React.FC = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [passwordReset, setPasswordReset] = useState(false);
    // In a real app, a token from the URL would determine if we show the reset form
    const hasToken = true; // For demo purposes

    if (passwordReset) {
        return (
             <AuthLayout title="Password Updated">
                <div className="text-center">
                    <p className="text-base text-neutral-700">Your password has been successfully updated.</p>
                    <Link to="/signin" className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90">
                        Return to Sign In
                    </Link>
                </div>
            </AuthLayout>
        )
    }

    if (emailSent && !hasToken) {
        return (
             <AuthLayout title="Check your inbox">
                <div className="text-center">
                    <p className="text-base text-neutral-700">We've sent a password reset link to the email address on file.</p>
                     <button onClick={() => setEmailSent(false)} className="mt-4 font-medium text-primary hover:text-primary/80">
                        Didn't get an email?
                    </button>
                </div>
            </AuthLayout>
        )
    }

    if (hasToken) {
        return (
            <AuthLayout title="Set a new password" description="Your new password must be different from previous passwords.">
                <form className="space-y-6" onSubmit={(e) => {e.preventDefault(); setPasswordReset(true)}}>
                     <div>
                        <label className="block text-base font-medium text-neutral-700">New Password</label>
                        <input type="password" required className="mt-1 appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-base"/>
                    </div>
                     <div>
                        <label className="block text-base font-medium text-neutral-700">Confirm New Password</label>
                        <input type="password" required className="mt-1 appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-base"/>
                    </div>
                     <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90">
                            Set New Password
                        </button>
                    </div>
                </form>
            </AuthLayout>
        )
    }

    return (
        <AuthLayout title="Forgot your password?" description="No problem. Enter your email and we'll send you a reset link.">
            <form className="space-y-6" onSubmit={(e) => {e.preventDefault(); setEmailSent(true)}}>
                <div>
                    <label htmlFor="email" className="block text-base font-medium text-neutral-700">
                        Email address
                    </label>
                    <div className="mt-1">
                        <input id="email" name="email" type="email" autoComplete="email" required
                            className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-base"
                        />
                    </div>
                </div>

                <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        Send Reset Link
                    </button>
                </div>
                 <div className="text-center text-base">
                    <Link to="/signin" className="font-medium text-primary hover:text-primary/80">
                        Return to Sign In
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default PasswordRecoveryScreen;