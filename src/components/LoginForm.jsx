import PropTypes from "prop-types"; 

const LoginForm = ({ handleSubmit, handleUsernameChange, handlePasswordChange, username, password }) => {
    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id='username' type="text" name='username' placeholder='username' value={username} onChange={handleUsernameChange} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input id='password' type="password" name="password" placeholder='password' value={password} onChange={handlePasswordChange} />
                </div>

                <button type="submit">login</button>
            </form>
        </div>
    )
};

LoginForm.propTypes = {
    handleSubmit: PropTypes.func,
    handleUsernameChange: PropTypes.func,
    handlePasswordChange: PropTypes.func,
    username: PropTypes.string,
    password: PropTypes.string
};

export default LoginForm;