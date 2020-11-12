import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../stores/userStore';
import { Container, FlexDiv, Image } from './styled';
import NewComment from '../../../components/NewComment';
import Comment from '../Comment';
import { getCommentAPI, createCommentAPI } from '../../../apis/comment';
import { updateState } from '../../../apis/issue';

const IssueComment = ({ id, getIssue, isOpen }) => {
  const {
    userState: { name, image },
  } = useContext(UserContext);

  const [commentList, setCommentList] = useState([]);

  useEffect(async () => {
    const result = await getCommentAPI(id);
    setCommentList(result);
  }, []);

  const addCommentHandler = async (input) => {
    const result = await createCommentAPI(input, id);
    if (result) {
      result.User = {
        id: result.user_id,
        name,
        image,
      };
      setCommentList([...commentList, result]);
    }
  };

  const updateIssueHandler = async () => {
    await updateState([id], !isOpen);
    getIssue();
  };

  return (
    <Container>
      {commentList?.map((comment, index) => (
        <Comment comment={comment} key={index} id={id} />
      ))}
      <FlexDiv>
        <Image image={image} />
        <NewComment
          addEvent={addCommentHandler}
          updateStateEvent={updateIssueHandler}
          isOpen={isOpen}
        />
      </FlexDiv>
    </Container>
  );
};

export default IssueComment;
