

interface BlogComponentProps {
  title: string;
  content: string;
}

export const BlogComponent = ({ title, content }: BlogComponentProps) => {
  return (
    <article className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 mb-6">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors duration-200">
          {title}
        </h2>
        
        <div className="prose prose-gray">
          <p className="text-gray-600 leading-relaxed line-clamp-3">
            {content}
          </p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200">
            Read More →
          </button>
        </div>
      </div>
    </article>
  );
};

