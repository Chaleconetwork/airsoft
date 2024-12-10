import { UserNavbar } from "@/components/navigation/userNavbar";
import { AuthProvider, useAuth } from "@/context/authContext";
import { Sidebar } from "@/components/navigation/sidebar";
import { Navbar } from "@/components/navigation/navbar";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import '@fontsource-variable/onest';
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()
    const hideSidebar = router.pathname === '/' || router.pathname === '/forgotPassword' || router.pathname === '/resetPassword' || router.pathname === '/login' || router.pathname === '/signup' ? false : true

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
                    <div className={`h-full ${hideSidebar && 'px-10 py-2 w-full bg-gray-50'}`}>
                        <Component {...pageProps} />
                    </div>
                </main>
            </div>
        </AuthProvider>
    )
}
