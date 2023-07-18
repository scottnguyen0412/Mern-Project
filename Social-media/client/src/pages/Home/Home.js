import { Container, Grid, Grow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Form from "../../components/Form/Form";
import Posts from "../../components/Posts/Posts";
import {getPosts} from '../../redux/actions/posts';

const Home = () => {
  // Share current Id between post and form
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
      // send action
      dispatch(getPosts());
  },[dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          className="mainContain"
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
