import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService';

const App = () => {
  const [blogs, setBlogs] = useState([]);
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

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Wrong Credentials');
    }
    
  };

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

  return (
    <div>
      <h2>blogs</h2>
      
      { user === null ? loginForm() : 
        <div>
          <p>{user.name} logged-in</p>
          <button type="submit">logout</button>
        </div> 
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App