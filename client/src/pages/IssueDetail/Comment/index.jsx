/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import Markdown from 'markdown-to-jsx';
import EditComment from '../EditComment';
import {
  FlexDiv,
  CommentContainer,
  Header,
  Body,
  Image,
  Button,
  Date,
  Title,
  Square,
} from './styled';
import { updateCommentAPI } from '../../../apis/comment';
import calculateTime from '../../../lib/calculate-time';

const Comment = ({ comment }) => {
  const [state, setState] = useState(false);
  const [commentInfo, setComment] = useState(comment);

  const updateComment = async (input) => {
    const result = await updateCommentAPI(commentInfo.id, input);
    if (result) {
      const newComment = commentInfo;
      newComment.content = input;
      setComment(newComment);
    }
    setState(false);
  };

  return (
    <FlexDiv>
      <Image image={commentInfo.User.image} />
      {state ? (
        <EditComment
          comment={comment.content}
          action={setState}
          update={updateComment}
        />
      ) : (
        <CommentContainer>
          <Header>
            <div>
              <Title>{commentInfo.User.name}</Title>
              <Date> commented {calculateTime(comment.timestamp)} ago</Date>
            </div>
            <div>
              <Button onClick={() => setState(true)}>Edit</Button>
            </div>
            <Square />
          </Header>
          <Body>
            <Markdown>{comment.content}</Markdown>
          </Body>
        </CommentContainer>
      )}
    </FlexDiv>
  );
};

export default Comment;
