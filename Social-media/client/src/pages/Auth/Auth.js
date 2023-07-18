import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@mui/material";
import "./style.css";
import { LockOutlined } from "@mui/icons-material";
import Input from "../../components/Input/Input";
import { Link } from "react-router-dom";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);

  const[isSignUp, setIsSignUp] = useState(false)
  
  const handleSubmit = () => {};

  const handleChange = () => {};

  // Handle Show/hide password
  const handleShowPassword = () => {
    // nếu prevShowPass = true thì !prevShowPass = false và ngược lại
    // Được sử dụng để show/hide password
    setShowPassword((prevShowPass) => !prevShowPass);
  };

  const switchMode = () => {
    setIsSignUp((prevSignUp) => !prevSignUp)
    // Set false để đảm bảo mật khẩu sẽ được ẩn khi chuyển đổi
    // giữa 2 trang đăng kí và đăng nhập 
    setShowPassword(false)
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className="paperAuth" elevation={3}>
        <Avatar className="avatar">
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Nếu isSignUp là true thì sẽ hiển thị 2 input bên dưới. 
            Và ngược lại sẽ không được hiển thị */}
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            {/* Nếu showPassword = true đồng nghĩa type = text mặt khác type = password */}
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange}/>}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className="submit">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container justify="flex-end" > 
              <Grid item>
                  <Button onClick={switchMode}>
                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                  </Button>
              </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
