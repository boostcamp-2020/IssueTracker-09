import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NewComment from '../../components/NewComment';
import { UserContext } from '../../stores/userStore';
import { createIssueAPI } from '../../apis/issue';
import { createCommentAPI } from '../../apis/comment';
import { Container, CommentContainer, SideBarConatiner, Image } from './styled';

const IssueNew = () => {
  const {
    userState: { image },
  } = useContext(UserContext);
  const history = useHistory();

  const submitHandler = async ({ title, comment }) => {
    // const result = await createIssueAPI({
    //   title,
    //   labelId: [3],
    //   assigneeId: [1],
    //   milestoneId: 1,
    // });
    // if (result) {
    //   if (comment) {
    //     await createCommentAPI(comment, result.id);
    //   }
    //   history.push(`/issues/${result.id}`);
    // } else {
    history.push(`/`);
    // }
  };

  return (
    <Container>
      <CommentContainer>
        <Image image={image} />
        <NewComment submitEvent={submitHandler} />
      </CommentContainer>
      <SideBarConatiner>123</SideBarConatiner>
    </Container>
  );
};

export default IssueNew;
