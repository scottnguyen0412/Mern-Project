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
  ThumbUpAlt,
  DeleteOutline,
  MoreHoriz,
  ThumbUpAltOutlined,
  
} from "@mui/icons-material";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../redux/actions/posts";

const Post = ({ posts, setCurrentId }) => {
  // Có thể sử dụng cách này
  // const {posts} = props
  const user = JSON.parse(localStorage.getItem('profile'));

  const dispatch = useDispatch();
  // const [likeCount, setLikeCount] = useState(posts.likeCount);
  // console.log(user?.result?._id === posts?.creator);

  const handleCLickLike = async () => {
    await dispatch(likePost(posts._id));
  };

  // dísplay and count like of user
  const Likes = () => {
    if (posts?.likes?.length > 0) {
      return posts?.likes.find(
        (like) => like === (user?.result?.sub || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAlt fontSize="small" />
          {posts.likes.length > 2
            ? `You and ${posts.likes.length - 1} others`
            : `${posts.likes.length} like${posts.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />&nbsp;{posts.likes.length}&nbsp;
          {posts.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" /> &nbsp;Like
      </>
    );
  };
  return (
    <Card className="card" raised elevation={6}>
      <CardMedia
        className="media"
        image={posts.selectedFile}
        title={posts.title}
      />
      <div className="overlay">
        <Typography variant="h6">{posts.name}</Typography>
        <Typography variant="body2">
          {moment(posts.created_at).fromNow()}
        </Typography>
      </div>
      {/* Chỉ có user tạo post mới có quyền edit post của chính họ */}
      {/* kiểm tra user?.result && posts?.creator để đảm bảo rằng 
          cả hai giá trị này đều tồn tại trước khi thực hiện so sánh. 
      */}
      {user?.result && posts?.creator && (user?.result._id === posts.creator || user?.result.sub === posts.creator) && (
        <div className="overlay2">
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => {
              setCurrentId(posts._id);
            }}
          >
            <MoreHoriz fontSize="default" />
          </Button>
        </div>
      )}
      <div className="details">
        <Typography variant="body2" color="textSecondary">
          {posts.tags.map((tag) => {
            return `#${tag} `;
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
        <Button size="small" color="primary" onClick={handleCLickLike} disabled={!user?.result}>
          <Likes/>
        </Button>
        {/* Check user nào tạo ra post thì chỉ có user đó được xoá post */}
        {user?.result?.sub === posts?.creator || user?.result?._id === posts?.creator && 
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(posts._id))}
          >
            <DeleteOutline fontSize="small" />
            Delete
          </Button>
        }
      </CardActions>
    </Card>
  );
};

export default Post;
