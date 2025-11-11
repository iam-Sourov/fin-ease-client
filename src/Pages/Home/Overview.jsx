import React, { useContext, useEffect } from 'react';
import { AuthContext } from "../../Contexts/AuthContext";
import axios from 'axios';
import toast from 'react-hot-toast';
import sim from '../../../src/assets/sim.svg'

const Overview = () => {
    const { user, setLoading, income, setIncome, expense, setExpense, balance, setBalance } = useContext(AuthContext);

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!user || !user.email) return;
            try {
                const res = await axios.get(`https://fine-ease-server.vercel.app/my-transactions?email=${user.email}`);
                const data = res.data;
                const totalIncome = data
                    .filter((inc) => inc.type === 'income')
                    .reduce((sum, inc) => sum + Number(inc.amount), 0);
                const totalExpense = data
                    .filter((exp) => exp.type === 'expense')
                    .reduce((sum, exp) => sum + Number(exp.amount), 0);
                setIncome(totalIncome);
                setExpense(totalExpense);
                setBalance(totalIncome - totalExpense);
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch transactions");
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, [user, setIncome, setExpense, setBalance, setLoading]);
    if (!user) {
        return <div className="text-center py-10 text-lg">Please log in to view your overview.</div>;
    }
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className=" grid  grid-cols-1 md:grid-cols-3 place-items-center gap-6 -mt-16">
                <div className="w-80 h-48 p-6 bg-linear-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg text-white flex flex-col justify-between transform transition-all hover:scale-105">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-9 shadow-inner flex items-center justify-center">
                            <img src={sim} alt="" />
                            {/* <div className="w-9 h-6 border-4 border-dotted border-yellow-400 bg-gray-600 rounded-md flex items-center justify-center">
                                <div className="w-8 h-5 border-4  border-yellow-400 bg-gray-600 rounded-xl flex items-center justify-center">
                                    <div className="w-7 h-4 border-2 border-dotted border-yellow-400 bg-gray-600 rounded">
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                    </div>
                    <div className="text-2xl font-mono tracking-wide">
                        $ {balance.toLocaleString()}
                    </div>
                    <div className='space-y-2'>
                        <div className="text-xs uppercase font-light tracking-wider">{user && user.displayName || 'Card Holder'}</div>
                        <div className="text-xl font-medium">Total Balance</div>
                    </div>
                </div>
                <div className="w-80 h-48 p-6 bg-linear-to-br from-green-500 to-green-700 rounded-2xl shadow-lg text-white flex flex-col justify-between transform transition-all hover:scale-105">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-9 shadow-inner flex items-center justify-center">
                            <img src={sim} alt="" />
                            {/* <div className="w-9 h-6 border-4 border-dotted border-yellow-400 bg-gray-600 rounded-md flex items-center justify-center">
                                
                                <div className="w-8 h-5 border-4  border-yellow-400 bg-gray-600 rounded-xl flex items-center justify-center">
                                    <div className="w-7 h-4 border-2 border-dotted border-yellow-400 bg-gray-600 rounded">
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <svg className="w-10 h-10 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
                    </div>
                    <div className="text-2xl font-mono tracking-wide">
                        $ {income.toLocaleString()}
                    </div>
                    <div className='space-y-2'>
                        <div className="text-xs uppercase font-light tracking-wider">{user && user.displayName || 'Card Holder'}</div>
                        <div className="text-xl font-medium">Total Income</div>
                    </div>
                </div>
                <div className="w-80 h-48 p-6 bg-linear-to-br from-red-500 to-red-700 rounded-2xl shadow-lg text-white flex flex-col justify-between transform transition-all hover:scale-105">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-9 shadow-inner flex items-center justify-center">
                            <img src={sim} alt="" />
                            {/* <div className="w-9 h-6 border-4 border-dotted border-yellow-400 bg-gray-600 rounded-md flex items-center justify-center">
                                <div className="w-8 h-5 border-4  border-yellow-400 bg-gray-600 rounded-xl flex items-center justify-center">
                                    <div className="w-7 h-4 border-2 border-dotted border-yellow-400 bg-gray-600 rounded">
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
                    </div>
                    <div className="text-2xl font-mono tracking-wide">
                        $ {expense.toLocaleString()}
                    </div>
                    <div className='space-y-2'>
                        <div className="text-xs uppercase font-light tracking-wider">{user && user.displayName || 'Card Holder'}</div>
                        <div className="text-xl font-medium">Total Expenses</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;