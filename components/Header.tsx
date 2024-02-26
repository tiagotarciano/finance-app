'use client'

import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, getProviders, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Header = () => {
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
    )
}

export default Header;