/* eslint-disable no-undef */
const issueController = require('../issue');
const issueService = require('../../service/issue');

const httpMocks = require('node-mocks-http');

issueService.read = jest.fn();
issueService.create = jest.fn();
issueService.remove = jest.fn();

const newIssue = [
  {
    id: 1,
    title: 'title',
    content: 'content',
    is_opended: true,
    timestamp: '2020-20-20',
    milestone_id: 1,
    user_id: 1,
    commentCount: 1,
    Milestone: {
      title: 'title',
      content: 'content',
      deadline: '2020-20-20',
      is_opened: true,
    },
    AssigneeIssue: [
      {
        user_id: 1,
      },
    ],
    LabelIssue: [
      {
        label_id: 1,
      },
    ],
  },
];

const issue1 = {
  milestoneId: 1,
  assigneeId: [1, 2],
  labelId: [1, 2],
  title: 'title',
  content: 'content',
  id: 1,
};
const issue = {
  milestoneId: 1,
  assigneeId: [1, 2],
  labelId: [1, 2],
  title: 'title',
  content: 'content',
};

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('create issue Controller 테스트', () => {
  beforeEach(() => {
    req.body = issue;
    req.user = { id: 1 };
  });

  it('함수인가', () => {
    expect(typeof issueController.create).toBe('function');
  });

  it('service에 newIssue가 들어가는가', async () => {
    await issueController.create(req, res);
    expect(issueService.create).toBeCalledWith(issue1);
  });

  it('성공 시 201응답이 오는가', async () => {
    issueService.create.mockReturnValue(newIssue);
    await issueController.create(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('에러가 나면 400응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    issueService.create.mockReturnValue(errorMessage);
    await issueController.create(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('서버에서 에러가 나면 500응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    const rejectedPromise = Promise.reject(errorMessage);
    issueService.create.mockReturnValue(rejectedPromise);
    await issueController.create(req, res);
    expect(res.statusCode).toBe(500);
  });
});

describe('read issue Controller 테스트', () => {
  it('함수인가', () => {
    expect(typeof issueController.read).toBe('function');
  });

  it('성공 시 200응답이 오는가', async () => {
    issueService.read.mockReturnValue(newIssue);
    await issueController.read(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('json을 리턴하는가', async () => {
    issueService.read.mockReturnValue(newIssue);
    await issueController.read(req, res);
    expect(res._isJSON()).toBeTruthy();
  });

  it('에러가 나면 400응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    issueService.read.mockReturnValue(errorMessage);
    await issueController.read(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('서버에서 에러가 나면 500응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    const rejectedPromise = Promise.reject(errorMessage);
    issueService.read.mockReturnValue(rejectedPromise);
    await issueController.read(req, res);
    expect(res.statusCode).toBe(500);
  });
});

describe('remove issue Controller 테스트', () => {
  const removeParams = { id: 1 };
  beforeEach(() => {
    req.params = removeParams;
  });

  it('함수인가', () => {
    expect(typeof issueController.remove).toBe('function');
  });

  it('service에 newIssue가 들어가는가', async () => {
    await issueController.remove(req, res);
    expect(issueService.remove).toBeCalledWith(removeParams);
  });

  it('성공 시 200응답이 오는가', async () => {
    issueService.remove.mockReturnValue(true);
    await issueController.remove(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('에러가 나면 400응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    issueService.remove.mockReturnValue(errorMessage);
    await issueController.remove(req, res);
    expect(res.statusCode).toBe(400);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('서버에서 에러가 나면 500응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    const rejectedPromise = Promise.reject(errorMessage);
    issueService.remove.mockReturnValue(rejectedPromise);
    await issueController.remove(req, res);
    expect(res.statusCode).toBe(500);
  });
});
