import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NewComment from '../../components/NewComment';
import Sidebar from '../../components/Sidebar';
import { UserContext } from '../../stores/userStore';
import { createIssueAPI } from '../../apis/issue';
import { createCommentAPI } from '../../apis/comment';
import { Container, CommentContainer, Image } from './styled';
import { CreateInfoContext } from '../../stores/createInfoStore';

const IssueNew = () => {
  const {
    userState: { image },
  } = useContext(UserContext);
  const {
    createInfo: { assignee, label, milestone },
  } = useContext(CreateInfoContext);
  const history = useHistory();

  const submitHandler = async ({ title, comment }) => {
    const result = await createIssueAPI({
      title,
      labelId: label.map((l) => l.id),
      assigneeId: assignee.map((a) => a.id),
      milestoneId: milestone.id,
    });
    if (result) {
      if (comment) {
        await createCommentAPI(comment, result.id);
      }
      history.push(`/issues/${result.id}`);
    } else {
      history.push(`/`);
    }
  };

  return (
    <Container>
      <CommentContainer>
        <Image image={image} />
        <NewComment submitEvent={submitHandler} />
      </CommentContainer>

      <Sidebar type="create" />
    </Container>
  );
};

export default IssueNew;
