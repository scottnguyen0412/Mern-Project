import React, { useState, useEffect } from "react";
import "./style.css";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { addPosts, updatePosts } from "../../redux/actions/posts";
import { useNavigate } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  // create in
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((post) => post._id === currentId) : null
  );
  console.log(post);

  const user = JSON.parse(localStorage.getItem('profile'));

  // tự động render component giá trị mới
  useEffect(() => {
    if(post) {
      setPostData(post)
    }
  },[post])


  // Handle change input
  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === 'tags')
    {
      console.log('tagss');
      setPostData({
        ...postData,
        // tách chuỗi value từ string thành một mảng các giá trị riêng biệt,
        // sử dụng dấu ',' để làm dấu phân tách
        [name]: value.split(','),
      });
    } else {
      setPostData({
        // ...postData được sử dụng để sao chép toàn bộ thuộc tính của state postData hiện tại
        // vào một đối tượng mới.
        ...postData,
        [name]: value,
      });
    }
  };
  const navigate = useNavigate();

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId === 0) {
      // sao chép các giá trị sang object mới và ghi đè lên chúng
      // sau khi tạo post xong chuyển đến trang detail
      dispatch(addPosts({...postData, name: user?.result?.name}, navigate));
    } else {
      dispatch(updatePosts(currentId, {...postData, name: user?.result?.name}));
    }

    handleClear();
  };

  if(!user?.result?.name) {
    return (
      <Paper className="paper">
        <Typography variant="h6" align="center" >
          Please Sign In before create your own memories and like other's memories
        </Typography>
      </Paper>
    )
  }

  const handleClear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className="paper" elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className="root form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{currentId ? 'Edit':'Creating'} a Memory</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleChange}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={handleChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={handleChange}
        />
        <div className="fileInput">
          <FileBase
            name="selectedFile"
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className="buttonSubmit"
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={handleClear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
