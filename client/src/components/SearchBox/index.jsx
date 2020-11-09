import React, { useState } from 'react';
import { faTag, faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Container,
  SearchContainer,
  FilterBox,
  Input,
  OtherButton,
  LinkName,
  Button,
} from './styled';

const SearchBox = () => {
  const [inputValue, setInputValue] = useState('is:issue is:open');

  return (
    <Container>
      <SearchContainer>
        <FilterBox>
          <summary>Filters</summary>
        </FilterBox>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </SearchContainer>
      <OtherButton>
        <LinkName>
          <FontAwesomeIcon icon={faTag} />
          Labels
        </LinkName>
        <LinkName>
          <FontAwesomeIcon icon={faFlag} />
          Milestones
        </LinkName>
      </OtherButton>
      <Button>new Issue</Button>
    </Container>
  );
};

export default SearchBox;
