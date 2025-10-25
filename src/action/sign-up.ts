"use server"

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const SignupAction = async (formData: FormData) => {
    await auth.api.signUpEmail({
        body: {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        }
    })
    revalidatePath('/auth')
}

export default SignupAction;