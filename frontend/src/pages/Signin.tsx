import { Quote } from "../components/Quote"
import { SigninComponent } from "../components/SigninComponent"


export const Signin = () => {
    return <div>
        <div className="grid grid-cols-2">
            <div>
                <SigninComponent/>
            </div>
            <div className="invisible lg:visible">
                <Quote />
            </div>

        </div>
    </div>
}