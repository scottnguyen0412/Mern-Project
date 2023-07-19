import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import "./style.css";
import memories from "../imgs/memories.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {useDispatch} from 'react-redux';

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
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className="appBar" position="static" color="inherit">
      <div className="brandContainer">
        <Typography
          component={Link}
          to="/"
          className="heading"
          variant="h2"
          justify="right"
        >
          Memories
        </Typography>
        <img className="image" src={memories} alt="memories" height="60" />
      </div>
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
