import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NewComment from '../../components/NewComment';
import Sidebar from '../../components/Sidebar';
import { UserContext } from '../../stores/userStore';
import { createIssueAPI } from '../../apis/issue';
import { createCommentAPI } from '../../apis/comment';
import { Container, CommentContainer, SideBarConatiner, Image } from './styled';
import CreateInfoProvider from '../../stores/createInfoStore';

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
    <CreateInfoProvider>
      <Container>
        <CommentContainer>
          <Image image={image} />
          <NewComment submitEvent={submitHandler} />
        </CommentContainer>
        <SideBarConatiner>
          <Sidebar type="create" />
        </SideBarConatiner>
      </Container>
    </CreateInfoProvider>
  );
};

export default IssueNew;
