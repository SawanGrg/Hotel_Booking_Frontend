import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <div className="py-12 mx-auto sm:max-w-xl md:max-w-full lg:max md:px-24 lg:px-8 border-t border-gray-800">
            <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="sm:col-span-2">
                    <a
                        href="/"
                        aria-label="Go home"
                        title="Company"
                        className="inline-flex items-center"
                    >
                        <svg
                            className="w-8 text-deep-purple-accent-400"
                            viewBox="0 0 24 24"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            stroke="currentColor"
                            fill="none"
                        >
                            <rect x="3" y="1" width="7" height="12" />
                            <rect x="3" y="17" width="7" height="6" />
                            <rect x="14" y="1" width="7" height="6" />
                            <rect x="14" y="11" width="7" height="12" />
                        </svg>
                        <span className="ml-2 text-xl font-bold font-weight: 900 tracking-wide text-gray-800 uppercase">
                            Annapurna
                        </span>
                    </a>
                    <div class="mt-6 lg:max-w-4xl">
                        <p class="font-weight: 900 text-gray-900">
                            Welcome to Annapurna Hotel Booking System, Whether you're planning a business trip, family vacation,
                            or romantic getaway, Annapurna Hotel Booking System ensures
                            that your accommodation needs are met with efficiency and excellence.
                            With a diverse selection of top-rated hotels,
                            intuitive interface, and dedicated customer support,
                            booking your ideal stay has never been easier.
                        </p>
                    </div>

                </div>
                <div className="space-y-2">
                    <p className="font-bold tracking-wide">Contacts</p>
                    <div className="flex items-center">
                        <p className="mr-2 text-gray-800">Phone:</p>
                        <a
                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >
                            +977 98069147900
                        </a>
                    </div>
                    <div className="flex items-center">
                        <p className="mr-2 text-gray-800">Email:</p>
                        <a
                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >
                            AnnapurnaBooking@gmail.com
                        </a>
                    </div>
                    <div className="flex items-center">
                        <p className="mr-2 text-gray-800">Address:</p>
                        <a
                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >
                            Ramghat-10, Pokhara, Nepal
                        </a>
                    </div>
                </div>




                <div className="space-y-2 font-weight: 900">
                    <p className=" font-bold tracking-wide font-weight: 1400 text-gray-1000">
                        Services
                    </p>
                    <div className="flex">
                        <a
                            href="/hotel"

                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >

                            Hotels
                        </a>
                    </div>
                    <div className="flex">
                        <a
                            href="/Blog"

                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >

                            Blogs
                        </a>
                    </div>
                    <div className="flex">
                        <a
                            href="/contact"
                            target="_blank"
                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >
                            FAQ
                        </a>
                    </div>
                </div>





            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center pt-5 pb-10 border-t-2 border-gray-800">
                <p className="text-sm lg:text-base font-semibold text-gray-700">
                    © Copyright 2024 Annapurna Hotel Booking System. All rights reserved.
                </p>
            </div>


        </div>
    );
};