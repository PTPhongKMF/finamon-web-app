import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createBlog } from "../../api/blogApi";

function BlogCreate() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageFile: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Prepare the data for submission - only the three required fields
      const blogData = {
        title: formData.title,
        content: formData.content,
        imageFile: formData.imageFile,
      };

      console.log("Submitting blog with data:", blogData);

      const response = await createBlog(blogData);
      console.log("Blog created successfully:", response);

      alert("Bài viết đã được tạo thành công!");

      // Redirect to the new post or blog list
      navigate(`/blog/${response.id}`);
    } catch (err) {
      console.error("Failed to create blog post:", err);
      if (err.message) {
        setError(`Không thể tạo bài viết: ${err.message}`);
      } else {
        setError("Không thể tạo bài viết. Vui lòng thử lại sau.");
      }
    } finally {
      setLoading(false);
    }
  };

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
            Tạo Bài Viết Mới
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

              <div className="mb-8">
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
                  to="/blog"
                  className="bg-gray-300 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-400 transition"
                  disabled={loading}
                >
                  Hủy
                </Link>
                <button
                  type="submit"
                  className={`${
                    loading
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white py-3 px-6 rounded-lg transition flex items-center`}
                  disabled={loading}
                >
                  {loading ? (
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
                      Đang xử lý...
                    </>
                  ) : (
                    "Đăng bài viết"
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

export default BlogCreate;
