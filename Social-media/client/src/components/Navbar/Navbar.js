import React from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import "./style.css";
import memories from "../imgs/memories.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = null;

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
            <Button variant="contained" className="logout" color="secondary">
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
