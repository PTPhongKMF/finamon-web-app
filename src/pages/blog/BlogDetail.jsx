import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function BlogDetail() {
    const { id } = useParams();
    
    // Mock data - in a real app, you would fetch this from an API
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Simulate fetching blog post data
    useEffect(() => {
        // Simulate API fetch with timeout
        setTimeout(() => {
            const mockPost = {
                id: parseInt(id),
                title: "Quản lý tài chính cá nhân hiệu quả",
                summary: "Những phương pháp đơn giản giúp bạn quản lý tài chính cá nhân tốt hơn và tiết kiệm nhiều hơn mỗi tháng.",
                content: `<p>Quản lý tài chính cá nhân là một kỹ năng quan trọng mà mọi người nên học. Trong bài viết này, chúng ta sẽ khám phá những phương pháp đơn giản nhưng hiệu quả để quản lý tài chính cá nhân tốt hơn.</p>

<h3>1. Lập ngân sách chi tiêu</h3>
<p>Lập ngân sách là bước đầu tiên và quan trọng nhất trong quản lý tài chính cá nhân. Bạn cần biết mình kiếm được bao nhiêu tiền và chi tiêu bao nhiêu mỗi tháng. Phân chia ngân sách theo các hạng mục: chi phí cố định (tiền nhà, tiền điện nước), chi phí linh hoạt (ăn uống, giải trí), và tiết kiệm.</p>

<h3>2. Theo dõi chi tiêu hàng ngày</h3>
<p>Ghi chép lại mọi khoản chi tiêu, dù là nhỏ nhất. Sử dụng các ứng dụng quản lý tài chính như FINAMON để giúp bạn theo dõi chi tiêu một cách dễ dàng và trực quan.</p>

<h3>3. Áp dụng quy tắc 50/30/20</h3>
<p>Phân bổ thu nhập của bạn theo tỷ lệ:</p>
<ul>
  <li>50% cho các nhu cầu thiết yếu</li>
  <li>30% cho các mong muốn</li>
  <li>20% cho tiết kiệm và đầu tư</li>
</ul>

<h3>4. Xây dựng quỹ khẩn cấp</h3>
<p>Cố gắng tiết kiệm ít nhất 3-6 tháng chi tiêu cơ bản làm quỹ khẩn cấp. Quỹ này sẽ giúp bạn đối phó với những tình huống không lường trước được như mất việc hay vấn đề sức khỏe.</p>

<h3>5. Giảm thiểu nợ</h3>
<p>Ưu tiên thanh toán các khoản nợ có lãi suất cao. Cố gắng không vay mượn thêm khi chưa trả hết các khoản nợ hiện tại.</p>`,
                author: "Nguyễn Văn A",
                date: "15/06/2023",
                image: "/images/finance-management.jpg",
                tags: ["tài chính", "tiết kiệm", "quản lý"],
                comments: [
                    {
                        id: 1,
                        author: "Trần Văn B",
                        date: "16/06/2023",
                        content: "Bài viết rất hữu ích! Tôi đã áp dụng phương pháp lập ngân sách và thấy hiệu quả rõ rệt."
                    },
                    {
                        id: 2,
                        author: "Lê Thị C",
                        date: "17/06/2023",
                        content: "Cảm ơn về những chia sẻ. Tôi đang gặp khó khăn trong việc xây dựng quỹ khẩn cấp, bạn có thể chia sẻ thêm về cách tiết kiệm hiệu quả không?"
                    }
                ]
            };
            
            setPost(mockPost);
            setLoading(false);
        }, 500);
    }, [id]);
    
    // For comments
    const [newComment, setNewComment] = useState("");
    
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        
        // In a real app, you would send this to an API
        const comment = {
            id: post.comments.length + 1,
            author: "Người dùng hiện tại",
            date: new Date().toLocaleDateString("vi-VN"),
            content: newComment
        };
        
        setPost({
            ...post,
            comments: [...post.comments, comment]
        });
        
        setNewComment("");
    };
    
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
        );
    }
    
    if (!post) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                    <h2 className="text-2xl font-bold mb-2">Bài viết không tồn tại</h2>
                    <p>Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                    <Link to="/blog" className="text-green-600 hover:underline mt-4 inline-block">
                        &larr; Quay lại trang Blog
                    </Link>
                </div>
            </div>
        );
    }
    
    return (
        <div className="font-sans text-gray-800">
            {/* Blog Header */}
            <section className="bg-gradient-to-r from-green-500 to-green-700 text-white py-12">
                <div className="container mx-auto px-4">
                    <Link to="/blog" className="text-yellow-200 hover:text-yellow-300 mb-4 inline-flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Quay lại danh sách blog
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2">{post.title}</h1>
                    <div className="flex items-center text-yellow-200 mt-4">
                        <span className="mr-4">Đăng bởi: {post.author}</span>
                        <span>Ngày: {post.date}</span>
                    </div>
                </div>
            </section>
            
            {/* Blog Content */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-8">
                            <img 
                                src={post.image || "/images/blog-placeholder.jpg"} 
                                alt={post.title}
                                className="w-full h-64 object-cover rounded-xl"
                            />
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map(tag => (
                                <span key={tag} className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        
                        <div className="prose prose-lg max-w-none mb-12"
                             dangerouslySetInnerHTML={{ __html: post.content }}>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold">Bình luận ({post.comments.length})</h3>
                                <div className="flex space-x-4">
                                    <Link 
                                        to={`/blog/edit/${post.id}`}
                                        className="bg-yellow-400 text-gray-800 py-2 px-4 rounded-lg hover:bg-yellow-500 transition flex items-center"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                        </svg>
                                        Chỉnh sửa bài viết
                                    </Link>
                                    <button 
                                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition flex items-center"
                                        onClick={() => {
                                            if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
                                                // Handle delete - in a real app, call API here
                                                alert("Đã xóa bài viết");
                                                // Then redirect:
                                                // history.push('/blog');
                                            }
                                        }}
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                        Xóa bài viết
                                    </button>
                                </div>
                            </div>
                            
                            {/* Comment Form */}
                            <form onSubmit={handleCommentSubmit} className="mb-8">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    rows="4"
                                    placeholder="Viết bình luận của bạn..."
                                    required
                                ></textarea>
                                <button 
                                    type="submit"
                                    className="mt-2 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
                                >
                                    Gửi bình luận
                                </button>
                            </form>
                            
                            {/* Comments List */}
                            <div className="space-y-6">
                                {post.comments.map(comment => (
                                    <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-semibold">{comment.author}</span>
                                            <span className="text-gray-500 text-sm">{comment.date}</span>
                                        </div>
                                        <p>{comment.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Related Posts - could be implemented in a real app */}
        </div>
    );
}

export default BlogDetail;