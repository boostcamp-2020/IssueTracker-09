/* eslint-disable no-undef */
const labelService = require('../label');
const Label = require('../../model').Label;

Label.findAll = jest.fn();
Label.create = jest.fn();
Label.destroy = jest.fn();
Label.update = jest.fn();

describe('read label service 테스트', () => {
  const labelResult = [
    { id: 1, content: 'helloworld', title: 'label1', coloe: '#fff' },
    { id: 2, content: 'helloworld', title: 'label2', coloe: '#fff' },
  ];
  it('함수인가', () => {
    expect(typeof labelService.read).toBe('function');
  });

  it('리턴 타입이 object인가', async () => {
    Label.findAll.mockReturnValue(labelResult);
    const result = await labelService.read();
    expect(typeof result).toBe('object');
  });
});

describe('create label service 테스트', () => {
  const labelResult = {
    id: 1,
    content: 'helloworld',
    title: 'label1',
    coloe: '#fff',
  };
  it('함수인가', () => {
    expect(typeof labelService.create).toBe('function');
  });
  it('리턴 타입이 object인가', async () => {
    Label.create.mockReturnValue(labelResult);
    const result = await labelService.create(labelResult);
    expect(typeof result).toBe('object');
  });
  it('잘못된 정보는 에러를 반환하는가', async () => {
    Label.create.mockReturnValue(labelResult);
    const result = await labelService.create();
    expect(result).toEqual({ error: '정보가 부족합니다' });
  });
});

describe('update label service 테스트', () => {
  const labelResult = {
    id: 1,
    content: 'helloworld',
    title: 'label1',
    coloe: '#fff',
  };
  it('함수인가', () => {
    expect(typeof labelService.update).toBe('function');
  });
  it('리턴 타입이 object인가', async () => {
    Label.update.mockReturnValue([1]);
    const result = await labelService.update(labelResult);
    expect(typeof result).toBe('object');
  });
  it('잘못된 정보는 에러를 반환하는가', async () => {
    Label.update.mockReturnValue([1]);
    const result = await labelService.update();
    expect(result).toEqual({ error: '정보가 부족합니다' });
  });
});

describe('remove label service 테스트', () => {
  const labelResult = {
    id: 1,
    content: 'helloworld',
    title: 'label1',
    coloe: '#fff',
  };
  it('함수인가', () => {
    expect(typeof labelService.remove).toBe('function');
  });
  it('리턴 타입이 object인가', async () => {
    Label.destroy.mockReturnValue(1);
    const result = await labelService.remove(labelResult);
    expect(typeof result).toBe('object');
  });
  it('잘못된 정보는 에러를 반환하는가', async () => {
    Label.destroy.mockReturnValue(1);
    const result = await labelService.remove();
    expect(result).toEqual({ error: '없는 id값 입니다' });
  });
});
