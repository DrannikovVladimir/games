import * as React from 'react';
import styled from 'styled-components';

const ErrorStyles = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  padding: 40px;
  border-radius: 40px;
  background-color: #FFFFFF;
  color: red;
  font-size: 72px;
  text-align: center;
`;

const Error = () => {
  return (
    <ErrorStyles>Error! Try later or reload page</ErrorStyles>
  );
};

export default Error;