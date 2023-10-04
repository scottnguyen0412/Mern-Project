import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Office } from "../../assets";
import { SignUp } from "../../components";

const Auth = () => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // location?.state?.from?.pathname: trước đó người dùng đã đi từ một vị trí khác
  // và được chuyển hướng đến vị trí hiện tại
  // Néu không thì sẽ mặc định là "/"
  let from = location?.state?.from?.pathname || "/";
  useEffect(() => {
    if (user.token) {
      // Nếu đã đăng nhập thì redirect đến route trước đó hoặc route mặc định "/"
      navigate(from, { replace: true });
    }
  }, [user.token, navigate, from]);

  return (
    <div className="w-full">
      <img src={Office} alt="Office" className="object-contain" />
      <SignUp open={open} setOpen={setOpen} />
    </div>
  );
};

export default Auth;
