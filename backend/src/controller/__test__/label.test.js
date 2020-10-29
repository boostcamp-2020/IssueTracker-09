/* eslint-disable no-undef */
const labelController = require('../label');
const labelService = require('../../service/label');

const httpMocks = require('node-mocks-http');

labelService.create = jest.fn();
labelService.read = jest.fn();
labelService.update = jest.fn();
labelService.remove = jest.fn();

const newLabel = {
  color: '#AAAAAA',
  title: 'test',
  content: 'test',
};
const label = {
  id: 1,
  color: '#AAAAAA',
  title: 'test',
  content: 'test',
};
const updateLabel = {
  id: 1,
  data: { color: '#AAAAAA', title: 'test', content: 'test' },
};
let req, res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('Label Controller 테스트', () => {
  describe('create 테스트', () => {
    beforeEach(() => {
      req.body = newLabel;
    });
    it('함수인가', () => {
      labelService.create.mockReturnValue(newLabel);
      expect(typeof labelController.create).toBe('function');
    });

    it('service에 newLabel이 전달 되는가', async () => {
      labelService.create.mockReturnValue(newLabel);
      await labelController.create(req, res);
      expect(labelService.create).toBeCalledWith(newLabel);
    });

    it('성공 시 201응답이 오는가', async () => {
      labelService.create.mockReturnValue(newLabel);
      await labelController.create(req, res);
      expect(res.statusCode).toBe(201);
      expect(res._isEndCalled()).toBeTruthy();
    });

    it('json을 리턴하는가', async () => {
      labelService.create.mockReturnValue(newLabel);
      await labelController.create(req, res);
      expect(res._isJSON()).toBeTruthy();
    });

    it('에러가 나면 403응답이 오는가', async () => {
      const errorMessage = { error: 'Error Message' };
      labelService.create.mockReturnValue(errorMessage);
      await labelController.create(req, res);
      expect(res.statusCode).toBe(403);
      expect(res._isEndCalled()).toBeTruthy();
    });
    it('서버에서 에러가 나면 500응답이 오는가', async () => {
      const errorMessage = { error: 'Error Message' };
      const rejectedPromise = Promise.reject(errorMessage);
      labelService.create.mockReturnValue(rejectedPromise);
      await labelController.create(req, res);
      expect(res.statusCode).toBe(500);
    });
  });
  describe('read 테스트', () => {
    it('함수인가', () => {
      expect(typeof labelController.read).toBe('function');
    });

    it('성공 시 200응답이 오는가', async () => {
      labelService.read.mockReturnValue(label);
      await labelController.read(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._isEndCalled()).toBeTruthy();
    });

    it('json을 리턴하는가', async () => {
      labelService.read.mockReturnValue(label);
      await labelController.read(req, res);
      expect(res._isJSON()).toBeTruthy();
    });

    it('에러가 나면 403응답이 오는가', async () => {
      const errorMessage = { error: 'Error Message' };
      labelService.read.mockReturnValue(errorMessage);
      await labelController.read(req, res);
      expect(res.statusCode).toBe(403);
      expect(res._isEndCalled()).toBeTruthy();
    });

    it('서버에서 에러가 나면 500응답이 오는가', async () => {
      const errorMessage = { error: 'Error Message' };
      const rejectedPromise = Promise.reject(errorMessage);
      labelService.read.mockReturnValue(rejectedPromise);
      await labelController.read(req, res);
      expect(res.statusCode).toBe(500);
    });
  });
  describe('update 테스트', () => {
    beforeEach(() => {
      req.body = newLabel;
      req.params = { id: 1 };
    });
    it('함수인가', () => {
      expect(typeof labelController.update).toBe('function');
    });

    it('service에 updateLabel이 전달 되는가', async () => {
      labelService.update.mockReturnValue(newLabel);
      await labelController.update(req, res);
      expect(labelService.update).toBeCalledWith(updateLabel);
    });

    it('성공 시 200응답이 오는가', async () => {
      labelService.update.mockReturnValue(true);
      await labelController.update(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._isEndCalled()).toBeTruthy();
    });

    it('에러가 나면 403응답이 오는가', async () => {
      const errorMessage = { error: 'Error Message' };
      labelService.update.mockReturnValue(errorMessage);
      await labelController.update(req, res);
      expect(res.statusCode).toBe(403);
      expect(res._isEndCalled()).toBeTruthy();
    });

    it('서버에서 에러가 나면 500응답이 오는가', async () => {
      const errorMessage = { error: 'Error Message' };
      const rejectedPromise = Promise.reject(errorMessage);
      labelService.update.mockReturnValue(rejectedPromise);
      await labelController.update(req, res);
      expect(res.statusCode).toBe(500);
    });
  });
  describe('remove 테스트', () => {
    beforeEach(() => {
      req.params = { id: 1 };
    });
    it('함수인가', () => {
      expect(typeof labelController.remove).toBe('function');
    });

    it('service에 라벨 id값이 전달 되는가', async () => {
      labelService.remove.mockReturnValue(true);
      await labelController.remove(req, res);
      expect(labelService.remove).toBeCalledWith({ id: 1 });
    });

    it('성공 시 200응답이 오는가', async () => {
      labelService.remove.mockReturnValue(true);
      await labelController.remove(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._isEndCalled()).toBeTruthy();
    });

    it('에러가 나면 403응답이 오는가', async () => {
      const errorMessage = { error: 'Error Message' };
      labelService.remove.mockReturnValue(errorMessage);
      await labelController.remove(req, res);
      expect(res.statusCode).toBe(403);
      expect(res._isEndCalled()).toBeTruthy();
    });

    it('서버에서 에러가 나면 500응답이 오는가', async () => {
      const errorMessage = { error: 'Error Message' };
      const rejectedPromise = Promise.reject(errorMessage);
      labelService.remove.mockReturnValue(rejectedPromise);
      await labelController.remove(req, res);
      expect(res.statusCode).toBe(500);
    });
  });
});
