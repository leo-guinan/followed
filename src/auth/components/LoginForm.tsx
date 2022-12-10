import { FORM_ERROR } from "src/core/components/Form"
import { useMutation } from "@blitzjs/rpc"
import { LockClosedIcon } from "@heroicons/react/20/solid"
import React, { useEffect, useState } from "react"
import logo from "../../../public/logo.png"
import login from "../mutations/login"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useCurrentUser } from "../../users/hooks/useCurrentUser"

type LoginFormProps = {
  onSuccess?: () => Promise<boolean>
}

export const LoginForm = (props: LoginFormProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginMutation] = useMutation(login)
  const router = useRouter()
  const currentUser = useCurrentUser()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await loginMutation({ email, password })
      await props.onSuccess?.()

    } catch (error: any) {

      return { [FORM_ERROR]: error.toString() }

    }
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="mx-auto h-12 w-full flex-col">
              <img src={`${logo.src}`} alt="Who Followed Me?" className="mx-auto h-16 w-16" />
            </div>

            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>


            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>

  )
}

export default LoginForm
