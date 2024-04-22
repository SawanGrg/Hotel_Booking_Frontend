import React, { useEffect, useState } from 'react';
import './ViewAllBlog.css';
import { Link } from 'react-router-dom';
import GetAllBlog from '../../services/admin/GetAllBlog';
import toast, { Toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { locale } from 'dayjs';
import { set } from 'react-hook-form';

export default function ViewAllBlogs() {
  const [blogList, setBlogList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const allBlog = async () => {
    const allBlog = await GetAllBlog();
    setBlogList(allBlog);
    setFilteredData(allBlog);
  };

  useEffect(() => {
    allBlog();
    console.log('Blog List:', blogList);
  }, []);

  const truncateDescription = (description) => {
    if (description.length > 100) {
      return description.substring(0, 50) + '...';
    }
    return description;
  };
  const truncateTitle = (description) => {
    if (description.length > 30) {
      return description.substring(0, 30) + '...';
    }
    return description;
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  return (
    <div>
      <div className='body'>
        <Toaster
          position='top-center'
          toastOptions={{
            duration: 3000,
          }}
        />
      </div>

      <div className='room-header'>
        <h1>View All Blogs</h1>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>Blog Title</th>
              <th>Blog Description</th>
              <th>Blog Category</th>
              <th>Blog Posted Date</th>
              <th>Blog Author</th>
              <th>Blog Status</th>
              <th>Verify</th>
            </tr>
          </thead>
          <tbody>
            {blogList.map((blog, index) => (
              <tr key={index}>
                <td>{truncateTitle(blog.title)}</td>
                <td>{truncateDescription(blog.description)}</td>
                <td>{blog.blogTag}</td>
                <td>{formatDate(blog.createdDate)}</td>
                <td>{blog.user.username}</td>
                <td>{blog.status}</td>
                <td>
                  <Link to={`/admin/blog/${blog.id}`}>
                    <button>View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
