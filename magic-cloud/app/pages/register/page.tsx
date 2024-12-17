"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import logo from '../../assets/logo.png';

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        last_name: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Registration failed.");
            router.push("/login");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-700 text-gray-900 flex justify-center">
            <div className="max-w-screen-2xl m-0 sm:m-10 bg-white shadow-2xl flex justify-center flex-col shadow-[0_0px_64px_-12px_rgba(240,249,255,1)]">
                <div className="rounded-lg flex flex-col items-center">
                    <Image
                        src={logo}
                        alt="logo"
                    />
                </div>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <div className="flex flex-col items-center">
                    <div className="w-full flex-1 mt-10">
                        <form onSubmit={handleRegister} className="mx-auto max-w-xs">
                            
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full mb-2 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    required
                                />
                            <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full mb-2 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    required
                                />
                            <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full mb-2 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    required
                                />
                            <input
                                    type="text"
                                    name="last_name"
                                    placeholder="Last Name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="w-full  mb-10 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    required
                                />
                            
                            <button
                                type="submit"
                                className="mt-5 tracking-wide font-semibold bg-gradient-to-tl from-purple-400 to-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gradient-to-tr from-blue-500 to-indigo-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                  <circle cx="8.5" cy="7" r="4" />
                                  <path d="M20 8v6M23 11h-6" />
                                </svg>
                                <span className="ml-3">
                                  Register
                                </span>
                              </button>
                        </form>
                        <p className="text-center mt-20 mb-20 text-lg">
                            Already have an account?{" "}
                            <a href="/login" className="text-purple-500 hover:underline">
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
