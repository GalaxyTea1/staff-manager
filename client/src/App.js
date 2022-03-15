import { createBrowserHistory } from "history";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./components/LoginForm/Login";
import Register from "./components/RegisterForm/Register";
import Home from "./pages/Home/Home";
export const history = createBrowserHistory();
toast.configure();

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/user/is-verify", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });
      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <div className='App'>
      <Routes history={history}>
        <Route path='' element={<Login />} />
        <Route
          path='/login'
          element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to='/home' />}
        ></Route>
        <Route
          path='/register'
          element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to='/home' />}
        />
        <Route
          path='/home'
          element={isAuthenticated ? <Home setAuth={setAuth} /> : <Navigate to='/login' />}
        />
      </Routes>
    </div>
  );
}

export default App;
