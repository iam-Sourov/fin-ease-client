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

const Navbar = () => {
    const { user, LogOut } = useContext(AuthContext);

    const navLinks = <>
        <NavLink to={'/'} > Home</NavLink>
        <NavLink to={'/addTransaction'}>Add Transaction</NavLink>
        <NavLink to={'/myTransaction'}>My Transactions</NavLink>
        <NavLink to={'/reports'}>Reports</NavLink>
    </>

    return (
        <div className=" w-full flex justify-between items-center  bg-white/10 border  p-2  ">
            <div className="hidden lg:flex">
                <a className=" text-xl">Fin-EASE</a>
            </div>
            <div className="hidden lg:flex ">
                <ul className="menu menu-horizontal space-x-4 font-semibold">
                    {
                        navLinks
                }
                </ul>
            </div>
            {/* drop */}
            <div className='md:hidden block'>
                <DropdownMenu>
                    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Nav Links</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><NavLink NavLink to={'/'} > Home</NavLink></DropdownMenuItem>
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
                            <Button onClick={LogOut} className="btn shadow-none ">LogOut</Button>
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