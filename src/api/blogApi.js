import { kyAspDotnet } from './ky.js';
import { buildFormData } from '../utils/api.js';

export const getAllBlogs = async () => {
  try {
    const response = await kyAspDotnet.get('api/blog').json();
    
    let blogs = [];
    
    if (response && response.data && Array.isArray(response.data.items)) {
      blogs = response.data.items;
    } else if (Array.isArray(response)) {
      blogs = response;
    } else {
      blogs = [];
    }
    
    return blogs;
  } catch (error) {
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await kyAspDotnet.get(`api/blog/${id}`).json();
    
    if (response && response.data) {
      return response.data;
    }
    
    return response;
  } catch (error) {
    throw error;
  }
};

export const getBlogsByUserId = async (userId) => {
  try {
    const response = await kyAspDotnet.get(`api/blog/user/${userId}`).json();
    return response;
  } catch (error) {
    throw error;
  }
};

export const createBlog = async (blogData) => {
  try {
    const formData = new FormData();
    formData.append('title', blogData.title || '');
    formData.append('content', blogData.content || '');
    
    if (blogData.imageFile instanceof File) {
      formData.append('imageFile', blogData.imageFile);
    }
    
    try {
      const response = await kyAspDotnet.post('api/blog', {
        body: formData
      }).json();
      
      return response;
    } catch (err) {
      if (err.response) {
        const errorText = await err.response.text();
        throw new Error(`Server error: ${errorText}`);
      }
      
      throw err;
    }
  } catch (error) {
    throw error;
  }
};

export const updateBlog = async (id, blogData) => {
  try {
    if (blogData.imageFile instanceof File) {
      const formData = new FormData();
      formData.append('title', blogData.title || '');
      formData.append('content', blogData.content || '');
      formData.append('imageFile', blogData.imageFile);
      
      const response = await kyAspDotnet.put(`api/blog/${id}`, {
        body: formData
      }).json();
      
      return response;
    } else {
      const jsonData = {
        title: blogData.title || '',
        content: blogData.content || ''
      };
      
      const response = await kyAspDotnet.put(`api/blog/${id}`, {
        json: jsonData
      }).json();
      
      return response;
    }
  } catch (error) {
    if (error.response) {
      try {
        const errorText = await error.response.text();
        throw new Error(`Server error (${error.response.status}): ${errorText}`);
      } catch (e) {
        throw new Error(`Server error (${error.response.status}): ${error.response.statusText}`);
      }
    }
    
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await kyAspDotnet.delete(`api/blog/${id}`);
    return true;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      
      if (status === 403) {
        throw new Error('Không có quyền xóa bài viết này (403 Forbidden)');
      } else if (status === 404) {
        throw new Error('Bài viết không tồn tại (404 Not Found)');
      } else if (status === 401) {
        throw new Error('Chưa đăng nhập hoặc phiên đăng nhập hết hạn (401 Unauthorized)');
      }
      
      try {
        const errorText = await error.response.text();
        throw new Error(`Server error (${status}): ${errorText}`);
      } catch (e) {
        throw new Error(`Server error (${status}): ${error.response.statusText}`);
      }
    }
    
    throw error;
  }
};