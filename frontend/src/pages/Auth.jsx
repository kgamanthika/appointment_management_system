import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../services/api";

function Auth() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      navigate("/");
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl">{isLogin ? "Login" : "Signup"}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            className="border p-2 mb-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded w-full">{isLogin ? "Login" : "Signup"}</button>
      </form>
      <button className="mt-2 text-blue-500" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Create an account" : "Already have an account?"}
      </button>
    </div>
  );
}

export default Auth;
