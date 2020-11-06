import { createGlobalStyle } from 'styled-components';
import styledReset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${styledReset}
  * {
		box-sizing: border-box;
	}
  
	a {
		text-decoration: none;
		color: inherit;
	}
	
	button,
	button:active {
		outline: none;
		cursor: pointer;
	}
	input:focus{
		outline: none;
	}
`;

export default GlobalStyle;
