import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 

import { setGameId } from '../../store/slices/gameSlice';

const Container = styled.div`
  width: 320px;
  margin: 0 auto;
  @media (min-width: 320px) {
    width: auto;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  margin-bottom: auto;
  /* max-width: 350px; */
`;

const ListStyles = styled.ul`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
  margin: 0;
  padding: 0;
  
  list-style: none;
  @media (min-width: 660px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 990px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 1440px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const Item = styled.li`
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 3px lightgrey;
  &:hover {
    box-shadow: 0 0 4px grey;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 300px;
  @media (min-width: 1440px) {
    min-height: 320px;
  }
`;

const ItemTitle = styled.h3`
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
  font-size: 24px;
  color: black;
`;

const Text = styled.p`
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
  color: black;
`;

const Span = styled.span`
  font-weight: bold;
`;

const GameList = () => {
  const dispatch = useDispatch();
  const { games } = useSelector((state) => state.games);

  const handleGameClick = (id) => (evt) => {
    dispatch(setGameId({ gameId: id }));
  };

  return (
    <Container>
      <ListStyles>
        {games.map(({ id, background_image, rating, name, released, slug }) => (
          <Item key={`${id}-${name}`}>
            <Link to='/game' onClick={handleGameClick(id)} style={{ textDecoration: 'none' }}>
              <ItemWrapper>
                <ItemTitle>{name}</ItemTitle>
                <ImageWrapper>
                  <img src={background_image} alt={name} />
                </ImageWrapper>
                <Text>Date: <Span>{released}</Span></Text>
                <Text>Rating: <Span>{rating}</Span></Text>
              </ItemWrapper>
            </Link>
          </Item>
        ))}
      </ListStyles>
    </Container>
  )
};

export default GameList;