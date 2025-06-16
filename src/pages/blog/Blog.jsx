import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../../components/CardHome/BlogCard";
import { getAllBlogs, deleteBlog } from "../../api/blogApi";
import { useUserStore } from "../../stores/userStore";

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useUserStore((state) => state.user);

  // Fetch blog posts from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const blogs = await getAllBlogs();
        // Ensure blogs is an array before setting state
        if (Array.isArray(blogs)) {
          setBlogPosts(blogs);
        } else {
          console.error("API didn't return an array:", blogs);
          setBlogPosts([]);
        }
        setError(null);
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
        // Fallback to mock data if API fails
        setBlogPosts([
          {
            id: 1,
            title: "Quản lý tài chính cá nhân hiệu quả",
            summary:
              "Những phương pháp đơn giản giúp bạn quản lý tài chính cá nhân tốt hơn và tiết kiệm nhiều hơn mỗi tháng.",
            content: "Nội dung chi tiết về quản lý tài chính cá nhân...",
            author: "Nguyễn Văn A",
            date: "15/06/2023",
            image: "/images/finance-management.jpg",
            tags: ["tài chính", "tiết kiệm", "quản lý"],
          },
          {
            id: 2,
            title: "Cách lập kế hoạch đầu tư dài hạn",
            summary:
              "Hướng dẫn chi tiết cách lập kế hoạch đầu tư dài hạn phù hợp với mục tiêu tài chính của bạn.",
            content: "Nội dung chi tiết về lập kế hoạch đầu tư dài hạn...",
            author: "Trần Thị B",
            date: "20/07/2023",
            image: "/images/investment-planning.jpg",
            tags: ["đầu tư", "kế hoạch", "dài hạn"],
          },
          {
            id: 3,
            title: "5 thói quen giúp tăng khả năng tiết kiệm",
            summary:
              "Khám phá 5 thói quen đơn giản nhưng hiệu quả giúp bạn cải thiện khả năng tiết kiệm tiền mỗi ngày.",
            content: "Nội dung chi tiết về các thói quen tiết kiệm...",
            author: "Lê Văn C",
            date: "05/08/2023",
            image: "/images/saving-habits.jpg",
            tags: ["tiết kiệm", "thói quen", "tài chính cá nhân"],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Function to handle delete blog post
  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      try {
        await deleteBlog(id);
        // Ensure blogPosts is an array before filtering
        if (Array.isArray(blogPosts)) {
          setBlogPosts(blogPosts.filter((post) => post.id !== id));
        } else {
          // Refresh the page to get updated list
          window.location.reload();
        }
      } catch (err) {
        console.error("Failed to delete blog post:", err);
        alert("Xóa bài viết không thành công. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Blog Tài Chính Cá Nhân
          </h1>
          <p className="text-lg md:text-xl mb-6 text-yellow-200 text-center">
            Chia sẻ kiến thức và kinh nghiệm về quản lý tài chính cá nhân
          </p>
          <div className="flex justify-center">
            <Link
              to="/blog/create"
              className="bg-yellow-400 text-green-900 font-semibold px-6 py-3 rounded-full shadow hover:bg-yellow-500 transition flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Tạo Bài Viết Mới
            </Link>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-1/2 relative">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 pl-10"
              />
              <svg
                className="w-5 h-5 text-gray-500 absolute left-3 top-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <div className="flex gap-4">
              <select className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Tất cả chủ đề</option>
                <option value="tài chính">Tài chính</option>
                <option value="đầu tư">Đầu tư</option>
                <option value="tiết kiệm">Tiết kiệm</option>
              </select>
              <select className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="popular">Phổ biến nhất</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-3xl mx-auto">
              <h3 className="text-lg font-semibold mb-2">Lỗi</h3>
              <p>{error}</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold mb-2">
                Chưa có bài viết nào
              </h3>
              <p className="text-gray-600 mb-6">
                Hãy là người đầu tiên tạo bài viết!
              </p>
              <Link
                to="/blog/create"
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
              >
                Tạo bài viết
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <BlogCard key={post.id} post={post} onDelete={handleDelete} />
              ))}
            </div>
          )}

          {/* Pagination - only show when we have posts */}
          {!loading && !error && blogPosts.length > 0 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-2">
                <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </button>
                <button className="px-3 py-1 rounded-md bg-green-600 text-white">
                  1
                </button>
                <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
                  2
                </button>
                <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
                  3
                </button>
                <button className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Blog;
