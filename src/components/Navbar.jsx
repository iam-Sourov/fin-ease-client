import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import { Button } from "@/components/ui/button"
import { ModeToggle } from './mode-toggle';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, setUser, LogOut } = useContext(AuthContext);

    const navLinks = <>
        <NavLink to={'/'} > Home</NavLink>
        <NavLink to={'/addTransaction'}>Add Transaction</NavLink>
        <NavLink to={'/myTransaction'}>My Transactions</NavLink>
        <NavLink to={'/reports'}>Reports</NavLink>
    </>
    const handleSignOut = () => {
        LogOut()
            .then(() => {
                setUser(null);
            }).catch((error) => {
                console.log(error);
                toast.error('Failed To Signed Out')
            });
    }
    return (
        <div className="w-full flex justify-between items-center bg-white/10 border p-3  ">
            <div className="hidden md:flex lg:flex">
                <a className=" text-xl">Fin-EASE</a>
            </div>
            <div className="hidden  md:flex lg:flex ">
                <ul className="menu menu-horizontal  space-x-4 font-semibold">
                    {
                        navLinks
                    }
                </ul>
            </div>
            <div className='md:hidden block '>
                <DropdownMenu>
                    <DropdownMenuTrigger><Menu /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><NavLink to={'/'} > Home</NavLink></DropdownMenuItem>
                        <DropdownMenuItem><NavLink to={'/addTransaction'}>Add Transaction</NavLink></DropdownMenuItem>
                        <DropdownMenuItem><NavLink to={'/myTransaction'}>My Transactions</NavLink></DropdownMenuItem>
                        <DropdownMenuItem><NavLink to={'/reports'}>Reports</NavLink></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="">
                <div className='flex gap-3'>
                    <ModeToggle></ModeToggle>
                    {
                        user ? <div className=' space-x-2.5'>
                            <DropdownMenu>
                                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem><Link to={'/myProfile'}>My Profile</Link></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button onClick={handleSignOut} className="btn shadow-none ">LogOut</Button>
                        </div> : <>
                            <Link to={'/login'}><Button className=" shadow-none ">Login</Button></Link>
                            <Link to={'/signup'}> <Button className=" bg-primary">Signup</Button></Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;