/* eslint-disable no-undef */
const userController = require('../user');
const userService = require('../../service/user');

const httpMocks = require('node-mocks-http');

userService.gitHubLogin = jest.fn();
userService.iOSAppleLogin = jest.fn();
userService.getUsers = jest.fn();
userService.iOSGithubLogin = jest.fn();
userService.logout = jest.fn();

let req, res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('gitHubLogin user Controller 테스트', () => {
  const newUser = { id: 1, image: '', name: 'name' };
  const resulted = { token: 'token', image: 'image', name: 'name' };
  beforeEach(() => {
    req.user = newUser;
  });

  it('함수인가', () => {
    userService.gitHubLogin.mockReturnValue(resulted);
    expect(typeof userController.gitHubLogin).toBe('function');
  });

  it('service에 newuser가 들어가는가', async () => {
    userService.gitHubLogin.mockReturnValue(resulted);
    await userController.gitHubLogin(req, res);
    expect(userService.gitHubLogin).toBeCalledWith(newUser);
  });

  it('성공 시 200응답이 오는가', async () => {
    userService.gitHubLogin.mockReturnValue(resulted);
    await userController.gitHubLogin(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('json을 리턴하는가', async () => {
    userService.gitHubLogin.mockReturnValue(resulted);
    await userController.gitHubLogin(req, res);
    expect(res._isJSON()).toBeTruthy();
  });

  it('에러가 나면 403응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    userService.gitHubLogin.mockReturnValue(errorMessage);
    await userController.gitHubLogin(req, res);
    expect(res.statusCode).toBe(403);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe('iOSAppleLogin user Controller 테스트', () => {
  const newUser = { code: 'code', name: 'name' };
  const resulted = { token: 'token' };
  beforeEach(() => {
    req.body = newUser;
  });

  it('함수인가', () => {
    userService.iOSAppleLogin.mockReturnValue(resulted);
    expect(typeof userController.iOSAppleLogin).toBe('function');
  });

  it('service에 newuser가 들어가는가', async () => {
    userService.iOSAppleLogin.mockReturnValue(resulted);
    await userController.iOSAppleLogin(req, res);
    expect(userService.iOSAppleLogin).toBeCalledWith(newUser);
  });

  it('성공 시 200응답이 오는가', async () => {
    userService.iOSAppleLogin.mockReturnValue(resulted);
    await userController.iOSAppleLogin(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('json을 리턴하는가', async () => {
    userService.iOSAppleLogin.mockReturnValue(resulted);
    await userController.iOSAppleLogin(req, res);
    expect(res._isJSON()).toBeTruthy();
  });

  it('에러가 나면 403응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    userService.iOSAppleLogin.mockReturnValue(errorMessage);
    await userController.iOSAppleLogin(req, res);
    expect(res.statusCode).toBe(403);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe('getUsers user Controller 테스트', () => {
  const resulted = [{ id: 1, name: 'name', image: 'image' }];

  it('함수인가', () => {
    userService.getUsers.mockReturnValue(resulted);
    expect(typeof userController.getUsers).toBe('function');
  });

  it('성공 시 200응답이 오는가', async () => {
    userService.getUsers.mockReturnValue(resulted);
    await userController.getUsers(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('json을 리턴하는가', async () => {
    userService.getUsers.mockReturnValue(resulted);
    await userController.getUsers(req, res);
    expect(res._isJSON()).toBeTruthy();
  });

  it('에러가 나면 403응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    userService.getUsers.mockReturnValue(errorMessage);
    await userController.getUsers(req, res);
    expect(res.statusCode).toBe(403);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe('iOSGithubLogin user Controller 테스트', () => {
  const newUser = { code: 'code', name: 'name', image: 'image' };
  const resulted = { token: 'token' };
  beforeEach(() => {
    req.body = newUser;
  });

  it('함수인가', () => {
    userService.iOSGithubLogin.mockReturnValue(resulted);
    expect(typeof userController.iOSGitHubLogin).toBe('function');
  });

  it('service에 newuser가 들어가는가', async () => {
    userService.iOSGithubLogin.mockReturnValue(resulted);
    await userController.iOSGitHubLogin(req, res);
    expect(userService.iOSGithubLogin).toBeCalledWith(newUser);
  });

  it('성공 시 201응답이 오는가', async () => {
    userService.iOSGithubLogin.mockReturnValue(resulted);
    await userController.iOSGitHubLogin(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('json을 리턴하는가', async () => {
    userService.iOSGithubLogin.mockReturnValue(resulted);
    await userController.iOSGitHubLogin(req, res);
    expect(res._isJSON()).toBeTruthy();
  });

  it('에러가 나면 403응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    userService.iOSGithubLogin.mockReturnValue(errorMessage);
    await userController.iOSGitHubLogin(req, res);
    expect(res.statusCode).toBe(403);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe('logout user Controller 테스트', () => {
  const user = { id: 1 };
  const resulted = { token: 'token' };
  beforeEach(() => {
    req.user = user;
  });

  it('함수인가', () => {
    userService.logout.mockReturnValue(resulted);
    expect(typeof userController.logout).toBe('function');
  });

  it('service에 user가 들어가는가', async () => {
    userService.logout.mockReturnValue(resulted);
    await userController.logout(req, res);
    expect(userService.logout).toBeCalledWith(user);
  });

  it('성공 시 200응답이 오는가', async () => {
    userService.logout.mockReturnValue(resulted);
    await userController.logout(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('json을 리턴하는가', async () => {
    userService.logout.mockReturnValue(resulted);
    await userController.logout(req, res);
    expect(res._isJSON()).toBeTruthy();
  });
});
