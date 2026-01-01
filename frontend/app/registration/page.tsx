"use client"

import { FormEvent } from "react";

export default function RegistrationPage() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); 
        
    };

    return (
        <><h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input
                type="text"
                required
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="text"
                    required
                    />
            </div>
            <div>
          <label>Genres</label>
          <div>
                <label>
                    <input
                        type="checkbox"
                        value="1"
                    /> Rock
                    </label>
                    <label>
                    <input
                        type="checkbox"
                        value="2"
                    /> Pop
                    </label>
                    <label>
                    <input
                        type="checkbox"
                        value="3"
                    /> Jazz
                    </label>
                    <label>
                    <input
                        type="checkbox"
                        value="4"
                    /> Classical
                    </label>
                    <label>
                    <input
                        type="checkbox"
                        value="5"
                    /> EDM
                    </label>
            </div>
            </div>
            <div>
                <label>Birth Year</label>
                <input
                    name="birthyear"
                    type="text"
                    min='1900'
                    max='2100'
                    required
                />
            </div>                        
            <div>
                <label>Password</label>
                <input
                    type="password"
                    required
                     />
            </div>
            <button type="submit">Login</button>
        </form></>
    );
}