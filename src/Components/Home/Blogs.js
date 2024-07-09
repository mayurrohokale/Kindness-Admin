import React, { useState, useEffect } from "react";
import { getAllBlogs, approveBlog } from '../API/users';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  return (
    <div>
      <h1>Admin Panel - Blogs</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Author</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td>{blog.title}</td>
              <td>{blog.description}</td>
              <td>{blog.author}</td>
              <td>{blog.date}</td>
              <td>{blog.status}</td>
              <td>
                {blog.status === 'pending' && (
                  <button onClick={() => handleApprove(blog._id)}>Approve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBlogs;
