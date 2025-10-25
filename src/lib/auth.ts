import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { getClient } from "./dbconnection";


export const auth = betterAuth({
    database: mongodbAdapter(await getClient()),
    plugins: [nextCookies()],

    emailAndPassword: {
        enabled: true,
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