
interface InputBoxProps {
    placeholder: string,
    label: string,
    changeHandler: (e:React.ChangeEvent<HTMLInputElement>) => void
    type?:string
}

export default function InputBox({ placeholder, label, changeHandler, type }: InputBoxProps) {
    return (
        <div className=" flex flex-col mb-2 ">
            <label htmlFor="">{label}</label>
            <input type={`${type ? 'password' : 'text'}`} className=" border-2 rounded-md px-2 py-1" onChange={changeHandler}  placeholder={placeholder} />
        </div>
    )
}