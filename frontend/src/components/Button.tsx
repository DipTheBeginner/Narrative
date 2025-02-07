
interface ButtonProps{
    children:React.ReactNode
    submitHandler:()=>void

}


export default function Button({children,submitHandler}:ButtonProps){
    return(
        <button onClick={submitHandler} className="bg-neutral-800 w-full flex justify-center items-center rounded-md py-1.5 text-neutral-300 text-md font-medium cursor-pointer hover:bg-neutral-900/90 transition-all duration-300">
            {children}
        </button>
    )
}