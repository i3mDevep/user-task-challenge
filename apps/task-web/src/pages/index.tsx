import { UserAuthForm } from "./(components)/auth-form"

export const metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign In account
              </h1>
              <p className="text-sm text-muted-foreground">
                test with admin credentials - admin@seed.com and password
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
  )
}
