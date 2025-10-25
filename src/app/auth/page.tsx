
import SigninAction from "@/action/sign-in"
import SignupAction from "@/action/sign-up"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import GoogleLogin from "./googleLogin"

const Page = async () => {
    const session = await auth?.api?.getSession({
        headers: await headers()
    })
    // const session = false
    if (!session) {
        return (
            <div className='flex gap-5'>

                {/* Email Sign Up */}
                <form action={SignupAction} className='flex flex-col gap-2 border p-5'>
                    <input type="text" placeholder='Name' name="name" />
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button type="submit">Sign Up</button>
                </form>

                {/* Email Sign In */}
                <form action={SigninAction} className='flex flex-col gap-2 border p-5'>
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button type="submit">Sign In</button>
                </form>

                {/* Google Sign In */}
                <GoogleLogin />
            </div>
        )
    }

    return (
        <div>
            <h1>Welcome {session.user.name}</h1>
            <form action={async () => {
                "use server"
                await auth.api.signOut({
                    headers: await headers()
                })
                revalidatePath('/auth')
            }}>
                <button>Sign Out</button>
            </form>
        </div>
    )

}

export default Page