import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const currentPath:string = request.nextUrl.pathname;
    const authRoutes: string[]  = ["/sign-in", "/sign-up", "/forgot-password", "/auth"];
    const protectedRoutes: string[] = ["/dashboard", "/profile", "/settings"];

    if(!session && protectedRoutes.includes(currentPath)) {
        return NextResponse.redirect(new URL("/auth", request.url));
    }

    if(session  && authRoutes.includes(currentPath)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}
