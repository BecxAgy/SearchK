"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/images/logo.svg";
import profile from "../assets/images/profile.jpg";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getProviders();

      setProviders(response);
    })();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex flex-center gap-2">
        <Image
          src={logo}
          width={50}
          alt="Logo kempetro"
          className="object-contain"
        />
        <p className="logo_text"></p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-document" className="black_btn">
              Insert Document
            </Link>
            <button onClick={signOut} className="outline_btn">
              Sing Out
            </button>
            <Link href="/profile">
              <Image
                className="rounded-full "
                width={45}
                height={45}
                src={session?.user.image}
                alt="image profile"
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="black_btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              className="rounded-full "
              width={45}
              height={45}
              src={session?.user.image}
              alt="image profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown flex-center">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(!toggleDropdown)}
                >
                  My profile
                </Link>
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(!toggleDropdown)}
                >
                  Create Document
                </Link>
                <button
                  onClick={() => {
                    setToggleDropdown(!toggleDropdown);
                    signOut();
                  }}
                  className="mt-5 black_btn w-full"
                >
                  Sing Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="black_btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
