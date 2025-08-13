// Login.jsx
export const Login = ({
    handleLogin,
    username,
    setUsername,
    password,
    setPassword,
    onCancel
  }) => {
    return (
      <div>
        <h2>Login</h2>
        <form className="flex flex-col" onSubmit={handleLogin}>
          <input
            className="block"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="block"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-2">
            <button className="block" type="submit">Login</button>
            <button
              type="button"
              onClick={onCancel}
              style={{ backgroundColor: "lightgray" }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  };
  