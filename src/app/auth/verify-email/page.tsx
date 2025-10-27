import Link from "next/link";



export default function Page() {
    return (
        <div className="p-5 ">
            <h1>Please verify your email address</h1>
            <p>
                A verification link has been sent to your email. Please check your inbox and click on the link to verify your account. If you did not receive the email, please check your spam folder or request a new verification email.
            </p>
            <p>Verify your email?</p> <Link href="/">Go back to home</Link>
        </div>
    );
}