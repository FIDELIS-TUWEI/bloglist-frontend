import PropTypes from "prop-types";
import { useState } from "react";
import { Notification } from "../App";

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [notificationType, setNotificationType] = useState(null);

    const handleBlogSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const blogObject = { title, author, url };
            createBlog(blogObject)
        
            setNotificationMessage(
                `A new blog ${title} by ${author} added`
            );
            setNotificationType('success');
            setTimeout(() => {
                setNotificationMessage(null);
                setNotificationType(null);
            }, 5000);
        
            setTitle('');
            setAuthor('');
            setUrl('');
        } catch (error) {
            console.error("Error creating new blog", error.message);
            setNotificationMessage(`An error occurred when creating "${title}" blog`);
            setNotificationType('error');
            setTimeout(() => {
                setNotificationMessage(null);
                setNotificationType(null);
            }, 5000);
        }
    }
    return (
        <div>
            <Notification message={notificationMessage} type={notificationType} />

            <h2>Create New Blog</h2>
            <form onSubmit={handleBlogSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id='title' value={title} onChange={({ target }) => setTitle(target.value)} placeholder='title' />
            </div>

            <div>
                <label htmlFor="author">Author</label>
                <input type="text" name="author" id="author" value={author} onChange={({ target }) => setAuthor(target.value)} placeholder='author' />
            </div>

            <div>
                <label htmlFor="url">Url</label>
                <input type="text" name="url" id="url" value={url} onChange={({ target }) => setUrl(target.value)} placeholder='url' />
            </div>

            <button type="submit">Save</button>
            </form>
        </div>
    )
};

BlogForm.propTypes = {
    createBlog: PropTypes.func
};

export default BlogForm;