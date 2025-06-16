import { useState, useEffect } from "react";
import { updateBlog } from "../../api/blogApi";
import { X, Upload, Image as ImageIcon } from "lucide-react";

function BlogEditModal({ blog, onClose, onBlogUpdated }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageFile: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize form data when blog prop changes
  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        content: blog.content || "",
        imageFile: null,
      });

      // Set existing image as preview if available
      if (blog.image) {
        setPreviewImage(blog.image);
      }
    }
  }, [blog]);

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
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Vui lòng chọn file hình ảnh hợp lệ");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Kích thước file không được vượt quá 5MB");
        return;
      }

      setFormData({
        ...formData,
        imageFile: file,
      });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      imageFile: null,
    });
    // Reset to original image if it exists, otherwise null
    setPreviewImage(blog?.image || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Vui lòng nhập tiêu đề bài viết");
      return;
    }

    if (!formData.content.trim()) {
      setError("Vui lòng nhập nội dung bài viết");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const blogData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        imageFile: formData.imageFile,
      };

      const response = await updateBlog(blog.id, blogData);
      onBlogUpdated(response);
    } catch (err) {
      console.error("Failed to update blog:", err);
      setError(
        err.message || "Không thể cập nhật bài viết. Vui lòng thử lại sau."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!blog) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            Chỉnh sửa bài viết
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Title */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tiêu đề bài viết *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tiêu đề bài viết"
              required
              disabled={loading}
            />
          </div>

          {/* Content */}
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nội dung bài viết *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập nội dung chi tiết của bài viết"
              required
              disabled={loading}
            />
            <p className="text-sm text-gray-500 mt-1">
              Hỗ trợ định dạng HTML cơ bản.
            </p>
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hình ảnh đại diện
            </label>

            {!previewImage ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="imageFile"
                  name="imageFile"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                  disabled={loading}
                />
                <label
                  htmlFor="imageFile"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    Nhấp để chọn hình ảnh mới
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    PNG, JPG, GIF tối đa 5MB
                  </span>
                </label>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <input
                    type="file"
                    id="imageFileReplace"
                    name="imageFile"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                    disabled={loading}
                  />
                  <label
                    htmlFor="imageFileReplace"
                    className="bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600 transition-colors cursor-pointer"
                    title="Thay đổi hình ảnh"
                  >
                    <Upload className="w-4 h-4" />
                  </label>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    title="Xóa hình ảnh"
                    disabled={loading}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Blog Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Thông tin bài viết
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">ID:</span> {blog.id}
              </div>
              <div>
                <span className="font-medium">Tác giả:</span>{" "}
                {blog.author || blog.userName || "N/A"}
              </div>
              <div>
                <span className="font-medium">Ngày tạo:</span>{" "}
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString("vi-VN")
                  : blog.date || "N/A"}
              </div>
              <div>
                <span className="font-medium">Cập nhật lần cuối:</span>{" "}
                {blog.updatedAt
                  ? new Date(blog.updatedAt).toLocaleDateString("vi-VN")
                  : "N/A"}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  Đang cập nhật...
                </>
              ) : (
                <>
                  <ImageIcon className="w-4 h-4" />
                  Cập nhật bài viết
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogEditModal;
