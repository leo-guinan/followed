import { useCurrentUser } from "../../users/hooks/useCurrentUser"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import Image from "next/image"
import logo from "../../../public/logo.png"
import { Bars3CenterLeftIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import UserIconMenu from "./UserIconMenu"
import { classNames } from "../../utils/tools"
import { useMutation } from "@blitzjs/rpc"
import logout from "../../auth/mutations/logout"

const Navigation = () => {
  const [logoutMutation] = useMutation(logout)

  const handleLogout = async () => {
    await logoutMutation()
  }

  const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "Domains", href: "#", current: false }
  ]
  const userNavigation = [
    { name: "Your Profile", href: "#", onClick: () => false },
    { name: "Settings", href: "#", onClick: () => false },
    { name: "Sign out", href: "#", onClick: handleLogout }
  ]

  const user = useCurrentUser()
  return (
    <><Disclosure as="nav" className="flex-shrink-0 bg-indigo-600">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Logo section */}
              <div className="flex items-center px-2 lg:px-0 xl:w-64">
                <div className="flex-shrink-1">
                  <Image src={`${logo.src}`} alt="Who Followed Me?" width="60px" height="60px" layout="fixed" />

                </div>
              </div>

              {/* Search section */}
              <div className="flex flex-1 justify-center lg:justify-end">
                <div className="w-full px-2 lg:px-6">
                  <label htmlFor="search" className="sr-only">
                    Search projects
                  </label>
                  <div className="relative text-indigo-200 focus-within:text-gray-400">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border border-transparent bg-indigo-400 bg-opacity-25 py-2 pl-10 pr-3 leading-5 text-indigo-100 placeholder-indigo-200 focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                      placeholder="Search projects"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button
                  className="inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-400 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3CenterLeftIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {/* Links section */}
              <div className="hidden lg:block lg:w-80">
                <div className="flex items-center justify-end">
                  <div className="flex">
                    {user && (
                      <>
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="rounded-md px-3 py-2 text-sm font-medium text-indigo-200 hover:text-white"
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </>
                    )}
                    {!user && (
                      <>
                        <Link href={Routes.SignupPage()}>
                          <a className="rounded-md px-3 py-2 text-sm font-medium text-indigo-200 hover:text-white">
                            <strong>Sign Up</strong>
                          </a>
                        </Link>
                        <Link href={Routes.LoginPage()}>
                          <a className="rounded-md px-3 py-2 text-sm font-medium text-indigo-200 hover:text-white">
                            <strong>Login</strong>
                          </a>
                        </Link>
                      </>
                    )}
                  </div>
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <UserIconMenu />

                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                onClick={item.onClick}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">

              {user && navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "text-white bg-indigo-800"
                      : "text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {!user && (
                <>
                  <Link href={Routes.SignupPage()}>
                    <Disclosure.Button

                      as="a"
                      className="text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Sign Up
                    </Disclosure.Button>
                  </Link>
                  <Link href={Routes.LoginPage()}>
                    <Disclosure.Button
                      as="a"
                      className="text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Login
                    </Disclosure.Button>
                  </Link>
                </>
              )}

            </div>
            <div className="border-t border-indigo-800 pt-4 pb-3">
              <div className="space-y-1 px-2">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-indigo-200 hover:bg-indigo-600 hover:text-indigo-100"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>

    </>
  )
}

export default Navigation
