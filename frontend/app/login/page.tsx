"use client"

import { FormEvent } from "react";

export default function LoginPage() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        
    };

    return (

        <><h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input
                    type="text" />
            </div>

            <div>
                <label>Password</label>
                <input type="password" />
            </div>

            <button type="submit">Login</button>
        </form></>


    );

}