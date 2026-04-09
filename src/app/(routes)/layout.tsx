import Navbar from "@/components/Navbar";

const RoutesLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default RoutesLayout;