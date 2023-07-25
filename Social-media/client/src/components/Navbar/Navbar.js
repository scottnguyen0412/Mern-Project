import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import "./style.css";
import memories from "../imgs/memories.png";
import logo from '../imgs/logo.png'
import { Link, useNavigate, useLocation } from "react-router-dom";
import {useDispatch} from 'react-redux';
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const navigate = useNavigate('/');
  // current location object. Cập nhật tất cả thay đổi của Url ngay lập tức
  const location = useLocation();

  const dispatch = useDispatch();
  // console.log(user);

  const handleLogout = () => {
    dispatch({type: 'LOGOUT', });
    navigate('/');
    setUser(null)
  }

  useEffect(() => {
    // get token from localstorage
    const token = user?.token;

    if(token) {
      const decodedToken = jwt_decode(token);
      // // check token is expired or not
      // // *1000 chuyển đổi từ số giây sang mili giây
      if(decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
      console.log(decodedToken.exp *1000);
      console.log(new Date().getTime());
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className="appBar" position="static" color="inherit">
      <Link to='/' className="brandContainer">
        <img src={logo} alt="icon" className="imageLogo" height="70px"/>
        <img className="image" src={memories} alt="memories" height="40px" />
      </Link>
      <Toolbar className="toolbar">
        {user ? (
          <div className="profile">
            <Avatar
              className="purple"
              alt={user.result.name}
              src={user.result.image}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className="userName" variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className="logout"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
