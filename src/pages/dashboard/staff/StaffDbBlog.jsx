import { useState, useEffect } from "react";
import { getAllBlogs, deleteBlog } from "../../../api/blogApi";
import { useUserStore } from "../../../stores/userStore";
import BlogCreateModal from "../../../components/dashboard/BlogCreateModal";
import BlogEditModal from "../../../components/dashboard/BlogEditModal";
import BlogTestModal from "../../../components/dashboard/BlogTestModal";
import {
  Trash2,
  Edit,
  Plus,
  Eye,
  Search,
  Filter,
  Bug,
  RefreshCw,
} from "lucide-react";

function StaffDbBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10);

  const user = useUserStore((state) => state.user);

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      console.log("Fetching blogs...");
      const response = await getAllBlogs();
      console.log("Blogs fetched:", response);

      const blogsArray = Array.isArray(response) ? response : [];
      console.log("Setting blogs array:", blogsArray);
      setBlogs(blogsArray);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setError("Không thể tải danh sách blog. Vui lòng thử lại sau.");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete blog
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      try {
        await deleteBlog(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
        alert("Xóa bài viết thành công!");
      } catch (err) {
        console.error("Failed to delete blog:", err);
        alert("Không thể xóa bài viết. Vui lòng thử lại sau.");
      }
    }
  };

  // Handle edit blog
  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setShowEditModal(true);
  };

  // Handle blog created
  const handleBlogCreated = async (newBlog) => {
    console.log("Blog created, refreshing list...", newBlog);
    setShowCreateModal(false);
    // Fetch lại danh sách blog từ server để đảm bảo dữ liệu mới nhất
    await fetchBlogs();
  };

  // Handle blog updated
  const handleBlogUpdated = async (updatedBlog) => {
    console.log("Blog updated, refreshing list...", updatedBlog);
    setShowEditModal(false);
    setSelectedBlog(null);
    // Fetch lại danh sách blog từ server để đảm bảo dữ liệu mới nhất
    await fetchBlogs();
  };

  // Filter and sort blogs
  const filteredAndSortedBlogs = blogs
    .filter(
      (blog) =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
          );
        case "oldest":
          return (
            new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date)
          );
        case "title":
          return a.title?.localeCompare(b.title) || 0;
        default:
          return 0;
      }
    });

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredAndSortedBlogs.slice(
    indexOfFirstBlog,
    indexOfLastBlog
  );
  const totalPages = Math.ceil(filteredAndSortedBlogs.length / blogsPerPage);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("vi-VN");
    } catch {
      return dateString;
    }
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Blog</h1>
          <p className="text-gray-600 mt-1">
            Quản lý tất cả bài viết blog trên hệ thống
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchBlogs}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Tải lại
          </button>
          <button
            onClick={() => setShowTestModal(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Bug className="w-4 h-4" />
            Test API
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tạo bài viết mới
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="title">Theo tiêu đề</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-600">
            Tổng số bài viết
          </h3>
          <p className="text-2xl font-bold text-blue-900">{blogs.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-600">
            Kết quả tìm kiếm
          </h3>
          <p className="text-2xl font-bold text-green-900">
            {filteredAndSortedBlogs.length}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-600">
            Trang hiện tại
          </h3>
          <p className="text-2xl font-bold text-purple-900">
            {currentPage}/{totalPages || 1}
          </p>
        </div>
      </div>

      {/* Blog Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                Tiêu đề
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                Nội dung
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                Tác giả
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                Ngày tạo
              </th>
              <th className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-900">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {currentBlogs.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="border border-gray-200 px-4 py-8 text-center text-gray-500"
                >
                  {searchTerm
                    ? "Không tìm thấy bài viết nào"
                    : "Chưa có bài viết nào"}
                </td>
              </tr>
            ) : (
              currentBlogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3">
                    <div className="font-medium text-gray-900">
                      {truncateText(blog.title, 50)}
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    <div className="text-gray-600">
                      {truncateText(blog.content, 80)}
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    <div className="text-gray-600">
                      {blog.author || blog.userName || "N/A"}
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    <div className="text-gray-600">
                      {formatDate(blog.createdAt || blog.date)}
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          window.open(`/blog/${blog.id}`, "_blank")
                        }
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Xem bài viết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(blog)}
                        className="text-yellow-600 hover:text-yellow-800 p-1"
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trước
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sau
          </button>
        </div>
      )}

      {/* Modals */}
      {showCreateModal && (
        <BlogCreateModal
          onClose={() => setShowCreateModal(false)}
          onBlogCreated={handleBlogCreated}
        />
      )}

      {showEditModal && selectedBlog && (
        <BlogEditModal
          blog={selectedBlog}
          onClose={() => {
            setShowEditModal(false);
            setSelectedBlog(null);
          }}
          onBlogUpdated={handleBlogUpdated}
        />
      )}

      {showTestModal && (
        <BlogTestModal onClose={() => setShowTestModal(false)} />
      )}
    </div>
  );
}

export default StaffDbBlog;
