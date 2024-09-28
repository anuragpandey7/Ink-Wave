import { useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import authServices from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header,Footer } from "./components/index";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authServices
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          {/* todo outlet */}
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    "Loading"
  );
}

export default App;
