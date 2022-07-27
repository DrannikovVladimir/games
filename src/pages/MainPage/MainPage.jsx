import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useDebounce } from '@react-hook/debounce';
import styled from 'styled-components';

import { addGames, updateGames } from '../../store/slices/gameSlice';
import API, { getParams, token } from '../../service';

import SortItems from '../../components/SortItems/SortItems';
import Search from '../../components/Search/Search';
import GameList from '../../components/GameList/GameList';
import Filters from '../../components/Filters/Filters';
import Preloader from '../../components/Preloader/Preloader';
import Error from '../../components/Error/Error';

const Container = styled.div`
  width: 320px;
  margin: 0 auto;
  padding: 0 20px;
  @media (min-width: 320px) {
    width: auto;
  }
`;

const Title = styled.h2`
  margin: 0;
  padding: 0;
  margin-bottom: 20px;
  font-size: 48px;
`

const Wrapper = styled.div`
  @media (min-width: 950px) {
    display: flex;
  }
`;

const MainPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [updateList, setUpdateList] = React.useState(false);
  const [sortByReleased, setSortByReleased] = React.useState(null);
  const [sortByRating, setSortByRating] = React.useState(null);
  const [filteredPlatforms, setFilteredPlatforms] = React.useState([]);
  const [searchValue, setSearchValue] = useDebounce(null, 500);
  const [error, setError] = React.useState(false);
  
  const params = getParams(token, page, sortByReleased, sortByRating, filteredPlatforms, searchValue);

  React.useEffect(() => {
    const updateGameList = async () => {
      if (updateList) {
        return;
      }
      if (!isLoading) {
        return;
      }
      try {
        const { data } = await API.get(`/games`, { params });
        dispatch(updateGames({ games: data.results }));
        setIsLoading(false);
        setError(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(true);
      }
    }

    updateGameList();
  }, [dispatch, isLoading, updateList]);

  React.useEffect(() => {
    const addGameList = async () => {
      if (!updateList) {
        return;
      }
      if (!isLoading) {
        return;
      }
      try {
        const { data } = await API.get(`/games`, { params });
        dispatch(addGames({ games: data.results }));
        setIsLoading(false);
        setError(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(true);
      }
    }

    addGameList();
  }, [dispatch, isLoading]);

  React.useEffect(() => {
    const handleScroll = () => {
      const height = document.body.offsetHeight;      
      const screenHeight = window.innerHeight;      
      const scrolled = window.scrollY;      
      const partToEnd = height - screenHeight / 4;      
      const position = scrolled + screenHeight;

      if ((position >= partToEnd) && !isLoading) {
        setPage(page + 1);
        setIsLoading(true);
        setUpdateList(true);
      }
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return (() => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    });

  }, [isLoading]);

  return (
    <Container>
      <Title>Games</Title>
      <Search
        search={searchValue}
        setSearch={setSearchValue}
        setUpdateList={setUpdateList}
        setIsLoading={setIsLoading}
      />
      <Wrapper>
        <SortItems
          setPage={setPage}
          setSortByRating={setSortByRating}
          setSortByReleased={setSortByReleased}
          setFilteredPlatforms={setFilteredPlatforms}
          setUpdateList={setUpdateList}
          setIsLoading={setIsLoading}
        />
        <Filters
          filteredPlatforms={filteredPlatforms}
          setFilteredPlatforms={setFilteredPlatforms}
          setUpdateList={setUpdateList}
          setIsLoading={setIsLoading}
        />
      </Wrapper>
      {isLoading && <Preloader />}
      {error && <Error />}
      <GameList />
    </Container>
  );
};

export default MainPage;