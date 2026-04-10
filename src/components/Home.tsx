"use client";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Hero from "@/components/Hero";

const Home = () => {

    const { toast } = useToast();

    useEffect(() => {

        toast({
            title: "Website Under Development",
            description: "This website is currently under development.",
            variant: "success"
        });

    }, [toast]);

    return (
        <>
            <Hero />
        </>
    )
};

export default Home;