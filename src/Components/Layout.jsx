import React from 'react'
import { Header, Footer } from './index.js'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className='flex-grow' >

                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layout