import styled from 'styled-components';

const Div = styled.div.attrs({
  id: 'overlay',
  hidden: true,
})`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export default Div;
