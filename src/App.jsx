import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

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
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Wrong Credentials', error.message);
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
      console.log(response);
  
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      console.error("Error creating new blog", error.message);
    }
  }

  const loginForm = () => (
    <>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username</label>
            <input id='username' type="text" name='username' placeholder='username' value={username} onChange={({ target }) => setUsername(target.value)} />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input id='password' type="password" name="password" placeholder='password' value={password} onChange={({ target }) => setPassword(target.value)} />
          </div>

          <button type="submit">login</button>
        </form>
      </>
  );

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