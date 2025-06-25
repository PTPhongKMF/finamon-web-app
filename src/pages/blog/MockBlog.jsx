import React, { useState } from "react"
import { Link } from "react-router-dom"
import { m } from "../../i18n/paraglide/messages"
import { mockBlogs } from "../../data/mockBlogs"

const BlogCard = ({ blog }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div className="h-48 overflow-hidden">
      <img 
        src={blog.thumbnail} 
        alt={blog.title} 
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-6">
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <span>{blog.date}</span>
        <span className="mx-2">•</span>
        <span>{blog.readTime}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 hover:text-green-600 transition-colors">
        <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>
      <div className="flex items-center">
        <div className="text-sm">
          <p className="text-gray-900 font-medium">{blog.author}</p>
        </div>
      </div>
    </div>
  </div>
)

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center space-x-2">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
    >
      &larr;
    </button>
    {[...Array(totalPages)].map((_, idx) => (
      <button
        key={idx + 1}
        onClick={() => onPageChange(idx + 1)}
        className={
          currentPage === idx + 1
            ? "px-4 py-2 rounded-md bg-green-600 text-white"
            : "px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
        }
      >
        {idx + 1}
      </button>
    ))}
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
    >
      &rarr;
    </button>
  </div>
)

export default function MockBlog() {
  const [currentPage, setCurrentPage] = useState(1)
  const blogsPerPage = 6
  const totalPages = Math.ceil(mockBlogs.length / blogsPerPage)

  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = mockBlogs.slice(indexOfFirstBlog, indexOfLastBlog)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {m["common.topnavbar.blog"]()}
          </h1>
          <p className="text-xl text-gray-600">
            {m["feature.subtitle"]()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}
