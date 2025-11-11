import React, { useContext } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import { Spinner } from "@/components/ui/spinner"
import { AuthContext } from '../Contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

const RootLayout = () => {
    const { loading } = useContext(AuthContext);
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl">
                <Spinner></Spinner>
            </div>
        );
    }
    return (
        <div className='min-h-screen '>
            <div><Toaster /></div>
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