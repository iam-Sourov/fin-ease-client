import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { RiTwitterXLine } from "react-icons/ri";
import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full p-8 bg-white/10 backdrop-blur-lg border rounded-t-2xl shadow-lg md:mt-10">
            <div className=" container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:place-items-center md:text-left">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="text-2xl font-bold">Fin-Ease</span>
                        </div>
                        <p className="text-sm ">
                            Your journey to financial freedom starts here..
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                        <ul className="space-y-1 text-sm ">
                            <li>Email: mailMe@gmail.com</li>
                            <li>Phone: 01679------</li>
                            <li>Address: NarayanGanj</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a aria-label="Facebook" className="text-2xl hover:text-blue-400 transition-colors">
                                <Facebook />
                            </a>
                            <a aria-label="Twitter" className="text-2xl transition-colors">
                                <RiTwitterXLine />
                            </a>
                            <a aria-label="Instagram" className="text-2xl hover:text-pink-400 transition-colors">
                                <Instagram />
                            </a>
                            <a aria-label="LinkedIn" className="text-2xl hover:text-blue-500 transition-colors">
                                <Linkedin />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm ">
                    <p>&copy; {new Date().getFullYear()} MyWebsite. All rights reserved.</p>
                    <a href="#" className="hover:underline mt-2 md:mt-0">
                        Terms & Conditions
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;