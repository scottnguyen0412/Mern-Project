import {Container, AppBar, Typography, Grow, Grid} from '@mui/material';
import Form from './components/Form/Form';
import memories from './components/imgs/memories.png';
import Posts from './components/Posts/Posts';
import './styles.css'
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {getPosts} from './redux/actions/posts';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
      // send action
      dispatch(getPosts());
  },[dispatch]);
  return (  
      <Container maxWidth="lg">
        <AppBar className='appBar' position="static" color="inherit">
          <Typography className='heading' variant="h2" justify='right'>
            Memories
          </Typography>
          <img className='image' src={memories} alt="memories" height="60"/>
        </AppBar>
        <Grow in>
          <Container>
            <Grid container justify="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts/>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form/>
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
  );
}

export default App;
