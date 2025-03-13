import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar() {

  const navigate = useNavigate();

  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);

    const sendverficationOTP = async () =>
    {
      try {
        axios.defaults.withCredentials = true;

        const {data}= await axios.post(backendUrl + '/api/auth/send-verify-otp')

        if(data.success){
          navigate('/email-verify')
          toast.success(data.message)
        }else{
          toast.error(data.message)
        }

      } catch (error) {
        toast.error(error.message);
      }
    }

    const logout = async () =>{
      //console.log(backendUrl);
      try {
        axios.defaults.withCredentials = true;
        const {data} = await axios.post(backendUrl + '/api/auth/logout')
        data.success && setIsLoggedin(false);
        data.success && setUserData(false);
        navigate('/')
      } catch (error) {
          toast.error(error.message);
        console.log(error);
      }

    }

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="Logo" className="w-28 sm:w-32" />
      {userData ? (
        <div className="w-8 h-8 flex justify-center items-center bg-blue-700 rounded-full text-white relative group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black pt-10 ">

            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified &&   <li onClick={sendverficationOTP} className="py-1 px-2 hover:bg-gray-200 cursor-pointer">VerifyEmail</li>}
             
              <li onClick={logout} className="py-1 px-2 pr-10  hover:bg-gray-200 cursor-pointer">Logout</li>
            </ul>

          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 bg-blue-400 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-all"
        >
          {" "}
          Login <img src={assets.arrow_icon} alt="login icon" />
        </button>
      )}
    </div>
  );
}

export default Navbar;
