import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { axiosInstance } from "./../lib/axios";

interface license {
  Key: string;
  issueDate: string;
  fileUrl: string;
}
interface User {
  _id: string;
  name?: string;
  fullName?: string;
  email: string;
  role: "user" | "admin";
  plan: "pro" | "free";
  license: license;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // console.log(user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        try {
          const { data } = await axiosInstance.get("/users/profile");
          setUser(data.data);
        } catch {
          localStorage.removeItem("authToken");
          delete axiosInstance.defaults.headers.common["Authorization"];
        }
      }
      setIsLoading(false);
    };
    verifyAuth();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem("authToken", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    delete axiosInstance.defaults.headers.common["Authorization"];
    setUser(null);
  };
  const updateUser = (userData: User) => {
    setUser(userData);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
