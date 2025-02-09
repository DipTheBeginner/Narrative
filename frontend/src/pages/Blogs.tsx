import { useEffect, useState } from "react"
import { BlogComponent } from "../components/BlogComponent"
import axios from "axios"

interface postProps{
    author:string,
    title:string,
    content:string,
    publishedDate:string,
}

export const Blogs=()=>{

    const[post,setPost]=useState<postProps>({
        author:"",
        title:"",
        content:"",
        publishedDate:""
    })

    const [loading,setLoading]=useState(true);


    useEffect(()=>{
        const fetchBlog=async ()=>{
            try{
                setLoading(true);

                const response=await axios.get<postProps>("http://localhost:3000/post/:blogId");
                setPost(response.data);

            }finally{
                setLoading(false);
            }

        }

        fetchBlog();
    },[])

    if(loading){
        return (
            <div>
                Loadinggggg....
            </div>
        )
    }


    

    return(
        
        <div className="max-w-xl flex justify-center flex-col">
            
            <BlogComponent authorName={post.author} title={post.title} content={post.content} publishedDate={post.publishedDate}/>
            
        </div>
    )
}