
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "./Button";
import axios from "axios";
import { signinSchema } from "@dipthebeginner/narrative-common";

export const SigninComponent = () => {
    const [postInputs, setPostInputs] = useState<signinSchema>({
        email: "",
        password: ""
    })


    const navigate = useNavigate();

    async function handleSubmit() {

        console.log("reached here");
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", postInputs)

            console.log("data is ", response.data);


            if (response.data.token) {
                console.log("Token received:", response.data.token);

                localStorage.setItem("token", (response.data.token));

                navigate("/blog/getAll")
            }


        } catch (err) {
            console.log("login failed", err);
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="text-3xl font-extrabold">
                    Login to your account
                </div>
                <div className="text-slate-400">
                    Don't have an account ?
                    <Link className="pl-2 underline" to={"/signup"}>Signup</Link>
                </div>
                <div className="mt-4">
                    <InputBox placeholder="Email" label="Email" changeHandler={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value,
                        })
                    }} />
                    <InputBox placeholder="password" label="Password" changeHandler={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value,
                        })
                    }} />

                    <Button submitHandler={handleSubmit}>Submit</Button>
                </div>
            </div>
        </div>
    </div>
}


interface InputBoxProps {
    placeholder: string,
    label: string,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
}

export default function InputBox({ placeholder, label, changeHandler, type }: InputBoxProps) {
    return (
        <div className=" flex flex-col mb-2 ">
            <label htmlFor="">{label}</label>
            <input type={`${type ? 'password' : 'text'}`} className=" border-2 rounded-md px-2 py-1" onChange={changeHandler} placeholder={placeholder} />
        </div>
    )
}


