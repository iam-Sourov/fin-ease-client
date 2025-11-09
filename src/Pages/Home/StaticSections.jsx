import React from 'react';



const StaticSections = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-20 ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className=" p-8  bg-white/5  backdrop-blur-md  rounded-xl  border  border-white/10 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        {/* <FaLightbulb className="mr-3 text-yellow-300" /> */}
                        Budgeting Tips
                    </h2>
                    <ul className="list-disc list-inside space-y-2 ">
                        <li>
                            Track Every Penny: Use an app or a simple notebook.
                        </li>
                        <li>
                            The 50/30/20 Rule: 50% for Needs, 30% for Wants, 20% for Savings.
                        </li>
                        <li>
                            Set Realistic Goals: Don't try to cut everything at once.
                        </li>
                        <li>
                            Review Weekly: Check in on your spending to stay on track.
                        </li>
                    </ul>
                </div>
                <div className=" p-8  bg-white/5  backdrop-blur-md  rounded-xl  border  border-white/10  shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        {/* <FaChartLine className="mr-3 text-green-300" /> */}
                        Why Financial Planning Matters
                    </h2>
                    <p className=" mb-3">
                        Financial planning is the roadmap to achieving your life goals.
                        It's not just about saving money; it's about making your money
                        work for you.
                    </p>
                    <p className="">
                        Whether you're saving for a house, planning for retirement, or
                        building an emergency fund, a solid plan provides security,
                        reduces stress, and gives you the freedom to live the life you want.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StaticSections;