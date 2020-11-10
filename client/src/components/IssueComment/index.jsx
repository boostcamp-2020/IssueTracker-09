import React, { useContext, useState } from 'react';
import { UserContext } from '../../stores/userStore';
import { Container, FlexDiv, Image } from './styled';
import NewComment from '../NewComment';
import Comment from '../Comment';

const IssueComment = ({ comments }) => {
  const {
    userState: { name, image },
  } = useContext(UserContext);
  const [commentList, setCommentList] = useState(comments);
  const addCommentHandler = (input) => {
    // api 호출 부분
    const result = {
      timestamp: '2020-11-10T07:31:13.757Z',
      id: 10,
      content: input,
      user_id: 1,
      issue_id: 4,
    };
    if (result) {
      result.User = {
        id: result.user_id,
        name,
        image,
      };
      setCommentList([...commentList, result]);
    }
  };

  return (
    <Container>
      {commentList?.map((comment, index) => (
        <Comment comment={comment} key={index} />
      ))}
      <FlexDiv>
        <Image image={image} />
        <NewComment addEvent={addCommentHandler} closeEvent="123" />
      </FlexDiv>
    </Container>
  );
};

export default IssueComment;
