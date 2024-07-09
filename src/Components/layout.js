
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMe } from "./API/users";
import AppStateContext from "./utils/appState";
import Sidebar from "./Home/Sidebar";
export default function Layout({ children }) {

  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  async function fetchProfile(){
    console.log("fetching profile")
    const data = await getMe()
    console.log(data);
    if (data) {
      setUser(data?.user);
    }
  }
  useEffect( ()=> {
    fetchProfile();

  }, [])

  useEffect( ()=>{
    if(!user ){
      navigate('/signin');
    }
    if(user && location.pathname === '/signin'){
      navigate('/');
    }

  }, [user,location, navigate])


  const value = {
    user,
    setUser,
  };

  return (
    <div className=" justify-center">
      <AppStateContext.Provider value={value}>
        <Sidebar />
        <div className="ml-32  pt-12 md:pt-20">{children}</div>
      </AppStateContext.Provider>
    </div>
  );
}
