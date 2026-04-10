const Hero = () => {
    return (
        <div className="relative h-96 md:h-[500px] overflow-hidden">
            <img
                className="w-full h-full object-cover"
                src={"/assets/Hero.webp"}
                alt="Luxury Boutique"
            />

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="max-w-[1400px] mx-auto text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Welcome To NEXTGENCARRY
                    </h2>

                    <p className="text-lg md:text-xl">
                        10 years of expertise in luxury fashion
                    </p>
                </div>
            </div>
        </div>
    )
};

export default Hero;