import { useState, useEffect, type FormEvent } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { axiosInstance, useAuth } from "../../contexts/AuthProvider";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      login(data.token, data);
      navigate("/", { replace: true });
    } catch {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#111111] border border-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
        <p className="text-center text-gray-400">
          Sign in to continue to your library.
        </p>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-900 border-gray-700"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-900 border-gray-700"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-lg py-6"
          >
            Sign In
          </Button>
        </form>
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="font-semibold text-red-500 hover:underline"
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
