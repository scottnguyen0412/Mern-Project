import {Container, AppBar, Typography, Grow, Grid} from '@mui/material';
import Form from './components/Form/Form';
import memories from './components/imgs/memories.png';
import Posts from './components/Posts/Posts';
import './styles.css'
import {useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {getPosts} from './redux/actions/posts';

function App() {
  // Share current Id between post and form
  const[currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
      // send action
      dispatch(getPosts());
  },[dispatch, currentId]);
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
                <Posts setCurrentId={setCurrentId}/>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
  );
}

export default App;
