import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
// Create a new context for authentication
const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

// AuthProvider component to manage authentication state
export function AuthProvider(props) {
    // Fetch Userdata from session Storage if already available otherwise save null
    const [authUser, setAuthUser] = useState(JSON.parse(window.sessionStorage.getItem('authUser')));
    const x = window.sessionStorage.getItem('isLoggedIn') === 'true' ? true : false;
    const [isLoggedIn, setIsLoggedIn] = useState(x);
    
    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

// Prop validation for AuthProvider component
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensure children prop is provided and is a React node
};
