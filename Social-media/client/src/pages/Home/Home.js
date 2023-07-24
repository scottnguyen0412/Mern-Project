import {
  Container,
  Grid,
  Grow,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Form from "../../components/Form/Form";
import Posts from "../../components/Posts/Posts";
import { getPosts, getPostBySearch } from "../../redux/actions/posts";
import { MuiChipsInput } from "mui-chips-input";
import Paginations from "../../components/Pagination/Paginations";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const[search, setSearch] = useState('');
  const[tags, setTags] = useState([]);

  // Share current Id between post and form
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const query = useQuery();
  const navigate = useNavigate();

  // page query
  const page = query.get("page") || 1;
  // search query
  const searchQuery = query.get("searchQuery");

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const SearchPost = () => {
    if(search.trim() || tags) {
      // search post
      // tags.join(',') convert array value to String value 
      dispatch(getPostBySearch({search, tags: tags.join(',')}))
      navigate(`/posts/search?searchQuery=${search || ''}&tags=${tags.join(',')}`);
    }else {
      navigate('/');
    }
  }

  const handleKeyPress = (e) => {
    if(e.keyCode === 12) {
      // search post
      SearchPost();
    }
  }

  const handleInputTags = (tag) => {
    // lấy tất cả giá trị previous tags and new tags
    setTags([...tags, tag])
  }

  const handleDelteInputTags = (tagtoDel) => {
    setTags(tags.filter((item) => item !== tagtoDel));
  }

  useEffect(() => {
    // send action
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className="mainContain"
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className="appBarSearch" position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                value={search}
                onKeyPress={handleKeyPress}
                onChange={handleSearchChange}
                fullWidth
              />
              <MuiChipsInput style={{margin: '10px 0'}}
                value={tags}
                onAddChip={handleInputTags}
                onDeleteChip={handleDelteInputTags}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={SearchPost} className="searchButton" variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper className="pagination" elevation={6}>
              <Paginations />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
