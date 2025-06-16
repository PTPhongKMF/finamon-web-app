import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../../api/blogApi";

function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageFile: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch post data
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const blogData = await getBlogById(id);

        setFormData({
          title: blogData.title || "",
          content: blogData.content || "",
          imageFile: null, // Can't set File object from string URL
        });

        // If there's an image URL, set it as preview
        if (blogData.imageUrl) {
          setPreviewImage(blogData.imageUrl);
        }
      } catch (err) {
        console.error(`Failed to fetch blog with ID ${id}:`, err);
        setError("Failed to load blog post. Please try again later.");

        // Fallback to mock data if API fails
        const mockPost = {
          id: parseInt(id),
          title: "Quản lý tài chính cá nhân hiệu quả",
          content: `<p>Quản lý tài chính cá nhân là một kỹ năng quan trọng mà mọi người nên học. Trong bài viết này, chúng ta sẽ khám phá những phương pháp đơn giản nhưng hiệu quả để quản lý tài chính cá nhân tốt hơn.</p>

<h3>1. Lập ngân sách chi tiêu</h3>
<p>Lập ngân sách là bước đầu tiên và quan trọng nhất trong quản lý tài chính cá nhân. Bạn cần biết mình kiếm được bao nhiêu tiền và chi tiêu bao nhiêu mỗi tháng.</p>

<h3>2. Theo dõi chi tiêu hàng ngày</h3>
<p>Ghi chép lại mọi khoản chi tiêu, dù là nhỏ nhất. Sử dụng các ứng dụng quản lý tài chính như FINAMON để giúp bạn theo dõi chi tiêu một cách dễ dàng và trực quan.</p>`,
          image: "/images/finance-management.jpg",
        };

        setFormData({
          title: mockPost.title,
          content: mockPost.content,
          imageFile: null,
        });

        setPreviewImage(mockPost.image);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
      });

      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // No tag functions needed

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Prepare the data for submission - only the three required fields
      const blogData = {
        title: formData.title,
        content: formData.content,
        imageFile: formData.imageFile,
      };

      console.log("Updating blog with data:", blogData);

      const response = await updateBlog(id, blogData);
      console.log("Blog updated successfully:", response);

      alert("Bài viết đã được cập nhật thành công!");

      // Redirect to the updated post
      navigate(`/blog/${id}`);
    } catch (err) {
      console.error("Failed to update blog post:", err);
      if (err.message) {
        setError(`Không thể cập nhật bài viết: ${err.message}`);
      } else {
        setError("Không thể cập nhật bài viết. Vui lòng thử lại sau.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-800">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link
            to="/blog"
            className="text-yellow-200 hover:text-yellow-300 mb-4 inline-flex items-center"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Quay lại danh sách blog
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            Chỉnh Sửa Bài Viết
          </h1>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-yellow-50 rounded-xl p-8 shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Tiêu đề bài viết
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Nhập tiêu đề bài viết"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="content"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Nội dung bài viết
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="15"
                  placeholder="Nhập nội dung chi tiết của bài viết"
                  required
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">
                  Hỗ trợ định dạng HTML cơ bản.
                </p>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="imageFile"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Hình ảnh đại diện
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    id="imageFile"
                    name="imageFile"
                    onChange={handleImageChange}
                    className="border border-gray-300 rounded-lg p-2"
                    accept="image/*"
                  />
                  {previewImage && (
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setFormData({
                            ...formData,
                            imageFile: null,
                          });
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="mb-6 bg-red-100 text-red-700 p-4 rounded-lg">
                  <p>{error}</p>
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <Link
                  to={`/blog/${id}`}
                  className="bg-gray-300 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-400 transition"
                  disabled={saving}
                >
                  Hủy
                </Link>
                <button
                  type="submit"
                  className={`${
                    saving
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white py-3 px-6 rounded-lg transition flex items-center`}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Đang cập nhật...
                    </>
                  ) : (
                    "Cập nhật bài viết"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogEdit;
