import React, { useState } from "react";
import "./style.css";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import {useDispatch} from 'react-redux'
import { addPosts } from "../../redux/actions/posts";
const Form = () => {
  // create in
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const dispatch = useDispatch();

  // Handle change input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      // ...postData được sử dụng để sao chép toàn bộ thuộc tính của state postData hiện tại
      // vào một đối tượng mới.
      ...postData,
      [name]: value,
    });
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPosts(postData));
  };

  const handleClear = () => {

  }
  return (
    <Paper className="paper">
      <form
        autoComplete="off"
        noValidate
        className="root form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a Memory</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={handleChange}
        />
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
          type="submit"
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
