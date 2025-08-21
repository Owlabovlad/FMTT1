
import React from 'react';
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

const SignInScreen: React.FC = () => {
    return (
        <AuthLayout title="Sign in to your account">
            <form className="space-y-6" action="#" method="POST">
                <div>
                    <label htmlFor="email" className="block text-base font-medium text-neutral-700">
                        Email address
                    </label>
                    <div className="mt-1">
                        <input id="email" name="email" type="email" autoComplete="email" required
                            className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-base"
                            defaultValue="admin.user@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password"
                        className="block text-base font-medium text-neutral-700">
                        Password
                    </label>
                    <div className="mt-1">
                        <input id="password" name="password" type="password"
                            autoComplete="current-password" required
                            className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-base"
                            defaultValue="••••••••"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox"
                            className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"/>
                        <label htmlFor="remember-me" className="ml-2 block text-base text-black">
                            Remember me
                        </label>
                    </div>

                    <div className="text-base">
                        <Link to="/password-recovery" className="font-medium text-primary hover:text-primary/80">
                            Forgot your password?
                        </Link>
                    </div>
                </div>
                
                {/* Error State Example */}
                {/* <div className="bg-danger-100 border-l-4 border-danger-600 p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-base text-danger-800">
                                Invalid credentials. Please try again.
                            </p>
                        </div>
                    </div>
                </div> */}

                <div>
                    <button type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        Sign in
                    </button>
                </div>
            </form>

             <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-neutral-300"/>
                    </div>
                    <div className="relative flex justify-center text-base">
                        <span className="px-2 bg-white text-neutral-500">Or continue with</span>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                    <div>
                        <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 rounded-md shadow-sm bg-white text-base font-medium text-neutral-500 hover:bg-neutral-100">
                            Google
                        </a>
                    </div>
                    <div>
                        <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 rounded-md shadow-sm bg-white text-base font-medium text-neutral-500 hover:bg-neutral-100">
                            Microsoft
                        </a>
                    </div>
                </div>
                <div className="mt-6 text-center text-base">
                    <p className="text-neutral-700">
                        Not a member?{' '}
                        <Link to="/signup" className="font-medium text-primary hover:text-primary/80">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
};

export default SignInScreen;