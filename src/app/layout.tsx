import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/src/components/ui/layout/header";
import {Provider} from "@/src/providers/provider";
import {siteConfig} from "@/src/config/site.config";
import {layoutConfig} from "@/src/config/layout.config";
import {SessionProvider} from "next-auth/react";
import {auth} from "@/src/auth/auth";
import AppLoader from "@/src/hoc/app-loader";
import Title from "@/src/components/ui/layout/title";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: siteConfig.title,
    description: siteConfig.description,
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await auth()

    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Provider>
            <SessionProvider session={session}>
                <AppLoader session={session}>
                    <Header/>
                    <Title/>
                    <main
                        className={`flex flex-col 
                max-w-[1024px] mx-auto px-[24px] justify-start items-center`}
                        style={{height: `calc(100vh - ${layoutConfig.headerHeight} - ${layoutConfig.footerHeight})`}}
                    >
                        {children}
                    </main>
                    <footer className={`flex justify-center items-center`}
                            style={{height: `${layoutConfig.footerHeight}`}}
                    >
                        <p>
                            {siteConfig.description}
                        </p>
                    </footer>
                </AppLoader>
            </SessionProvider>
        </Provider>

        </body>
        </html>
    );
}
