"use client"
import Input from "../components/Input";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const defaultData = { username: "", password: "" };

const Login = () => {
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [data, setData] = useState(defaultData);

    const router = useRouter();
    
    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    
    const [isLocked, setIsLocked] = useState(false);

    const onLogin = async (e) => {
        e.preventDefault();

        if (!data.username || !data.password) {
            alert("Please fill all mandatory paramters");
            return;
        }
        try {
            const response = await axios.post('/api/users/login', data);
            //setData(defaultData);
            
            if (response.status === 200) {
                setLoginAttempts(loginAttempts);
                setData(defaultData);          
                router.push('/profile');
            }
        } catch (error) {
            console.log(error);
            setLoginAttempts(loginAttempts + 1);
            if (loginAttempts >= 3) {
                setIsLocked(true);
                alert('Account locked. Please try again later.');
              } else {
                alert('Invalid credentials. Please try again.');
              }
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white shadow-md rounded px-16 pt-8 pb-12 mb-4">
                <h1 className="text-3xl mb-4 text-center">Login</h1>
                <form className="space-y-4">
                    <Input
                        label="UserId"
                        id="username"
                        type="text"
                        value={data.username}
                        onChange={onValueChange}
                    />
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={onValueChange}
                    />
                    <button
                        className="bg-yellow-500 hover:bg-green-700 text-black font-bold py-2 px-4 square-full w-full"
                        onClick={(e) => onLogin(e)}
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-center mt-4">
                    For New Account{" "}
                    <Link href="/register" className="text-blue-500 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;