import React, {useEffect} from 'react'
import {CircularProgress, Divider, Paper, Typography} from '@mui/material'
import moment from 'moment';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPost } from '../../redux/actions/posts';
const PostDetails = () => {
  const {post, posts, isLoading} = useSelector((state) => state.posts);
  console.log(post);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  },[id])

  

  if(isLoading || !post) {
    return (<Paper elevation={6} className="loadingPaper">
      <CircularProgress size="7em"/>
    </Paper>)
  }

  return (
      <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
        <div className="cards" key={post._id}>
        <div className="sections">
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags && post.tags.map((tag) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
          ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">
            Created by:
            <Link to={`/creators/${post.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${post.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">{moment(post.created_at).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          {/* <CommentSection post={post} /> */}
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className="imageSection">
          <img className="media-detail" src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
        </div>
    </Paper>
  )
}

export default PostDetails
