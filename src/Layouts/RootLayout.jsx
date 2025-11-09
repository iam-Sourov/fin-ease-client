import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const RootLayout = () => {
    return (
        <div className='min-h-screen '>
            <header>
                <Navbar></Navbar>
            </header>
            <main className='min-h-[calc(100vh-200px)]'>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default RootLayout;