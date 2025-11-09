import React from 'react';




const Overview = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className=" grid  grid-cols-1 md:grid-cols-3 place-items-center gap-6 -mt-16">
                <div class="w-80 h-48 p-6 bg-linear-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg text-white flex flex-col justify-between transform transition-all hover:scale-105">
                    <div class="flex justify-between items-start">
                        <div class="w-12 h-9 bg-linear-to-br from-gray-300 to-gray-400 rounded-md shadow-inner">
                            <div class="w-9 h-6 m-1.5 bg-gray-600 rounded-sm"></div>
                        </div>
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                    </div>
                    <div class="text-2xl font-mono tracking-wide">
                        $ 1,234.56
                    </div>
                    <div>
                        <div class="text-xs uppercase font-light tracking-wider">Card Holder</div>
                        <div class="text-lg font-medium">Total Balance</div>
                    </div>
                </div>
                <div class="w-80 h-48 p-6 bg-linear-to-br from-green-500 to-green-700 rounded-2xl shadow-lg text-white flex flex-col justify-between transform transition-all hover:scale-105">
                    <div class="flex justify-between items-start">
                        <div class="w-12 h-9 bg-linear-to-br from-gray-300 to-gray-400 rounded-md shadow-inner">
                            <div class="w-9 h-6 m-1.5 bg-gray-600 rounded-sm"></div>
                        </div>
                        <svg className="w-10 h-10 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
                    </div>
                    <div class="text-2xl font-mono tracking-wide">
                        $ 5,678.90
                    </div>
                    <div>
                        <div class="text-xs uppercase font-light tracking-wider">Card Holder</div>
                        <div class="text-lg font-medium">Total Income</div>
                    </div>
                </div>
                <div class="w-80 h-48 p-6 bg-linear-to-br from-red-500 to-red-700 rounded-2xl shadow-lg text-white flex flex-col justify-between transform transition-all hover:scale-105">
                    <div class="flex justify-between items-start">
                        <div class="w-12 h-9 bg-linear-to-br from-gray-300 to-gray-400 rounded-md shadow-inner">
                            <div class="w-9 h-6 m-1.5 bg-gray-600 rounded-sm"></div>
                        </div>
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
                    </div>
                    <div class="text-2xl font-mono tracking-wide">
                        $ 2,468.13
                    </div>
                    <div>
                        <div class="text-xs uppercase font-light tracking-wider">Card Holder</div>
                        <div class="text-lg font-medium">Total Expenses</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;