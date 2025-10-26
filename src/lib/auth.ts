import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { getClient } from "./dbconnection";
import { sendEmail } from "./email";


export const auth = betterAuth({
    database: mongodbAdapter(await getClient()),
    plugins: [nextCookies()],

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        sendOnSignIn: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            try {
                await sendEmail({
                    to: user.email,
                    subject: 'Verify your email address',
                    text: `Click the link to verify your email: ${url}`,
                });
                console.log(`Verification email sent to ${user.email}`);
            } catch (error) {
                console.error(`Failed to send verification email to ${user.email}:`, error);
                throw error; // Propagate error to Better Auth
            }

        }
    },


    socialProviders: {
        google: {
            enabled: true,
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowEmailLogin: true,
        }
    }
})