import { Suspense } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { BlitzPage, Routes } from "@blitzjs/next"
import FollowerData from "../core/components/FollowerData"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <div className={"flex flex-col items-center"}>
          <div>
            <button
              className="button small"
              onClick={async () => {
                await logoutMutation()
              }}
            >
              Logout
            </button>
          </div>
          <div>

            {!currentUser.twitterId && (
              <>
                <a href="/api/auth/twitter">Log In With Twitter</a>
              </>
            )}
            {currentUser.twitterId && (
              <>
                <span>Twitter Account Linked Successfully!</span>
              </>
            )}

          </div>
          <FollowerData />
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <div className="container">
        <main>
          <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Suspense fallback="Loading...">
              <UserInfo />
            </Suspense>
          </div>

        </main>

      </div>
    </Layout>
  )
}

export default Home
