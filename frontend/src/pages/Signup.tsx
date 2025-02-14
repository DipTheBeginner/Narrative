import { SignupComponent } from "../components/SignupComponent"
import { Quote } from "../components/Quote"


export const Signup = () => {
    return <div>
        <div className="grid grid-cols-2">
            <div>
                <SignupComponent/>
            </div>
            <div className="invisible lg:visible">
                <Quote />
            </div>

        </div>
    </div>
}