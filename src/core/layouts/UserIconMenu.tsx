import { Menu } from "@headlessui/react"
import React from "react"
import UserIcon from "./UserIcon"

const UserIconMenu = () => {
  return (
    <>
      <Menu.Button
        className="flex rounded-full bg-indigo-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700">
        <span className="sr-only">Open user menu</span>
        <UserIcon />
      </Menu.Button>
    </>
  )
}

export default UserIconMenu
