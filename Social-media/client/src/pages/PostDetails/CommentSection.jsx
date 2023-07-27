import { useState, useRef, useEffect } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { commentPost } from "../../redux/actions/posts";
const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const commentRef = useRef();

  const handleSendComment = async () => {
    const finalComment = `${user.result.name}: ${comment}`;

    const newComment = await dispatch(commentPost(finalComment, post._id));
    // clear input comment
    setComment("");
    setComments(newComment);
    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="commentsOuterContainer">
        <div className="commentsInnerContainer">
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.length > 0 &&
            comments.map((comment, idx) => {
              return (
                <Typography key={idx} gutterBottom variant="subtitle1">
                  <strong>{comment.split(": ")[0]}</strong>
                  {comment.split(":")[1]}
                </Typography>
              );
            })}
          <div ref={commentRef} />
          {/* user không login thì không hiển thị phần comment */}
          {user?.result?.name && (
            <div>
              <Typography gutterBottom variant="h6">
                Write a Comment
              </Typography>
              <TextField
                fullWidth
                rows={4}
                variant="outlined"
                label="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                multiline
              />
              <Button
                style={{ marginTop: "10px" }}
                fullWidth
                disabled={!comment}
                variant="contained"
                color="primary"
                onClick={handleSendComment}
              >
                Send
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
