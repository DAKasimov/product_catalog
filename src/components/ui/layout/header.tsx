"use client"

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {siteConfig} from "@/src/config/site.config";
import {layoutConfig} from "@/src/config/layout.config";
import RegistrationModal from "@/src/components/ui/modals/registration.modal";
import LoginModal from "@/src/components/ui/modals/login.modal";
import {useState} from "react";
import {signOutFunc} from "@/src/actions/sign-out";
import {useAuthStore} from "@/src/store/auth.store";

export const Logo = () => {
    return (
        <Image
            src='/icon.webp'
            alt={siteConfig.title}
            height={26}
            width={26}
            priority
        />
    );
};

export default function Header() {

    const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(false);
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

    const handleSignOut = async () => {

        try {
            await signOutFunc();
        } catch (e) {
            console.error(e);
        }

        setAuthState('unauthenticated', null)
    }

    const getNavItems = () => {
        return siteConfig.navItems.filter((item)=>{
            if (item.href === '/ingredients') {
                return isAuth
            }
            return true
        })
            .map((item) => {
            const isActive = pathname === item.href
            return <NavbarItem key={item.href}>
                <Link
                    color="foreground"
                    href={item.href}
                    className={`px-3 py-1
                     ${isActive ? 'text-blue-500' : 'text-foreground'}
                      hover:text-blue-300 hover:border
                      hover:border-blue-300 hover:rounded-md
                      transition-colors
                      transition-border
                      duration-200`}>
                    {item.label}
                </Link>
            </NavbarItem>
        })
    }

    const pathname = usePathname()

    const {isAuth, session, status, setAuthState} = useAuthStore()


    return (
        <Navbar style={{height: layoutConfig.headerHeight}}>
            <NavbarBrand>
                <Link href="/src/app/public" className='flex gap-1'>
                    <Logo/>
                    <p className="font-bold text-inherit">{siteConfig.title}</p>
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {getNavItems()}
            </NavbarContent>

            <NavbarContent justify="end">
                {isAuth && <p>Привет, {session?.user?.email}</p>}
                {status === 'loading' ? <p>Загрузка...</p> : !isAuth ? <>
                        <NavbarItem className="hidden lg:flex">
                            <Button as={Link}
                                    color="primary"
                                    href="#"
                                    variant="flat"
                                    onPress={() => setIsLoginOpen(true)}
                            >
                                Логин
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link}
                                    color="primary"
                                    href="#"
                                    variant="flat"
                                    onPress={() => setIsRegistrationOpen(true)}
                            >
                                Регистрация
                            </Button>
                        </NavbarItem>
                    </>
                    :
                    <NavbarItem className="hidden lg:flex">
                        <form action={handleSignOut}>
                            <Button type="submit" color="primary" variant="flat">
                                Выйти
                            </Button>
                        </form>
                    </NavbarItem>
                }
            </NavbarContent>

            <RegistrationModal
                isOpen={isRegistrationOpen}
                onClose={() => setIsRegistrationOpen(false)}
            />

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
            />

        </Navbar>
    );
}
