import Head from "next/head"
import React, { Suspense } from "react"
import { BlitzLayout } from "@blitzjs/next"
import UserProfile from "./UserProfile"
import Navigation from "./Navigation"


const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
                                                                               title,
                                                                               children
                                                                             }) => {


  return (
    <>
      <Head>
        <title>{title || "followed"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="fixed top-0 left-0 h-full w-1/2 bg-white" aria-hidden="true" />
      <div className="fixed top-0 right-0 h-full w-1/2 bg-gray-50" aria-hidden="true" />
      <div className="relative flex min-h-full flex-col">
        {/* Navbar */}
        <Suspense fallback="Loading...">
          <Navigation />
        </Suspense>
        {children}


      </div>
    </>


  )
}

export default Layout
