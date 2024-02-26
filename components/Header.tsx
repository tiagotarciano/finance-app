'use client'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, getProviders, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';


const Header = () => {

    const navigation = [
        { name: 'Dashboard', href: '#', current: true },
        { name: 'Team', href: '#', current: false },
        { name: 'Projects', href: '#', current: false },
        { name: 'Calendar', href: '#', current: false },
      ]


    const isUserLoggedIn = false;
    const { data: session } = useSession();
    // const { teste } = data;
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }

        setUpProviders();
    }, [])

    return (
        <>
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className='flex gap-2 flex-center'>Logo</Link>
            
            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {session?.user ? ( 
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/create-post"
                            className="">
                                Create Post
                        </Link>

                        <button type="button" onClick={signOut}>
                            Sign out
                        </button>

                        <Link href="/profile"
                            className="">
                                Profile
                        </Link>
                        <p>{session?.user?.id}</p>
                    </div>
                ): (
                    <>
                    {providers && 
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}>
                                        Sign in
                                </button>
                            )
                        )
                    }
                    </>
                )}
            </div>

            {console.log(providers)}

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image src="/next.svg"
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                            onClick={() => setToggleDropdown((prev) => !prev)} />

                            {
                                toggleDropdown && 
                                    <div className="dropdown">
                                        <Link 
                                            href="/profile"
                                            className=""
                                            onClick={() => setToggleDropdown(false)}>
                                                My Profile
                                        </Link>
                                        
                                        <Link 
                                            href="/create_post"
                                            className=""
                                            onClick={() => setToggleDropdown(false)}>
                                                Create Post
                                        </Link>

                                        <button 
                                            type="button"
                                            onClick={() => setToggleDropdown(false)}>
                                                Sign Out
                                            </button>
                                    </div>

                            }
                    </div>
                ): (
                    <>
                    {providers && 
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}>
                                        Sign in
                                </button>
                            )
                        )
                    }
                    </>
                )}
            </div>
        </nav>
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </Disclosure.Button>
            teste
                    </div>
                </div>
            </div>
        </Disclosure>
        </>
    )
}

export default Header;