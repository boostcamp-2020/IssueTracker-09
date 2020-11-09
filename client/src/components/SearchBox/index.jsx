import React, { useState, useContext } from 'react';
import { faTag, faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useHistory } from 'react-router-dom';
import {
  Container,
  SearchContainer,
  FilterBox,
  Input,
  OtherButton,
  LinkName,
  Button,
  DropdownItem,
  Dropdown,
  Form,
} from './styled';
import makeSearch from '../../lib/make-search';
import { IssueContext } from '../../stores/issueStore';
import { UserContext } from '../../stores/userStore';

const SearchBox = () => {
  const {
    issueState: { search },
  } = useContext(IssueContext);
  const {
    userState: { name },
  } = useContext(UserContext);
  const [inputValue, setInputValue] = useState(search || 'is:open');
  const history = useHistory();

  const dropdown = [
    { title: 'Open issues', condition: 'is:open' },
    { title: 'Your issues', condition: `Author:${name}` },
    { title: 'Closed issues', condition: 'is:close' },
    { title: 'Everything assigned to you', condition: `Assignee:${name}` },
    { title: 'Everything mentioning you', condition: `Comment:${name}` },
  ];

  const submitHandler = (event) => {
    event.preventDefault();
    history.push(`/?q=${inputValue}`);
  };

  return (
    <Container>
      <SearchContainer>
        <FilterBox>
          <summary>Filters</summary>
          <Dropdown>
            {dropdown.map((item, index) => (
              <DropdownItem key={index}>
                <Link to={makeSearch(item.condition, search)}>
                  {item.title}
                </Link>
              </DropdownItem>
            ))}
          </Dropdown>
        </FilterBox>
        <Form onSubmit={submitHandler}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Form>
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
      <Button>
        <Link to="/issues/new">new Issue</Link>
      </Button>
    </Container>
  );
};

export default SearchBox;
