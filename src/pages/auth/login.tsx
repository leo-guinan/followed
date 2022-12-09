import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { LoginForm } from "src/auth/components/LoginForm"
import { useRouter } from "next/router"
import { Suspense } from "react"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="Log In">
      <Suspense fallback="Loading...">
        <LoginForm
          onSuccess={() => router.push(Routes.Home())}
        />
      </Suspense>
    </Layout>
  )
}

export default LoginPage
