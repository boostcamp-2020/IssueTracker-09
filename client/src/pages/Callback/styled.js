import styled from 'styled-components';

const Image = styled.img.attrs({
  src:
    'https://raw.githubusercontent.com/qkrdmstlr3/svg-icon-animation/master/react-icon/react-icon.gif',
  alt: 'github-icon',
})`
  border-radius: 10px;
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export default Image;
