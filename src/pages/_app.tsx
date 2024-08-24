import { Navbar } from "@/components/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@fontsource-variable/onest';
import { Sidebar } from "@/components/sidebar";
import { AuthProvider, useAuth } from "@/context/authContext";
import { useRouter } from "next/router";
import { UserNavbar } from "@/components/userNavbar";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()
    const hideSidebar = router.pathname === '/' || router.pathname === '/login' || router.pathname === '/signup' ? false : true

    return (
        <AuthProvider>
            <div className="flex flex-col h-screen">
                {
                    !hideSidebar ? <Navbar /> : <UserNavbar />
                }
                <main className={`${hideSidebar && 'flex'} flex-grow`}>
                    {
                        hideSidebar && <Sidebar />
                    }
                    <div className={`h-full ${hideSidebar && 'p-4 w-full'} `}>
                        <Component {...pageProps} />
                    </div>
                </main>
            </div>
        </AuthProvider>
    )
}
