import React, { useContext, useEffect, useRef } from 'react';
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
  Summary,
} from './styled';
import makeSearch from '../../../lib/make-search';
import { IssueContext } from '../../../stores/issueStore';
import { UserContext } from '../../../stores/userStore';
import { overlayElement } from '../../../components/Overlay';

const SearchBox = () => {
  const {
    issueState: { search },
  } = useContext(IssueContext);
  const {
    userState: { name },
  } = useContext(UserContext);
  const inputValue = useRef(null);
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
    history.push(`/?q=${inputValue.current.value}`);
  };

  useEffect(() => {
    inputValue.current.value = search;
  }, [search]);

  return (
    <Container>
      <SearchContainer>
        <FilterBox>
          <Summary
            onClick={() => {
              overlayElement.current.hidden = false;
            }}
          >
            Filters
          </Summary>
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
          <Input ref={inputValue} defaultValue={search || 'is:open'} />
        </Form>
      </SearchContainer>
      <OtherButton>
        <LinkName>
          <Link to="/labels">
            <FontAwesomeIcon icon={faTag} />
            Labels
          </Link>
        </LinkName>
        <LinkName>
          <Link to="/milestones">
            <FontAwesomeIcon icon={faFlag} />
            Milestones
          </Link>
        </LinkName>
      </OtherButton>
      <Button>
        <Link to="/issues/new">new Issue</Link>
      </Button>
    </Container>
  );
};

export default SearchBox;
