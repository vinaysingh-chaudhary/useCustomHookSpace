"use client"
import React, { useEffect, useState } from "react";
import { Logo, HomeNav, TwitterNav, SearchButton, Search, Login, Logout, Profile } from './navIndex'
import { SearchContextProvider } from "@/contexts/SearchContext/SearchContext";


const Navbar = () => {

  const [isAuthenticated, setIsAuthenticated] = useState();
  const [userInfo, setUserInfo] = useState(); 

  useEffect(() => {
    let isAuth : any= localStorage.getItem('isAuthenticated');
    isAuth = isAuth === "true"; 
    let userInfo : any = localStorage.getItem("userInfo"); 
    if(userInfo)
        setUserInfo(JSON.parse(userInfo));
    
    setIsAuthenticated(isAuth);
  },[]); 

  
  return (
    <div className="w-full lg:w-[1100px] xl:w-[1400px] px-2 flex justify-between items-center bg-blur-dark text-white">
      <div className="w-1/3 flex justify-start">
          <Logo/>
      </div>

      <div className="w-1/3 flex justify-center items-center gap-4 text-inactive-gray hover:text-white">
          <HomeNav/>
          <TwitterNav />
      </div>

    <SearchContextProvider>
         <div className="w-1/3 flex justify-end items-cente gap-2">
             <SearchButton/>
             {
                 isAuthenticated? <Profile userInfo={userInfo} /> :  <Login/> 
             }      
         </div>

         <Search />
 
      </SearchContextProvider>
    </div>
  );
};

export default Navbar;
