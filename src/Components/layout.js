
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMe } from "./API/users";
import AppStateContext from "./utils/appState";
// import Sidebar from "./Home/Sidebar";
import Header from "./Home/Header";
import { CgSpinner } from "react-icons/cg";
import { getAuthToken } from "./API/users";
export default function Layout({ children }) {
  const [loading, setLoading] = useState(true);
  const user_token = getAuthToken()
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  async function fetchProfile() {
    setLoading(true);
    console.log("fetching profile")
    const data = await getMe()
    console.log(data);
    if (data) {
      setUser(data?.user);
    }
    if (!data) {
      navigate('/signin');
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchProfile();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!user_token) {
      navigate('/signin');
    }
    if (user && location.pathname === '/signin') {
      navigate('/');
    }

  }, [user_token, user, location, navigate])


  const value = {
    user,
    setUser,
  };

  return (
    <div className=" justify-center">
      <AppStateContext.Provider value={value}>
        {loading ?
          <div className="flex justify-center items-center h-screen w-full">
            <div className=" animate-spin  text-blue-500">
              <CgSpinner className="w-36 h-36" />
            </div>
          </div> :
          <>
            <Header />
            <div className="pt-2 pl-0 md:pl-64 md:pt-6">{children}</div>
          </>
        }
      </AppStateContext.Provider>
    </div >
  );
}
