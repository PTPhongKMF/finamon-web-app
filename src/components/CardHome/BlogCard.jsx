import { Link } from "react-router-dom";

function BlogCard({ post, onDelete }) {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 flex flex-col h-full">
            <div className="h-48 bg-gray-200 relative">
                <img 
                    src={post.image || "/images/blog-placeholder.jpg"} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                    <Link 
                        to={`/blog/edit/${post.id}`}
                        className="bg-yellow-400 p-2 rounded-full hover:bg-yellow-500 transition"
                        title="Chỉnh sửa"
                    >
                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                        </svg>
                    </Link>
                    <button 
                        onClick={() => onDelete(post.id)}
                        className="bg-red-500 p-2 rounded-full hover:bg-red-600 transition"
                        title="Xóa"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <span className="text-sm text-gray-600">{post.author}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{post.summary}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                        <span key={tag} className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
                <Link 
                    to={`/blog/${post.id}`}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition text-center"
                >
                    Đọc tiếp
                </Link>
            </div>
        </div>
    );
}

export default BlogCard;