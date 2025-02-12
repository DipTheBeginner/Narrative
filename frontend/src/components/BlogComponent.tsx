interface BlogComponentProps {
  // authorName: string;
  title: string;
  content: string;
}

export const BlogComponent = ({
  // authorName,
  title,
  content,
}: BlogComponentProps) => {
  return (
    <div className="p-4 border-b border-slate-200 pb-4 flex">
      <div className="flex justify-center flex-col">
        {/* <div className="font-extrabold pl-2 text-sm flex justify-center flex-col ">
          {authorName} 
        </div> */}
        <div className=" text-2xl font-bold ">{title}</div>
        <div className="font-extralight">{content}</div>
        
      </div>
    </div>
  );
};
