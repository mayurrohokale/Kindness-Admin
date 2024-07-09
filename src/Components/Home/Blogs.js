import React, { useState, useEffect } from "react";
import { getAllBlogs, approveBlog } from '../API/users';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleApprove = async (blogId) => {
    try {
      await approveBlog(blogId);
      setBlogs(blogs.map(blog => blog._id === blogId ? { ...blog, status: 'approved' } : blog));
      alert("Blog approved successfully.");
    } catch (error) {
      alert("Error approving blog. Please try again.");
    }
  };

  const handleViewDetails = (blog) => {
    setSelectedBlog(blog);
  };

  const handleCloseOverlay = () => {
    setSelectedBlog(null);
  };

  if (loading) {
    return <p className="text-center mt-4 text-gray-600">Loading blogs...</p>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 md:p-6 bg-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-800">Admin Panel - Blogs</h1>
      <table className="w-full text-sm text-left text-gray-500 bg-gray-50 rounded-lg overflow-hidden">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th className="px-4 py-2 md:px-6 md:py-3">Title</th>
            <th className="px-4 py-2 md:px-6 md:py-3">Description</th>
            <th className="px-4 py-2 md:px-6 md:py-3">Author</th>
            <th className="px-4 py-2 md:px-6 md:py-3">Date</th>
            <th className="px-4 py-2 md:px-6 md:py-3">Status</th>
            <th className="px-4 py-2 md:px-6 md:py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog._id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{blog.title}</td>
              <td className="px-4 py-3 truncate" title={blog.description}>
                {blog.description.length > 100 ? `${blog.description.substring(0, 100)}...` : blog.description}
              </td>
              <td className="px-4 py-3">{blog.author}</td>
              <td className="px-4 py-3">{new Date(blog.date).toLocaleDateString()}</td>
              <td className="px-4 py-3">{blog.status}</td>
              <td className="px-4 py-3 flex space-x-2">
                {blog.status === 'pending' && (
                  <button
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                    onClick={() => handleApprove(blog._id)}
                  >
                    Approve
                  </button>
                )}
                <button
                  className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
                  onClick={() => handleViewDetails(blog)}
                >
                  View All
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-lg md:max-w-3xl w-full">
            <button
              className="absolute top-4 right-4 bg-red-600 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center hover:bg-red-700 transition duration-300"
              onClick={handleCloseOverlay}
            >
              &times;
            </button>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">{selectedBlog.title}</h2>
            <p className="mb-4"><strong>Description:</strong> {selectedBlog.description}</p>
            <p className="mb-4"><strong>Author:</strong> {selectedBlog.author}</p>
            <p className="mb-4"><strong>Date:</strong> {new Date(selectedBlog.date).toLocaleDateString()}</p>
            <p className="mb-4"><strong>Status:</strong> {selectedBlog.status}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
