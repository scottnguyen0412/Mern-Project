import { Footer, Navbar } from "./components";
import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  About,
  Auth,
  Companies,
  CompanyProfile,
  FindJob,
  JobDetail,
  UploadJob,
  UserProfile,
} from "./pages";

function Layout() {
  // check user logged in or not
  const user = true;
  // lấy vị trí hiện tại của user trong ứng dụng
  const location = useLocation();

  // Nếu user = true thì trả về component <outlet/>.
  // Nếu là false đồng nghĩa với chưa đăng nhập thì gọi đến <Navigate/>
  // chuyển hướng người dùng từ vị trí hiện tại đến /user-auth
  // replace sẽ ngăn user quay lại trang trước bằng nút back của trình duyệt
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/user-auth" state={{ from: location }} replace />
  );
}
function App() {
  const user = {};
  return (
    <main>
      <Navbar />
      <Routes>
        {/* Các route dành cho user đã đăng nhập */}
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<Navigate to="/find-jobs" replace={true} />}
          />
          <Route path="/find-jobs" element={<FindJob />} />
          <Route path="/companies" element={<Companies />} />
          <Route
            path={
              user?.user?.accountType === "seeker"
                ? "/user-profile"
                : "/user-profile/:id"
            }
            element={<UserProfile />}
          />

          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/company-file/:id" element={<CompanyProfile />} />
          <Route path="/upload-job" element={<UploadJob />} />
          <Route path="/job-details/:id" element={<JobDetail />} />
        </Route>

        {/* Các Route dành cho user không cần đăng nhập */}
        <Route path="/about-us" element={<About />} />
        <Route path="/user-auth" element={<Auth />} />
      </Routes>
      {user && <Footer />}
    </main>
  );
}

export default App;
