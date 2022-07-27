import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import styled from 'styled-components';

import API, { token } from '../../service';
import { setGame, setScreenshots } from '../../store/slices/gameSlice';
import Slider from '../../components/Slider/Slider';
import Error from '../../components/Error/Error';
import Preloader from '../../components/Preloader/Preloader';

const Container = styled.div`
  width: 320px;
  margin: 0 auto;
  padding: 20px 20px 60px;
  @media (min-width: 320px) {
    width: auto;
  };
  @media (min-width: 1300px) {
    width: 1300px;
    padding-left: 60px;
    padding-right: 60px;
  }
`;

const ContentWrapper = styled.div`
  margin-bottom: 40px;
  @media (min-width: 900px) {
    display: flex;
    /* flex-direction: ; */
  }
`;

const DescriptionWrapper = styled.div`
  @media (min-width: 900px) {
    margin-left: 40px;

  }
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 20px;
  padding: 0;
  font-size: 36px;
`;

const TitleField = styled.p`
  margin: 0;
  margin-bottom: 10px;
  margin-right: 20px;
  padding: 0;
`;

const Span = styled.span`
  font-size: 18px;
  line-height: 28px;
`;

const ImageWrapper = styled.div`
  margin-bottom: 20px;
  /* width: 600px; */
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 450px) {
    flex-direction: row;
  }
`;

const LinkWebsite = styled.a`
  padding-top: 5px;
  text-decoration: none;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const GamePage = () => {
  const dispatch = useDispatch();
  const { gameId, game } = useSelector((state) => state.games);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const fetchGame = async () => {
      try {
        const { data } = await API.get(`/games/${gameId}`, { params: { ...token }});
        dispatch(setGame({ game: data }));
        setIsLoading(true);
        setError(false)
      } catch (error) {
        console.log(error);
        setError(true)
      }
    };

    fetchGame();
  }, [dispatch]);

  React.useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        const { data } = await API.get(`/games/${gameId}/screenshots`, { params: { ...token }});
        dispatch(setScreenshots({ screenshots: data.results }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchScreenshots();
  }, [dispatch]);

  return (
    <>
      {!isLoading
        ? < Preloader />
        : (
          <Container>
            <HeaderWrapper>
              <Title>{game?.name}</Title>
              <Link to='/'>Back</Link>
            </HeaderWrapper>
            <ContentWrapper>
              <ImageWrapper>
                <img src={game?.background_image} />
              </ImageWrapper>
              <DescriptionWrapper>
                <InfoWrapper>
                  <TitleField>Released Date: <Span>{game?.released}</Span></TitleField>
                  <TitleField>Rating: <Span>{game?.rating}</Span></TitleField>
                  <LinkWebsite href={game?.website}>website</LinkWebsite>
                </InfoWrapper>
                {parse(game?.description)}
              </DescriptionWrapper>
            </ContentWrapper>
            <Slider />
          </Container>
          )
        }
        {error && <Error />}
    </>
  );
};

export default GamePage;