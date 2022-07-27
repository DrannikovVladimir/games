import * as React from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'; 

import { setPlatforms } from './store/slices/gameSlice';
import API, { token } from './service';

import MainPage from './pages/MainPage/MainPage';
import GamePage from './pages/GamePage/GamePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const App = () => {
  const dispatch = useDispatch(); 

  React.useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const { data } = await API.get('/platforms/lists/parents', { params: { ...token } });
        // console.log(data);
        dispatch(setPlatforms({ platforms: data.results }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlatforms();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/game' element={<GamePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
