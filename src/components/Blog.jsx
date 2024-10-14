import PropTypes from "prop-types";
import { useState } from "react";
import blogService from '../services/blogs';

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async () => {
    const updatedBlogObject  = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user
    };

    try {
      const returnedBlog = await blogService.update(blog.id || blog._id, updatedBlogObject);
      updateBlog(returnedBlog);
    } catch (error) {
      console.error("Failed to update likes:", error.message);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Delete blog: ${blog.title} by ${blog.author}? This action can't be undone.`);

    if (confirmDelete) {
      try {
        await blogService.remove(blog.id || blog._id);
        removeBlog(blog.id || blog._id);
      } catch (error) {
        console.error("Failed to delete blog:", error.message);
      }
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
      <p>{blog.title} {blog.author} </p>
      <button onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>

      {visible && (
        <div>
          <p>Title: {blog.title}</p>
          <p>Url: {blog.url}</p>
          <p>Likes: {blog.likes}
            <button onClick={handleLike}>like</button>
          </p>
          <p>Author: {blog.author}</p>
          <button onClick={handleDelete}>remove</button>
        </div>
      )}
    </div>  
  )
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog