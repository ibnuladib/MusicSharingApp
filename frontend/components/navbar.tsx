import Link from "next/link";

export default function NavBar() {
    return (
        <><nav>
            <h1>Music Sharing App</h1>
        </nav><div>
                <ul>
                    <li><Link href="/login">Login</Link></li>
                <li><Link href="/registration">Registration</Link></li>
                </ul>
            </div></>

    );
}