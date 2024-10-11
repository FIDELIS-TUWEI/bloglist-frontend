import PropTypes from "prop-types"; 
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService';
import LoginForm from "./components/LoginForm";
import Toggleable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";

export const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  };

  const className = type === 'success' ? 'success' : 'error'

  return (
    <div className={className}>
      {message}
    </div>
  )
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error'])
};


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const blogRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);

      setNotificationMessage(
        `Welcome ${user.name}`
      );
      setNotificationType('success');
      setTimeout(() => {
        setNotificationMessage(null);
        setNotificationType(null);
      }, 5000);

      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Wrong Credentials', error.message);
      // Extract the error message from the server's response
      const errorMessage = error.response?.data?.error ?? 'Wong username or password';
      setNotificationMessage(errorMessage);
      setNotificationType('error');
      setTimeout(() => {
        setNotificationMessage(null);
        setNotificationType(null);
      }, 5000)
    }
  };

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedBlogUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    } 
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser');
    window.location.reload(); // Reload the browser
  };

  const addBlog = async (blogObject) => {
    blogRef.current.toggleVisibility();
    await blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const loginForm = () => {
    return(
      <Toggleable buttonLabel='Login'>
        <LoginForm 
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Toggleable>
    )
  };

  const blogForm = () => (
    <Toggleable buttonLabel="New Blog" ref={blogRef}>
      <BlogForm createBlog={addBlog} />
    </Toggleable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} type={notificationType} />
      { user === null ? loginForm() : 
        <div>
          <p>{user.name} logged-in</p>
          <button type="submit" onClick={handleLogout}>logout</button>
          {blogForm()}
        </div> 
      }

      {blogs.map(blog =>
        <Blog key={blog.title} blog={blog} />
      )}
    </div>
  )
}

export default App;