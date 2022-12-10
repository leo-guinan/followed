import UserIcon from "./UserIcon"
import React from "react"
import { useCurrentUser } from "../../users/hooks/useCurrentUser"
import Image from "next/image"
import twitterSignin from "../../../public/twitter-signin.png"
import twitterLogo from "../../../public/twitter-icon.svg"
import FollowerData from "../components/FollowerData"

const UserProfile = () => {

  const user = useCurrentUser()

  return (
    <>
      <div className="mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8">
        {/* Left sidebar & main wrapper */}
        <div className="min-w-0 flex-1 bg-white xl:flex">
          {/* Account profile */}
          <div className="bg-white xl:w-64 xl:flex-shrink-0 xl:border-r xl:border-gray-200">
            <div className="py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
              <div className="flex items-center justify-between">
                {user && user.twitterId && (

                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 flex-shrink-0">
                      <UserIcon />
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <a href={`https://twitter.com/${user.twitterUsername}`} target="_blank" rel="noreferrer noopener"
                         className="group flex items-center space-x-2.5">
                        <img src={`${twitterLogo.src}`} className="h-4 w-4" />
                        <span className="text-sm font-medium text-gray-500 group-hover:text-gray-900">
                {user.twitterUsername}
              </span>
                      </a>
                    </div>
                  </div>
                )}
                {user && !user.twitterId && (
                  <div className="flex items-center space-x-3">
                    <a href="/api/auth/twitter" className="flex items-center space-x-2.5">
                      <Image src={`${twitterSignin.src}`} alt="signin with Twitter" width="158px" height="28px"
                             layout="fixed" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          {user && user.twitterId && (

            <FollowerData />
          )}
        </div>
      </div>
    </>
  )
}

export default UserProfile
