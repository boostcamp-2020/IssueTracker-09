/* eslint-disable no-undef */
const commentController = require('../comment');
const commentService = require('../../service/comment');

const httpMocks = require('node-mocks-http');

commentService.create = jest.fn();
commentService.remove = jest.fn();
commentService.update = jest.fn();
commentService.read = jest.fn();

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

describe('create comment Controller 테스트', () => {
  const user = { id: 1 };
  beforeEach(() => {
    req.body = newComment;
    req.user = user;
  });

  it('함수인가', () => {
    commentService.create.mockReturnValue(newComment);
    expect(typeof commentController.create).toBe('function');
  });

  it('service에 newComment가 들어가는가', async () => {
    commentService.create.mockReturnValue(newComment);
    await commentController.create(req, res);
    expect(commentService.create).toBeCalledWith(newComment);
  });

  it('성공 시 201응답이 오는가', async () => {
    commentService.create.mockReturnValue(newComment);
    await commentController.create(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('json을 리턴하는가', async () => {
    commentService.create.mockReturnValue(newComment);
    await commentController.create(req, res);
    expect(res._isJSON()).toBeTruthy();
  });

  it('에러가 나면 403응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    commentService.create.mockReturnValue(errorMessage);
    await commentController.create(req, res);
    expect(res.statusCode).toBe(403);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('서버에서 에러가 나면 500응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    const rejectedPromise = Promise.reject(errorMessage);
    commentService.create.mockReturnValue(rejectedPromise);
    await commentController.create(req, res);
    expect(res.statusCode).toBe(500);
  });
});

describe('remove comment Controller 테스트', () => {
  const removeParams = { id: 1 };
  beforeEach(() => {
    req.params = removeParams;
  });

  it('함수인가', () => {
    commentService.remove.mockReturnValue(true);
    expect(typeof commentController.remove).toBe('function');
  });

  it('service에 data가 들어가는가', async () => {
    commentService.remove.mockReturnValue(true);
    await commentController.remove(req, res);
    expect(commentService.remove).toBeCalledWith(removeParams);
  });

  it('성공 시 200응답이 오는가', async () => {
    commentService.remove.mockReturnValue(true);
    await commentController.remove(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('json을 리턴하는가', async () => {
    commentService.remove.mockReturnValue(true);
    await commentController.remove(req, res);
    expect(res._isJSON()).toBeTruthy();
  });

  it('에러가 나면 403응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    commentService.remove.mockReturnValue(errorMessage);
    await commentController.remove(req, res);
    expect(res.statusCode).toBe(403);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('서버에서 에러가 나면 500응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    const rejectedPromise = Promise.reject(errorMessage);
    commentService.remove.mockReturnValue(rejectedPromise);
    await commentController.remove(req, res);
    expect(res.statusCode).toBe(500);
  });
});

describe('update comment Controller 테스트', () => {
  const updateData = { content: 'byeworld' };
  const updateParams = { id: 1 };

  beforeEach(() => {
    req.body = updateData;
    req.params = updateParams;
  });

  it('함수인가', () => {
    commentService.update.mockReturnValue(true);
    expect(typeof commentController.update).toBe('function');
  });

  it('service에 data가 들어가는가', async () => {
    commentService.update.mockReturnValue(true);
    await commentController.update(req, res);
    expect(commentService.update).toBeCalledWith({
      ...updateData,
      ...updateParams,
    });
  });

  it('성공 시 200응답이 오는가', async () => {
    commentService.update.mockReturnValue(true);
    await commentController.update(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('json을 리턴하는가', async () => {
    commentService.update.mockReturnValue(true);
    await commentController.update(req, res);
    expect(res._isJSON()).toBeTruthy();
  });

  it('에러가 나면 403응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    commentService.update.mockReturnValue(errorMessage);
    await commentController.update(req, res);
    expect(res.statusCode).toBe(403);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('서버에서 에러가 나면 500응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    const rejectedPromise = Promise.reject(errorMessage);
    commentService.update.mockReturnValue(rejectedPromise);
    await commentController.update(req, res);
    expect(res.statusCode).toBe(500);
  });
});

describe('read comment Controller 테스트', () => {
  const returnedComment = [
    {
      content: 'content',
      user_id: 1,
      issue_id: 1,
    },
  ];

  it('함수인가', () => {
    commentService.read.mockReturnValue(returnedComment);
    expect(typeof commentController.read).toBe('function');
  });

  it('성공 시 200응답이 오는가', async () => {
    commentService.read.mockReturnValue(returnedComment);
    await commentController.read(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('json을 리턴하는가', async () => {
    commentService.read.mockReturnValue(returnedComment);
    await commentController.read(req, res);
    expect(res._isJSON()).toBeTruthy();
  });

  it('에러가 나면 403응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    commentService.read.mockReturnValue(errorMessage);
    await commentController.read(req, res);
    expect(res.statusCode).toBe(403);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('서버에서 에러가 나면 500응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    const rejectedPromise = Promise.reject(errorMessage);
    commentService.read.mockReturnValue(rejectedPromise);
    await commentController.read(req, res);
    expect(res.statusCode).toBe(500);
  });
});
