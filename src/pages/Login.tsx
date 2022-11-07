/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { FormEvent, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login, LoginVM } from '../services/http/auth.service';
import authStorage from '../services/storage/auth.storage';

const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const { mutateAsync } = useMutation((data: LoginVM) => login(data));

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = emailRef.current?.value ?? '';
        const password = passwordRef.current?.value ?? '';

        const res = await mutateAsync({ email, password });

        if (res && res.token) {
            authStorage.login(res.token);
            navigate('/home');
        }
    };
    return (
        <main className="flex justify-center items-center w-screen h-screen">
            <div className="bg-neutral rounded-xl shadow w-full m-6 p-6 max-w-3xl space-y-10">
                <h1 className="text-4xl text-center md:text-5xl">
                    🎬 Movies DB
                </h1>
                <form onSubmit={onSubmit} className="flex flex-col space-y-5">
                    <input
                        type="email"
                        placeholder="john@email.com"
                        className="input input-bordered input-primary w-full"
                        ref={emailRef}
                    />
                    <input
                        type="password"
                        placeholder="********"
                        className="input input-bordered input-primary w-full"
                        ref={passwordRef}
                    />
                    <button type="submit" className="btn btn-accent">
                        Log in
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Login;
