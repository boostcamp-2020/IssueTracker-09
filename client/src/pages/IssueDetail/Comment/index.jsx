/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import EditComment from '../EditComment';
import { FlexDiv, CommentContainer, Header, Body, Image } from './styled';
import { updateCommentAPI } from '../../../apis/comment';

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
              <span>{commentInfo.User.name}</span>
              <span>{comment.timestamp}</span>
            </div>
            <div>
              <button onClick={() => setState(true)}>edit</button>
            </div>
          </Header>
          <Body>{comment.content}</Body>
        </CommentContainer>
      )}
    </FlexDiv>
  );
};

export default Comment;
