"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";

const Header = ({ name }: any) => {

    const router = useRouter();

    const Logout = async () => {

        try {

            const response = await fetch("/api/logout", {
                method: "POST",
                credentials: "include"
            });

            const data = await response.json();

            console.log(data);

            if (response.status === 200) {

                Cookies.remove("token");

                Cookies.remove("name");

                router.push("/login");

                router.refresh();

            }

        } catch (error) {

            console.error("LogOut Failed:", error);

        }

    };

    return (
        <div className="sticky top-0 z-50 bg-white border-b">
            <div className="max-w-[1400px] mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/">
                        <Image
                            src="/Full Logo.svg"
                            alt="Logo"
                            width={180}
                            height={72}
                            className="h-20 w-auto"
                            priority
                        />
                    </Link>

                    <div className="flex items-center gap-4 px-3">
                        <h1 className="text-foreground text-lg font-bold">
                            {name}
                        </h1>

                        <Button
                            className="px-3 py-5 text-md cursor-pointer"
                            onClick={Logout}
                        >
                            Log Out
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Header;