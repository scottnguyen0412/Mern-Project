import React from 'react'
import Post from './Post/Post'
import './styles.css';
import {Grid, CircularProgress} from '@mui/material'

import { useSelector } from 'react-redux';

const Posts = ({setCurrentId}) => {
  const posts = useSelector((state) => state.posts)
  console.log(posts);
  return (
    !posts.length ? <CircularProgress/> : (
      <Grid className='mainContainer' container alignItems="stretch" spacing={3}>
        {
          posts.map((items) => {
              return (
                <Grid key={items._id} item xs={12} sm={12} md={6} lg={3}>
                  <Post posts={items} setCurrentId={setCurrentId}/>
                </Grid>
              )
          })
        }
      </Grid>
    )
  )
}

export default Posts
