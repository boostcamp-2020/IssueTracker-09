/* eslint-disable no-undef */
const imageService = require('../image');

describe('read label service 테스트', () => {
  it('함수인가', () => {
    expect(typeof imageService.upload).toBe('function');
  });
  it('리턴 값이 object인가', () => {
    const result = imageService.upload({ filename: 'hello.jpg' });
    expect(typeof result).toBe('object');
  });
  it('잘못된 정보는 에러를 반환하는가1', () => {
    const result = imageService.upload({ filename: 'hello' });
    expect(result).toEqual({ error: '파일이 잘못되었거나 없습니다' });
  });
  it('잘못된 정보는 에러를 반환하는가2', () => {
    const result = imageService.upload();
    expect(result).toEqual({ error: '파일이 잘못되었거나 없습니다' });
  });
});
