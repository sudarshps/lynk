import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../components/Navbar';
import axiosApi from '../api/axiosApi.js'

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBlogs = async() => {
      await axiosApi.get('/api/article/userarticles')
      .then((res)=>setBlogs(res.data.articles)
      )
    }
  fetchMyBlogs()
  }, []);

  const handleEdit = (id) => {
    navigate(`/editblog/${id}`)
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await axiosApi.delete(`/api/article/delete/${id}`)
      .then((res)=>{
        setBlogs(blogs.filter(blog => blog._id !== id));
      })
      .catch((err)=>console.log(err))
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleView = (id) => {
    navigate(`/blog/${id}`);
  };

  const handleCreate = () => {
    navigate('/createblog');
  };

  return (
    <>
    <ResponsiveAppBar/>
     <div className="max-w-4xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Blogs</h1>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Create Blog
        </button>
      </div>

      {blogs.length === 0 ? (
        <p className="text-gray-500">You haven't created any blogs yet.</p>
      ) : (
        <div className="space-y-4">
          {blogs.map(blog => (
            <div key={blog._id} className="p-4 bg-white shadow rounded-xl flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
              <div className="mb-2 sm:mb-0">
                <h2 className="text-lg font-semibold">{blog.title}</h2>
                <div className="flex space-x-2 text-sm text-gray-600 mt-1">
                  <span>👍 {blog.likes.length}</span>
                  <span>👎 {blog.dislikes.length}</span>
                  <span>🚫 {blog.blocks.length}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleView(blog._id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">View</button>
                <button onClick={() => handleEdit(blog._id)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                <button onClick={() => handleDelete(blog._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
   
  );
};

export default MyBlogs;
