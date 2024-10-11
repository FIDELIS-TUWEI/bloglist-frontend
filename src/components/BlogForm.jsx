import PropTypes from "prop-types";

const BlogForm = ({ onSubmit, handleChange, value }) => {
    return (
        <div>
            <h2>Create New Blog</h2>
            <form onSubmit={onSubmit}>
                <input value={value} onChange={handleChange} />
                <button type="submit">Save</button>
            </form>
        </div>
    )
};

BlogForm.propTypes = {
    onSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    value: PropTypes.string
};

export default BlogForm;