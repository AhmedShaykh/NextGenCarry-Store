import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";
import { cookies } from "next/headers";

const DashboardPage = async () => {

    const cookieStore = await cookies();

    const name = cookieStore.get("name")?.value;

    const firstName = name?.split(" ")[0];

    return (
        <>
            <Header
                name={firstName}
            />

            <Dashboard />
        </>
    )
};

export default DashboardPage;