import { Container } from "@mui/material";
import "./styles.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import PostDetails from "./pages/PostDetails/PostDetails";


function App() { 
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          {/* khi user truy cập '/' thì sẽ tự động chuyển hướng sang '/posts' */}
          <Route path='/' exact element={<Navigate to='/posts' replace={true}/>}/>
          <Route path='/posts' exact element={<Home/>}/>
          <Route path='/posts/search' element={<Home/>}/>
          <Route path='/posts/:id' element={<PostDetails/>}/>

          {/* Nếu user đã đăng nhập và cố gắng truy cập lại trang /auth thì sẽ tự động chuyển hướng
          sang /post */}
          <Route path='/auth' element={(!user) ? <Auth/> : <Navigate to='/posts'/>}/>
        </Routes> 
      </Container>
    </BrowserRouter>
  );
}

export default App;
