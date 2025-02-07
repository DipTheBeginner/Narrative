
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import InputBox from "./InputBox";
import Button from "./Button";
import axios from "axios";

export const SigninComponent = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const name="";
    
    const navigate=useNavigate();
   
    async function handleSubmit() {
        try{

            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                name, email, password
            })

            console.log("Response:", response.data.token);



            if(response.data){
                console.log("Token received:", response.data.token);

                localStorage.setItem("token",(response.data.token))

                navigate("/blog")
    
            } 
            
        }catch(err){
            console.log("login failed",err);
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
                    <InputBox changeHandler={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="Email" label="Email" />
                    <InputBox type='true' changeHandler={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="password" label="Password" />
                    <Button submitHandler={handleSubmit}>Submit</Button>
                </div>
            </div>
        </div>
    </div>
}


