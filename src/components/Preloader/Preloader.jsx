import * as React from 'react';
import styled from 'styled-components';

const PreloaderStyle = styled.p`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px 40px;
  text-align: center;
  font-size: 72px;
  background-color: #fff;
  border-radius: 40px;
  opacity: 0.8;
`;

const Preloader = () => {
  return (
    <PreloaderStyle>Loading...</PreloaderStyle>
  );
};

export default Preloader;
