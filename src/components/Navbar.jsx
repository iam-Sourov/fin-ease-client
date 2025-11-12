import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { ModeToggle } from './mode-toggle';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, setUser, LogOut } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleSignOut = () => {
        LogOut()
            .then(() => {
                setUser(null);
                setOpen(false);
            })
            .catch((err) => {
                console.error(err);
                toast.error('Failed to sign out',err.message);
            });
    };

    const handleNavigate = (path) => {
        setOpen(false);
        navigate(path);
    };

    const navLinks = (
        <>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `hover:text-primary transition ${isActive ? 'text-blue-500 text-lg font-semibold' : 'text-sm'}`}>
                Home
            </NavLink>
            <NavLink
                to="/addTransaction"
                className={({ isActive }) =>
                    `hover:text-primary transition ${isActive ? 'text-blue-500 text-lg font-semibold' : 'text-sm'}`}>
                Add Transaction
            </NavLink>
            <NavLink
                to="/myTransaction"
                className={({ isActive }) =>
                    `hover:text-primary transition ${isActive ? 'text-blue-500 text-lg font-semibold' : 'text-sm'}`}>
                My Transactions
            </NavLink>
            <NavLink
                to="/reports"
                className={({ isActive }) =>
                    `hover:text-primary transition ${isActive ? 'text-blue-500 text-lg font-semibold' : 'text-sm'}`}>
                Reports
            </NavLink>
        </>
    );

    return (
        <div className="w-full flex justify-between items-center bg-white/20 backdrop-blur-md border p-3">
            <div>
                <Link to="/" className="text-xl font-bold">Fin-EASE</Link>
            </div>
            <div className="hidden md:flex items-center space-x-6 font-medium">
                {navLinks}
            </div>

            <div className="hidden md:flex items-center gap-3">
                <ModeToggle />
                {user ?
                    <div className="flex items-center gap-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Account</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link to="/myProfile">My Profile</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button onClick={handleSignOut} variant="destructive">
                            Log Out
                        </Button>
                    </div>
                    :
                    <>
                        <Link to="/login">
                            <Button variant="outline">Login</Button>
                        </Link>
                        <Link to="/signup">
                            <Button>Signup</Button>
                        </Link>
                    </>
                }
            </div>

            <div className="md:hidden flex items-center space-x-2">
                <ModeToggle />
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full p-6 sm:w-80">
                        <SheetHeader>
                            <SheetTitle className="text-lg font-bold">
                                <Link onClick={() => handleNavigate('/')} className="text-xl">Fin-EASE</Link>
                            </SheetTitle>
                        </SheetHeader>

                        <div className="mt-6 flex flex-col text-lg space-y-4">
                            <button onClick={() => handleNavigate('/')} className="text-left hover:text-primary">Home</button>
                            <button onClick={() => handleNavigate('/addTransaction')} className="text-left hover:text-primary">Add Transaction</button>
                            <button onClick={() => handleNavigate('/myTransaction')} className="text-left hover:text-primary">My Transactions</button>
                            <button onClick={() => handleNavigate('/reports')} className="text-left hover:text-primary">Reports</button>
                            <hr className="my-3" />

                            {user ?
                                <>
                                    <button onClick={() => handleNavigate('/myProfile')} className="text-left hover:text-primary">My Profile</button>
                                    <Button onClick={handleSignOut} variant="destructive" className="w-full">
                                        Log Out
                                    </Button>
                                </>
                                :
                                <>
                                    <Button onClick={() => handleNavigate('/login')} variant="outline" className="w-full">
                                        Login
                                    </Button>
                                    <Button onClick={() => handleNavigate('/signup')} className="w-full">
                                        Signup
                                    </Button>
                                </>
                            }
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default Navbar;
