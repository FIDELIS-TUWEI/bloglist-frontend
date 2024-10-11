import PropTypes from "prop-types";
import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

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
            <button>like</button>
          </p>
          <p>Author: {blog.author}</p>
        </div>
      )}
    </div>  
  )
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog