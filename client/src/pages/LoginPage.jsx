import React from "react";

const LoginPage = (props) => {
    const LoginSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.querySelector("input#email").value;
        const password = event.target.querySelector("input#password").value;
        const response = await fetch("//localhost:3001/api/v1/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        if (parseInt(response.status) === 200) {
            const token = (await response.json()).token;
            localStorage.setItem("token", token);
            window.location.href = "/guests";
            alert(" Login Successful!");
        } else {
            alert("Invalid email or password");
        }
    };


    return (<div class="min-h-screen flex justify-center items-center">
        <div class="w-full max-w-screen-sm">
            <form
                id="loginForm"
                class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                action="//localhost:3001/api/v1/login"
                method="POST"
                onSubmit={LoginSubmit}
            >
                <div class="mb-4">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="email"
                    >
                        Email
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                    />
                </div>

                <div class="mb-6">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="password"
                    >
                        Password
                    </label>
                    <input
                        class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="******************"
                    />
                    <p class="text-red-500 text-xs italic">
                        Please choose a password.
                    </p>
                </div>
                <div class="flex items-center justify-between">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                    <a
                        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        href="/register"
                    >
                        Not a registered user?
                    </a>
                </div>
            </form>
        </div>
    </div>)
};

export default LoginPage;