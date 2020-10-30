/* eslint-disable no-undef */
const imageController = require('../image');
const imageService = require('../../service/image');

const httpMocks = require('node-mocks-http');

imageService.upload = jest.fn();

let req, res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

describe('upload image Controller 테스트', () => {
  const newImage = 'it is image file';
  const resulted = 'image url';
  beforeEach(() => {
    req.file = newImage;
  });

  it('함수인가', () => {
    imageService.upload.mockReturnValue(resulted);
    expect(typeof imageController.upload).toBe('function');
  });

  it('service에 newimage가 들어가는가', async () => {
    imageService.upload.mockReturnValue(resulted);
    await imageController.upload(req, res);
    expect(imageService.upload).toBeCalledWith(newImage);
  });

  it('성공 시 201응답이 오는가', async () => {
    imageService.upload.mockReturnValue(resulted);
    await imageController.upload(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('json을 리턴하는가', async () => {
    imageService.upload.mockReturnValue(resulted);
    await imageController.upload(req, res);
    expect(res._isJSON()).toBeTruthy();
  });

  it('에러가 나면 401응답이 오는가', async () => {
    const errorMessage = { error: 'Error Message' };
    imageService.upload.mockReturnValue(errorMessage);
    await imageController.upload(req, res);
    expect(res.statusCode).toBe(401);
    expect(res._isEndCalled()).toBeTruthy();
  });
});
