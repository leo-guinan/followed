import { useCurrentUser } from "../../users/hooks/useCurrentUser"
import React from "react"

const UserIcon = () => {
  const user = useCurrentUser()

  return (
    <>
      {user && user.twitterProfilePicture && (
        <img
          className="h-8 w-8 rounded-full"
          src={user.twitterProfilePicture}
          alt=""
        />
      )}
      {!user || !user.twitterProfilePicture && (
        <span>Your Profile</span>
      )}

    </>
  )
}

export default UserIcon
