import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function BlogEdit() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    image: null,
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch post data
  useEffect(() => {
    // Simulate API fetch with timeout
    setTimeout(() => {
      // Mock data - in a real app, fetch from API based on id
      const mockPost = {
        id: parseInt(id),
        title: "Quản lý tài chính cá nhân hiệu quả",
        summary:
          "Những phương pháp đơn giản giúp bạn quản lý tài chính cá nhân tốt hơn và tiết kiệm nhiều hơn mỗi tháng.",
        content: `<p>Quản lý tài chính cá nhân là một kỹ năng quan trọng mà mọi người nên học. Trong bài viết này, chúng ta sẽ khám phá những phương pháp đơn giản nhưng hiệu quả để quản lý tài chính cá nhân tốt hơn.</p>

<h3>1. Lập ngân sách chi tiêu</h3>
<p>Lập ngân sách là bước đầu tiên và quan trọng nhất trong quản lý tài chính cá nhân. Bạn cần biết mình kiếm được bao nhiêu tiền và chi tiêu bao nhiêu mỗi tháng.</p>

<h3>2. Theo dõi chi tiêu hàng ngày</h3>
<p>Ghi chép lại mọi khoản chi tiêu, dù là nhỏ nhất. Sử dụng các ứng dụng quản lý tài chính như FINAMON để giúp bạn theo dõi chi tiêu một cách dễ dàng và trực quan.</p>`,
        image: "/images/finance-management.jpg",
        tags: ["tài chính", "tiết kiệm", "quản lý"],
      };

      setFormData({
        title: mockPost.title,
        summary: mockPost.summary,
        content: mockPost.content,
        image: null, // Can't set File object from string URL
        tags: mockPost.tags,
      });

      setPreviewImage(mockPost.image);
      setLoading(false);
    }, 500);
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
        image: file,
      });

      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // In a real app, you would send this to an API
    console.log("Form submitted for update:", formData);

    // For demo purposes, just show an alert
    alert("Bài viết đã được cập nhật thành công!");

    // In a real app, you would redirect to the updated post
    // history.push(`/blog/${id}`);
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
                  htmlFor="summary"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Tóm tắt bài viết
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="3"
                  placeholder="Nhập tóm tắt ngắn gọn về bài viết"
                  required
                ></textarea>
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
                  rows="10"
                  placeholder="Nhập nội dung chi tiết của bài viết"
                  required
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">
                  Hỗ trợ định dạng HTML cơ bản.
                </p>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Hình ảnh đại diện
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    id="image"
                    name="image"
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
                            image: null,
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

              <div className="mb-8">
                <label className="block text-gray-700 font-semibold mb-2">
                  Thẻ tag
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Nhập tag và nhấn Thêm"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="ml-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition"
                  >
                    Thêm
                  </button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-green-800 hover:text-red-500"
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
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <Link
                  to={`/blog/${id}`}
                  className="bg-gray-300 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-400 transition"
                >
                  Hủy
                </Link>
                <button
                  type="submit"
                  className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
                >
                  Cập nhật bài viết
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
