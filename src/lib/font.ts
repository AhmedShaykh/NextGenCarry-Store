import localFont from "next/font/local";

export const Mulish = localFont({
    src: [
        {
            path: "../../public/fonts/Mulish-Regular.ttf", weight: "400"
        },
        {
            path: "../../public/fonts/Mulish-Medium.ttf", weight: "500"
        },
        {
            path: "../../public/fonts/Mulish-SemiBold.ttf", weight: "600"
        },
        {
            path: "../../public/fonts/Mulish-Bold.ttf", weight: "700"
        },
        {
            path: "../../public/fonts/Mulish-ExtraBold.ttf", weight: "800"
        },
        {
            path: "../../public/fonts/Mulish-Black.ttf", weight: "900"
        }
    ],
    display: "swap"
});