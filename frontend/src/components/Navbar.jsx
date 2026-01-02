"use client"
import { Button } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { AuthModal } from "@/components/modal/AuthModal";

const Navbar = () => {
    const [showModalAuth, setShowModalAuth] = useState(false);
    return (
        <header className="bg-white">
            <div className="mx-auto flex h-18 items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
                <a className="flex items-center gap-2" href="#">
                    <Image
                        src="/assets/L.webp"
                        alt="LitteraNotes Logo"
                        width={55}
                        height={55}
                    />
                    <h2 className="font-bold text-2xl">Littera Notes</h2>
                    <span className="sr-only">Home</span>
                </a>

                <div className="relative">

                    <div className="flex items-center gap-2 border border-neutral-300 pr-2 py-2 rounded-md w-[375px]">

                        {/* Icon Search */}
                        <div className="border-r border-neutral-300 px-2">
                            <RiSearchLine size={20} />
                        </div>

                        {/* Input Search */}
                        <input type="text" className="outline-none" placeholder="Search Note Here" />

                    </div>

                </div>
                <div className="flex items-center justify-end">
                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            <Button
                                className="block [!rounded-md] !bg-white !border !border-neutral-600 !px-5 !py-2.5 !text-sm !font-medium !text-neutral transition hover:!bg-(--secondary-color) hover:!text-white"
                                onClick={() => setShowModalAuth(true)}
                            >
                                Login
                            </Button>
                            <Button
                                className="hidden !rounded-md !px-5 !py-2.5 !text-sm !font-medium !text-white !bg-(--secondary-color) transition hover:!bg-(--secondary-dark-color) sm:block"
                                onClick={() => setShowModalAuth(true)}
                            >
                                Register
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
            <AuthModal open={showModalAuth} onClose={() => setShowModalAuth(false)} />
        </header>
    );
};

export default Navbar;
