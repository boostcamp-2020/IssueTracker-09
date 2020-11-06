import styled from 'styled-components';

const Button = styled.button`
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  border: none;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 5px;
  display: block;
`;
const Div = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const Image = styled.img.attrs({
  src:
    'https://raw.githubusercontent.com/qkrdmstlr3/svg-icon-animation/master/github-icon/github-icon.gif',
  alt: 'github-icon',
})`
  margin: 0 auto;
  display: block;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
export { Button, Div, Image };
