import * as React from 'react';
import styled from 'styled-components';

const SortWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  @media (min-width: 950px) {
    margin-right: 20px;
  }
`;

const List = styled.ul`
  position: absolute;
  top: 40px;
  display: ${props => props.list === 'opened' ? 'block' : 'none'};
  width: 280px;
  margin: 0;
  padding: 0;
  padding-bottom: 20px;
  padding-top: 10px;
  border: 1px solid gray;
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #fff;
  list-style: none;
  z-index: 10;
  @media (min-width: 950px) {
    width: 180px;
  }
`;

const Item = styled.li`
  padding: 5px 0;
`;

const ButtonItem = styled.button`
  padding: 5px 20px;
  border: none;
  font-size: 16px;
  line-height: 24px;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const ButtonSelect = styled.button`
  width: 280px;
  padding: 10px 20px;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 16px;
  line-height: 24px;
  text-align: left;
  background-color: transparent;
  cursor: pointer;
  @media (min-width: 950px) {
    width: 180px;
  }
`;

const SortItems = ({
    setPage,
    setSortByRating,
    setSortByReleased,
    setFilteredPlatforms,
    setUpdateList,
    setIsLoading
  }) => {
  const [orderListShow, setOrderListShow] = React.useState('closed');
  const [orderByName, setOrderByName] = React.useState('Order by');
  const [orderTypeReleased, setOrderTypeReleased] = React.useState('asc');
  const [orderTypeRating, setOrderTypeRating] = React.useState('asc');

  const handleButtonSortReleaseDate = ({ type, name }) => () => {
    setOrderByName(name);
    setOrderListShow('closed');
    setOrderTypeReleased(orderTypeReleased === 'asc' ? 'desc' : 'asc');
    switch (type) {
      case 'asc': {
        setPage(1);
        setSortByRating(null);
        setSortByReleased('released');
        setUpdateList(false);
        setIsLoading(true);
        break;
      }
      case 'desc': {
        setPage(1);
        setSortByRating(null);
        setSortByReleased('-released');
        setUpdateList(false);
        setIsLoading(true);
        break;
      }
      default:
        throw new Error(`${type} is unknown type!`)
    }
  };

  const handleButtonSortRating = ({ type, name }) => () => {
    setOrderByName(name);
    setOrderListShow('closed');
    setOrderTypeRating(orderTypeRating === 'asc' ? 'desc' : 'asc');
    switch (type) {
      case 'asc': {
        setPage(1);
        setSortByReleased(null);
        setSortByRating('rating');
        setUpdateList(false);
        setIsLoading(true);
        break;
      }
      case 'desc': {
        setPage(1);
        setSortByReleased(null);
        setSortByRating('-rating');
        setUpdateList(false);
        setIsLoading(true);
        break;
      }
      default:
        throw new Error(`${type} is unknow type!`)
    }
  };

  const handleButtonSortDefault = () => {
    setOrderByName('Order by');
    setOrderListShow('closed');
    setPage(1);
    setFilteredPlatforms([]);
    setSortByRating(null);
    setSortByReleased(null);
    setUpdateList(false);
    setIsLoading(true);
  };

  const handleButtonOrderByClick = () => {
    setOrderListShow(orderListShow === 'opened' ? 'closed' : 'opened');
  }

  return (
    <SortWrapper>
      <ButtonSelect type="button" onClick={handleButtonOrderByClick}>{orderByName}</ButtonSelect>
      <List list={orderListShow}>
        <Item>
          <ButtonItem type="button" onClick={handleButtonSortDefault}>Default</ButtonItem>
        </Item>
        <Item>
          <ButtonItem
            type="button"
            onClick={handleButtonSortReleaseDate({ name: `Date Released ${orderTypeReleased}`, type: orderTypeReleased })}
          >
            Date Released
            {' '}
            {orderTypeReleased}
          </ButtonItem>
        </Item>
        <Item>
          <ButtonItem
            type="button"
            onClick={handleButtonSortRating({ name: `Rating ${orderTypeRating}`, type: orderTypeRating})}
          >
            Rating
            {' '}
            {orderTypeRating}
          </ButtonItem>
        </Item>
      </List>
    </SortWrapper>
  );
};

export default SortItems;