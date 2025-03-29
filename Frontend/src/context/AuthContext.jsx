/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, loginUser, logoutUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const token = Cookies.get("token");
    // console.log("token", token);
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const { isError } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: !!Cookies.get("token") && isAuthenticated,
    onSuccess: () => {
      setIsAuthenticated(true);
      setIsLoading(false);
    },
    onError: () => {
      setIsAuthenticated(false);
      Cookies.remove("token");
      setIsLoading(false);
      navigate("/admin/login");
    },
    retry: false,
    staleTime: Infinity,
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      setIsAuthenticated(true);
      queryClient.invalidateQueries(["currentUser"]);
      navigate("/admin/dashboard");
    },
    onError: () => {
      setIsAuthenticated(false);
      Cookies.remove("token");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setIsAuthenticated(false);
      Cookies.remove("token");
      queryClient.removeQueries(["currentUser"]);
      navigate("/admin/login");
    },
  });

  const login = (credentials) => loginMutation.mutate(credentials);
  const logout = () => logoutMutation.mutate();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
