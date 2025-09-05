import React, { useState } from 'react';
import Login from '../components/auth/login';
import Signup from '../components/auth/signUp';

const AuthPage = () => {
    const [isLoginView, setIsLoginView] = useState(true);

    const toggleView = () => {
        setIsLoginView(!isLoginView);
    };

    const handleSignupSuccess = () => {
        setIsLoginView(true);
    };

    return (
        <div>
            {isLoginView ? (
                <Login onToggleForm={toggleView} />
            ) : (
                <Signup onToggleForm={toggleView} onSignupSuccess={handleSignupSuccess} />
            )}
        </div>
    );
};

export default AuthPage;
