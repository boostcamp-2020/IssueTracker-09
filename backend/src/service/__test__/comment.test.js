/* eslint-disable no-undef */
const commentService = require('../comment');
const Comment = require('../../model').Comment;

Comment.create = jest.fn();
Comment.destroy = jest.fn();
Comment.update = jest.fn();

describe('create comment service 테스트', () => {
  const commentResult = {
    content: 'helloworld',
    userId: 1,
    issueId: 1,
  };
  it('함수인가', () => {
    expect(typeof commentService.create).toBe('function');
  });

  it('리턴 타입이 object인가', async () => {
    Comment.create.mockReturnValue(commentResult);
    const result = await commentService.create(commentResult);
    expect(typeof result).toBe('object');
  });

  it('잘못된 정보는 에러를 반환하는가', async () => {
    Comment.create.mockReturnValue(commentResult);
    const result = await commentService.create({});
    expect(result).toEqual({ error: '정보가 부족합니다' });
  });
});

describe('remove comment service 테스트', () => {
  const commentResult = { commentId: 1 };

  it('함수인가', () => {
    expect(typeof commentService.remove).toBe('function');
  });

  it('리턴 타입이 boolean인가', async () => {
    Comment.destroy.mockReturnValue(1);
    const result = await commentService.remove(commentResult);
    expect(typeof result).toBe('boolean');
  });

  it('잘못된 정보는 에러를 반환하는가', async () => {
    const result = await commentService.remove({});
    expect(result).toEqual({ error: '정보가 부족합니다' });
  });

  it('DB에 존재하지 않는 id라면', async () => {
    Comment.destroy.mockReturnValue(0);
    const result = await commentService.remove(commentResult);
    expect(result).toEqual({ error: '존재하지 않는 댓글입니다' });
  });
});

describe('update comment service 테스트', () => {
  const commentResult = { commentId: 1 };

  it('함수인가', () => {
    expect(typeof commentService.update).toBe('function');
  });

  it('리턴 타입이 boolean인가', async () => {
    Comment.update.mockReturnValue([1]);
    const result = await commentService.update(commentResult);
    expect(typeof result).toBe('boolean');
  });

  it('잘못된 정보는 에러를 반환하는가', async () => {
    const result = await commentService.update({});
    expect(result).toEqual({ error: '정보가 부족합니다' });
  });

  it('DB에 존재하지 않는 id라면', async () => {
    Comment.update.mockReturnValue([0]);
    const result = await commentService.update(commentResult);
    expect(result).toEqual({ error: '존재하지 않는 댓글입니다' });
  });
});
