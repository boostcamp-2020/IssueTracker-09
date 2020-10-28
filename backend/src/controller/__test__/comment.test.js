/* eslint-disable no-undef */
const commentController = require('../comment');
const commentService = require('../../service/comment');

const httpMocks = require('node-mocks-http');

commentService.addComment = jest.fn();

const newComment = {
  content: 'helloworld',
  userId: 1,
  issueId: 1,
};
let req, res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('add comment Controller 테스트', () => {
  beforeEach(() => {
    req.body = newComment;
  });

  it('함수인가', () => {
    commentService.addComment.mockReturnValue(newComment);
    expect(typeof commentController.addComment).toBe('function');
  });

  it('service에 newComment가 들어가는가', async () => {
    commentService.addComment.mockReturnValue(newComment);
    await commentController.addComment(req, res);
    expect(commentService.addComment).toBeCalledWith(newComment);
  });

  it('성공 시 201응답이 오는가', async () => {
    commentService.addComment.mockReturnValue(newComment);
    await commentController.addComment(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('json을 리턴하는가', async () => {
    commentService.addComment.mockReturnValue(newComment);
    await commentController.addComment(req, res);
    expect(res._isJSON()).toBeTruthy();
  });

  it('에러가 나면 403응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    commentService.addComment.mockReturnValue(errorMessage);
    await commentController.addComment(req, res);
    expect(res.statusCode).toBe(403);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('서버에서 에러가 나면 500응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    const rejectedPromise = Promise.reject(errorMessage);
    commentService.addComment.mockReturnValue(rejectedPromise);
    await commentController.addComment(req, res);
    expect(res.statusCode).toBe(500);
  });
});
