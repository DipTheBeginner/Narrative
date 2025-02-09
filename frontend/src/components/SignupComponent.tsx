import { useState } from "react"
import { Link } from "react-router-dom"
import Button from "./Button";
import axios from "axios";
import { signupSchema } from "@dipthebeginner/narrative-common";

export const SignupComponent = () => {
    const [postInputs, setPostInputs] = useState<signupSchema>({
        name: "",
        email: "",
        password: ""
    })

    async function handleSubmit() {
        const response = await axios.post("http://localhost:3000/api/v1/user/signup", postInputs)

        console.log(response.data);

    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="text-3xl font-extrabold">
                    Create an account
                </div>
                <div className="text-slate-400">
                    Already have an account ?
                    <Link className="pl-2 underline" to={"/signin"}>Login</Link>
                </div>
                <div className="mt-4">
                    <InputBox label="Username" placeholder="Enter your name" changeHandler={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} />
                    <InputBox label="Passowrd" placeholder="*********" changeHandler={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <InputBox label="Email" placeholder="Enter your email" changeHandler={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
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


