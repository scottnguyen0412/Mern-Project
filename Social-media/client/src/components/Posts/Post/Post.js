import React, { useState } from "react";
import "./style.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import {
  ThumbUpOffAlt,
  DeleteOutline,
  MoreHoriz,
} from "@mui/icons-material";
import moment from 'moment'
import {useDispatch} from 'react-redux';
import { deletePost, likePost } from "../../../redux/actions/posts";

const Post = ({posts, setCurrentId}) => {

  // Có thể sử dụng cách này
  // const {posts} = props

  const dispatch = useDispatch();
  const [likeCount, setLikeCount] = useState(posts.likeCount);

  const handleCLickLike = async () => {
    await dispatch(likePost(posts._id));
    setLikeCount(likeCount + 1);
  };
  return (
    <Card className="card">
      <CardMedia className="media" 
        image={posts.selectedFile} 
        title={posts.title} />
        <div className="overlay">
          <Typography variant="h6">
            {posts.creator}
          </Typography>
          <Typography variant="body2">
            {moment(posts.created_at).fromNow()}
          </Typography>
        </div>
        <div className="overlay2">
          <Button style={{color:'white'}} size='small' onClick={() => {setCurrentId(posts._id)}}>
            <MoreHoriz fontSize="default"/>
          </Button>
        </div>
        <div className="details">
          <Typography variant="body2" color="textSecondary">
            {posts.tags.map((tag) => {
              return `#${tag} `
            })}
          </Typography>
        </div>
          <Typography className="title" variant="h5" gutterBottom>
              {posts.title}
          </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
              {posts.message}
          </Typography>
        </CardContent>
        <CardActions className="cardActions">
            <Button size="small" color="primary" onClick={handleCLickLike}>
                <ThumbUpOffAlt fontSize="small"/>
                Like &nbsp;
                {likeCount}
            </Button>
            <Button size="small" color="primary" onClick={() => dispatch(deletePost(posts._id))}>
                <DeleteOutline fontSize="small"/>
                Delete
            </Button>
        </CardActions>
    </Card>
  );
};

export default Post;
