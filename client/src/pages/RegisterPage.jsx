import React from "react";

const RegisterPage = (props) => {

    const registerSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.querySelector("input#email").value;
        const fullName = event.target.querySelector("input#fullName").value;
        const password = event.target.querySelector("input#password").value;
        const passwordRepeat = event.target.querySelector("input#passwordRepeat").value;
        console.log(email, fullName, password, passwordRepeat);
        const response = await fetch("//localhost:3001/api/v1/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                full_name: fullName,
                password: password,
                repeat_password: passwordRepeat,
            }),
        });
        if (parseInt(response.status) === 200) {
            window.location.href = "/login";
        } else {
            alert("Invalid email or password");
        }
    };

    return (<div class="min-h-screen flex justify-center items-center">
        <div class="w-full max-w-screen-sm">
            <form
                id="registerForm"
                class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                action="//localhost:3001/api/v1/register"
                method="POST"
                onSubmit={registerSubmit}
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
                <div class="mb-4">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="fullName"
                    >
                        Full name
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="e.g. John Doe"
                    />
                </div>
                <div class="mb-4">
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
                <div class="mb-6">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="passwordRepeat"
                    >
                        Re-enter password
                    </label>
                    <input
                        class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="passwordRepeat"
                        name="passwordRepeat"
                        type="password"
                        placeholder="******************"
                    />
                    <p class="text-red-500 text-xs italic">Passwords must match.</p>
                </div>
                <div class="flex items-center justify-between">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Register
                    </button>
                    <a
                        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        href="../login/login.html"
                    >
                        Already a registered user?
                    </a>
                </div>
            </form>
        </div>
    </div>)
};

export default RegisterPage;