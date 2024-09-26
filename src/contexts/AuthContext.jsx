// import { createContext, useContext, useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const auth = getAuth();

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             setUser(user);
//         });

//         return () => unsubscribe();
//     }, [auth]);

//     return (
//         <AuthContext.Provider value={{ user }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        // Set persistence to local storage
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                // Set up the authentication state observer
                const unsubscribe = onAuthStateChanged(auth, (user) => {
                    setUser(user);
                    console.log(user ? "User signed in:" : "User signed out:", user);
                });

                return () => unsubscribe(); // Cleanup on unmount
            })
            .catch((error) => {
                console.error("Error setting persistence:", error);
            });
    }, [auth]);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
