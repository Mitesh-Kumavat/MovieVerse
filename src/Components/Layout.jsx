import React from 'react'
import { Header, Footer } from './index.js'
import { Outlet } from 'react-router-dom'
import { createContext, useState } from 'react'

const AppState = createContext();

function Layout() {
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState("");

    return (
        <AppState.Provider value={{ login, username, setLogin, setUsername }}>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className='flex-grow' >
                    <Outlet />
                </main>
                <Footer />
            </div>
        </AppState.Provider>
    )
}

export default Layout
export { AppState }