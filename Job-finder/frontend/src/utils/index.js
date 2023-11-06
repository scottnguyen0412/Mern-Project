import axios from "axios";

const API_URL = "http://localhost:5002/api-v1";

export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
});

export const apiRequest = async ({ url, token, data, method }) => {
  try {
    const result = await API(url, {
      method: method || "GET",
      data: data,
      // đính token vào header
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return result?.data;
  } catch (error) {
    console.error(error);
    const err = error.response.data;
    return {
      status: err.success,
      message: err.message,
    };
  }
};

export const handleFileUpload = async (uploadFile) => {
  const formData = new FormData();
  formData.append("file", uploadFile);
  // topJob tên của upload preset trên cloudinary
  formData.append("upload_preset", "topJob");
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/image/upload",
      formData
    );
  } catch (error) {}
};

// hàm cập nhật URL khi có các tham số truy vấn
export const updateURL = ({
  pageNum,
  query,
  cmpLoc,
  sort,
  location,
  jtype,
  exp,
  navigate,
}) => {
    const params = new URLSearchParams();
    if (pageNum && pageNum >1){
        params.set('page', pageNum);
    }

    if(query){
        params.set("search", query);
    }

    if(cmpLoc){
        params.set("location", cmpLoc)
    }

    if(sort){
        params.set("sort", sort)
    }

    if(jtype){
        params.set("jtype", jtype)
    }

    if(exp){
        params.set("exp", exp)
    }
    const newURL = `${location.pathname}?${params.toString()}`;
    navigate(newURL, {replace: true});

    return newURL;
};  
