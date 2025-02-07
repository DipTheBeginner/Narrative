import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import InputBox from "./InputBox";
import Button from "./Button";
import axios from "axios";

export const SignupComponent = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    async function handleSubmit(){
        const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
            name,email,password
        })
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
                    <InputBox changeHandler={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} placeholder="Enter your name" label="Name" />
                    <InputBox  changeHandler={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="Email" label="Email" />
                    <InputBox type='true' changeHandler={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="password" label="Password" />
                    <Button submitHandler={handleSubmit}>Submit</Button>
                </div>
            </div>  
        </div>
    </div>
}


