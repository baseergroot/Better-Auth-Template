"use server"

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";


const SigninAction = async (formData: FormData) => {
    const response = await auth.api.signInEmail({
        body: {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        }
    })
    console.log("Signin response:", response);
    revalidatePath('/auth')
}

export default SigninAction;