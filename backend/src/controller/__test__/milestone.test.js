/* eslint-disable no-undef */
const milestoneController = require('../milestone');
const milestoneService = require('../../service/milestone');

const httpMocks = require('node-mocks-http');

milestoneService.create = jest.fn();
milestoneService.update = jest.fn();
milestoneService.remove = jest.fn();
milestoneService.read = jest.fn();

const newmilestone = {
  title: 'title',
  content: 'content',
  deadline: '2020-20-20',
};

let req, res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('create milestone Controller 테스트', () => {
  const user = { id: 1 };
  beforeEach(() => {
    req.body = newmilestone;
    req.user = user;
  });

  it('함수인가', () => {
    milestoneService.create.mockReturnValue(newmilestone);
    expect(typeof milestoneController.create).toBe('function');
  });

  it('service에 newmilestone가 들어가는가', async () => {
    milestoneService.create.mockReturnValue(newmilestone);
    await milestoneController.create(req, res);
    expect(milestoneService.create).toBeCalledWith(newmilestone);
  });

  it('성공 시 201응답이 오는가', async () => {
    milestoneService.create.mockReturnValue(newmilestone);
    await milestoneController.create(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('json을 리턴하는가', async () => {
    milestoneService.create.mockReturnValue(newmilestone);
    await milestoneController.create(req, res);
    expect(res._isJSON()).toBeTruthy();
  });

  it('에러가 나면 403응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    milestoneService.create.mockReturnValue(errorMessage);
    await milestoneController.create(req, res);
    expect(res.statusCode).toBe(403);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('서버에서 에러가 나면 500응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    const rejectedPromise = Promise.reject(errorMessage);
    milestoneService.create.mockReturnValue(rejectedPromise);
    await milestoneController.create(req, res);
    expect(res.statusCode).toBe(500);
  });
});

describe('update milestone Controller 테스트', () => {
  const userParams = { id: 1 };
  beforeEach(() => {
    req.params = userParams;
    req.body = newmilestone;
  });

  it('함수인가', () => {
    milestoneService.update.mockReturnValue(newmilestone);
    expect(typeof milestoneController.update).toBe('function');
  });

  it('service에 newmilestone가 들어가는가', async () => {
    milestoneService.update.mockReturnValue(newmilestone);
    await milestoneController.update(req, res);
    expect(milestoneService.update).toBeCalledWith(userParams, newmilestone);
  });

  it('성공 시 200응답이 오는가', async () => {
    milestoneService.update.mockReturnValue(newmilestone);
    await milestoneController.update(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('json을 리턴하는가', async () => {
    milestoneService.update.mockReturnValue(newmilestone);
    await milestoneController.update(req, res);
    expect(res._isJSON()).toBeTruthy();
  });

  it('에러가 나면 403응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    milestoneService.update.mockReturnValue(errorMessage);
    await milestoneController.update(req, res);
    expect(res.statusCode).toBe(403);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('서버에서 에러가 나면 500응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    const rejectedPromise = Promise.reject(errorMessage);
    milestoneService.update.mockReturnValue(rejectedPromise);
    await milestoneController.update(req, res);
    expect(res.statusCode).toBe(500);
  });
});

describe('remove milestone Controller 테스트', () => {
  const milestoneParams = { id: 1 };
  beforeEach(() => {
    req.params = milestoneParams;
  });

  it('함수인가', () => {
    milestoneService.remove.mockReturnValue(newmilestone);
    expect(typeof milestoneController.remove).toBe('function');
  });

  it('service에 newmilestone가 들어가는가', async () => {
    milestoneService.remove.mockReturnValue(newmilestone);
    await milestoneController.remove(req, res);
    expect(milestoneService.remove).toBeCalledWith(milestoneParams);
  });

  it('성공 시 200응답이 오는가', async () => {
    milestoneService.remove.mockReturnValue(newmilestone);
    await milestoneController.remove(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('json을 리턴하는가', async () => {
    milestoneService.remove.mockReturnValue(newmilestone);
    await milestoneController.remove(req, res);
    expect(res._isJSON()).toBeTruthy();
  });

  it('에러가 나면 403응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    milestoneService.remove.mockReturnValue(errorMessage);
    await milestoneController.remove(req, res);
    expect(res.statusCode).toBe(403);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('서버에서 에러가 나면 500응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    const rejectedPromise = Promise.reject(errorMessage);
    milestoneService.remove.mockReturnValue(rejectedPromise);
    await milestoneController.remove(req, res);
    expect(res.statusCode).toBe(500);
  });
});

describe('read milestone Controller 테스트', () => {
  const returnedMilestone = [
    {
      title: 'title',
      content: 'content',
      deadline: '2020-20-20',
      openCount: 1,
      totalCount: 1,
    },
  ];

  it('함수인가', () => {
    milestoneService.read.mockReturnValue(returnedMilestone);
    expect(typeof milestoneController.read).toBe('function');
  });

  it('성공 시 200응답이 오는가', async () => {
    milestoneService.read.mockReturnValue(returnedMilestone);
    await milestoneController.read(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('json을 리턴하는가', async () => {
    milestoneService.read.mockReturnValue(returnedMilestone);
    await milestoneController.read(req, res);
    expect(res._isJSON()).toBeTruthy();
  });

  it('에러가 나면 403응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    milestoneService.read.mockReturnValue(errorMessage);
    await milestoneController.read(req, res);
    expect(res.statusCode).toBe(403);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('서버에서 에러가 나면 500응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    const rejectedPromise = Promise.reject(errorMessage);
    milestoneService.read.mockReturnValue(rejectedPromise);
    await milestoneController.read(req, res);
    expect(res.statusCode).toBe(500);
  });
});
