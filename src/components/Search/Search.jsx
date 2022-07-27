import * as React from 'react';
import styled from 'styled-components';

const InputSearch = styled.input`
  width: 100%;
  height: 45px;
  margin-bottom: 20px;
  padding: 5px 20px;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 16px;
  @media (min-width: 950px) {
    width: 890px;
  }
`;

const Search = ({ search, setSearch, setUpdateList, setIsLoading }) => {
  const handleSearch = ({ target }) => {
    setSearch(target.value);
  };

  React.useEffect(() => {
    setUpdateList(false);
    setIsLoading(true);
  }, [search]);

  return (
    <div>
      <label htmlFor="seach" className='visually-hidden'>Search</label>
      <InputSearch type="search" id="search" name="search" onChange={handleSearch} placeholder="Search" />
    </div>
  )
};

export default Search;