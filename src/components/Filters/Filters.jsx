import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  position: relative;
`;

const List = styled.ul`
  display: ${props => props.show ? 'flex' : 'none'};
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
  @media (min-width: 530px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media (min-width: 850px) {
    width: 740px;
  }
  @media (min-width: 950px) {
    display: flex;
  }
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  @media (min-width: 530px) {
    margin-right: 20px;
    margin-bottom: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  @media (min-width: 950px) {
    margin-right: 10px;
    margin-bottom: 5px;
  }
`;

const Input = styled.input`
  width: 20px;
  height: 20px;
  margin: 0;
  margin-right: 7px;
`;

const ButtonShowFilters = styled.button`
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
  border: none;
  border-bottom: 1px dashed grey;
  background-color: transparent;
  cursor: pointer;
  @media (min-width: 950px) {
    display: none;
  }
`;

const Filters = ({
    filteredPlatforms,
    setFilteredPlatforms,
    setUpdateList,
    setIsLoading
  }) => {
  const [showFilters, setShowFilters] = React.useState(false)
  const { platforms } = useSelector((state) => state.games);

  const handlePlatformChange = (id) => () => {
    const uniqPlatform = filteredPlatforms.find((item) => {
      return  item === id;
    });
    if (uniqPlatform) {
      setFilteredPlatforms([...filteredPlatforms.filter((item) => item !== id)]);
      setUpdateList(false);
      setIsLoading(true);
    } else {
      setFilteredPlatforms([...filteredPlatforms, id]);
      setUpdateList(false);
      setIsLoading(true);
    }
  };

  const handleButtonFiltersClick = () => {
    setShowFilters(!showFilters);
  }

  return (
    <FiltersContainer>
      <ButtonShowFilters type="button" onClick={handleButtonFiltersClick}>
        {showFilters ? 'Скрыть фильтры' : 'Показать фильтры' }
      </ButtonShowFilters>
      <List show={showFilters}>
        {platforms.map(({ id, name, slug }) => (
          <Item key={`${id}-${name}`}>
            <Input type="checkbox" id={name} name={name} onChange={handlePlatformChange(id)} />
            <label htmlFor={name}>{name}</label>
          </Item>
        ))}
      </List>
    </FiltersContainer>
  );
};

export default Filters;