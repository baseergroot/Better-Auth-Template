import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { getClient } from "./dbconnection";
import { sendEmail } from "./email";
import { NextResponse } from "next/server";


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
        sendVerificationEmail: async ({ user, url, token }) => {
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
        },
        async afterEmailVerification(user, request) {
            // Your custom logic here, e.g., grant access to premium features
            console.log(`${user.email} has been successfully verified!`);
            return NextResponse.redirect(new URL('/new', request.url));
        }
    },


    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowEmailLogin: true,
        }
    }
})