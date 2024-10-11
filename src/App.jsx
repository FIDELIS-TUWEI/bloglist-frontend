import PropTypes from "prop-types"; 
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService';
import LoginForm from "./components/LoginForm";

const Notification = ({ message, type }) => {
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
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

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

  const handleBlogSubmit = async (event) => {
    event.preventDefault();

    try {
      const newObject = { title, author, url };
      const response = await blogService.create(newObject);
      setBlogs([...blogs, response])

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

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' };
    const showWhenVisible = { display: loginVisible ? '': 'none' };

    return(
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm 
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  };

  const blogForm = () => (
    <>
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

        <button type="submit">create</button>
      </form>
    </>
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

export default App