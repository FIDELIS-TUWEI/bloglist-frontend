import PropTypes from "prop-types";

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
    <button>View</button>
  </div>  
);

Blog.propTypes = {
  blog: PropTypes.object
}

export default Blog