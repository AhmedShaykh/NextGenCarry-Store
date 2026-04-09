"use client";
import { useState, useRef, useEffect } from "react";
import { BRANDS, CATEGORIES } from "@/lib/static";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [categoryOpen, setCategoryOpen] = useState(false);

    const [brandOpen, setBrandOpen] = useState(false);

    const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

    const [mobileBrandOpen, setMobileBrandOpen] = useState(false);

    const categoryRef = useRef<HTMLDivElement>(null);

    const brandRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const handleClickOutside = (e: MouseEvent) => {

            if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) setCategoryOpen(false);

            if (brandRef.current && !brandRef.current.contains(e.target as Node)) setBrandOpen(false);

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, []);

    return (
        <div className="sticky top-0 z-50 bg-white border-b">
            <div className="max-w-[1400px] mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/">
                        <Image
                            src="/Logo.svg"
                            alt="Logo"
                            width={160}
                            height={72}
                            className="h-16 w-auto"
                            priority
                        />
                    </Link>

                    <div className="hidden md:flex items-center gap-8 px-3">
                        <Link href="/" className="text-foreground text-md font-semibold hover:text-black cursor-pointer">
                            Home
                        </Link>

                        <div className="relative" ref={categoryRef}>
                            <button
                                onClick={() => {
                                    setCategoryOpen(!categoryOpen);
                                    setBrandOpen(false);
                                }}
                                className="flex items-center gap-1 text-foreground text-md font-semibold hover:text-black cursor-pointer"
                            >
                                Categories

                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${categoryOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {categoryOpen && (
                                <div className="absolute top-full left-0 mt-2 w-40 max-h-96 overflow-y-auto bg-white border rounded shadow z-50">
                                    {CATEGORIES.map((cat) => (
                                        <Link
                                            className="block px-4 py-3 font-medium text-[16px] hover:bg-orange-500 hover:text-white"
                                            key={cat.id}
                                            href={`/category/${cat.slug}`}
                                            onClick={() => setCategoryOpen(false)}
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="relative" ref={brandRef}>
                            <button
                                onClick={() => {
                                    setBrandOpen(!brandOpen);
                                    setCategoryOpen(false);
                                }}
                                className="flex items-center gap-1 text-foreground text-md font-semibold hover:text-black cursor-pointer"
                            >
                                Brands

                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${brandOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {brandOpen && (
                                <div className="absolute top-full right-0 mt-2 w-36 max-h-96 overflow-y-auto bg-white border rounded shadow z-50">
                                    {BRANDS.map((brand) => (
                                        <Link
                                            className="block px-4 py-3 font-medium text-[16px] hover:bg-orange-500 hover:text-white"
                                            key={brand.id}
                                            href={`/brand/${brand.slug}`}
                                            onClick={() => setBrandOpen(false)}
                                        >
                                            {brand.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        className="md:hidden font-bold cursor-pointer"
                        onClick={() => {
                            setMobileMenuOpen(!mobileMenuOpen);
                            if (mobileMenuOpen) {
                                setMobileCategoryOpen(false);
                                setMobileBrandOpen(false);
                            }
                        }}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 border-t pt-4 space-y-4">
                        <Link
                            href="/"
                            className="block text-[18px] font-semibold hover:text-black cursor-pointer"
                            onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileCategoryOpen(false);
                                setMobileBrandOpen(false);
                            }}
                        >
                            Home
                        </Link>

                        <div>
                            <button
                                onClick={() => {
                                    setMobileCategoryOpen(!mobileCategoryOpen);
                                    setMobileBrandOpen(false);
                                }}
                                className="flex justify-between w-full text-[18px] font-semibold hover:text-black cursor-pointer"
                            >
                                Categories

                                <ChevronDown
                                    className={`w-5 h-5 transition-transform ${mobileCategoryOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {mobileCategoryOpen && (
                                <div className="pl-4 mt-3 space-y-3 transition-all duration-200">
                                    {CATEGORIES.map((cat) => (
                                        <Link
                                            key={cat.id}
                                            href={`/category/${cat.slug}`}
                                            className="block text-[16px] font-medium"
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                                setMobileCategoryOpen(false);
                                            }}
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <button
                                onClick={() => {
                                    setMobileBrandOpen(!mobileBrandOpen);
                                    setMobileCategoryOpen(false);
                                }}
                                className="flex justify-between w-full text-[18px] font-semibold hover:text-black cursor-pointer"
                            >
                                Brands

                                <ChevronDown
                                    className={`w-5 h-5 transition-transform ${mobileBrandOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {mobileBrandOpen && (
                                <div className="pl-4 mt-3 space-y-3 transition-all duration-200">
                                    {BRANDS.map((brand) => (
                                        <Link
                                            key={brand.id}
                                            href={`/brand/${brand.slug}`}
                                            className="block text-[16px] font-medium"
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                                setMobileBrandOpen(false);
                                            }}
                                        >
                                            {brand.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;