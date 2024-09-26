// import React from 'react'
// import { Header, Footer } from './index.js'
// import { Outlet } from 'react-router-dom'
// import { createContext, useState, useEffect } from 'react'
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { auth } from '../firebase/firebase.js';
// import { AuthProvider } from '../contexts/AuthContext.jsx';


// const AppState = createContext();

// function Layout() {
//     const [login, setLogin] = useState(false);
//     const [username, setUsername] = useState("");
//     const [user, setUser] = useState(null); // Define user state

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 // User is signed in
//                 setUser(user);
//                 setLogin(true);
//                 setUsername(user.displayName || user.email); // Set username if available
//                 console.log("User is signed in:", user);
//             } else {
//                 // User is signed out
//                 setUser(null);
//                 setLogin(false);
//                 setUsername("");
//                 console.log("No user is signed in.");
//             }
//         });

//         return () => unsubscribe(); // Cleanup on unmount
//     }, []);


//     return (
//         <AuthProvider >
//             <AppState.Provider value={{ login, username, setLogin, setUsername }}>
//                 <div className="flex flex-col min-h-screen">
//                     <Header />
//                     <main className='flex-grow' >
//                         <Outlet />
//                     </main>
//                     <Footer />
//                 </div>
//             </AppState.Provider>
//         </AuthProvider>
//     )
// }

// export default Layout
// export { AppState }

import React, { createContext, useState, useEffect } from 'react';
import { Header, Footer } from './index.js';
import { Outlet } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/firebase.js';
import { AuthProvider } from '../contexts/AuthContext.jsx';

const AppState = createContext();

function Layout() {
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null); // Define user state

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
                setLogin(true);
                setUsername(user.displayName || user.email); // Set username if available
                console.log("User is signed in:", user);
            } else {
                // User is signed out
                setUser(null);
                setLogin(false);
                setUsername("");
                console.log("No user is signed in.");
            }
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    return (
        <AuthProvider>
            <AppState.Provider value={{ login, username, setLogin, setUsername }}>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className='flex-grow'>
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </AppState.Provider>
        </AuthProvider>
    );
}

export default Layout;
export { AppState };
