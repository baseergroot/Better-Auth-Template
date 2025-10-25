import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function ServerComponent() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session) {
        return <div>Not authenticated</div>
    }
    return (
        <div>
            <h1>Welcome {session.user.name}</h1>
            <form action={async () => {
                "use server"
                await auth.api.signOut({
                    headers: await headers()
                })
            }}>
                <button>Sign Out</button>
            </form>
        </div>
    )
}