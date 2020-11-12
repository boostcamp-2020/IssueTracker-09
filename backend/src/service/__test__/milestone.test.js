/* eslint-disable no-undef */
const milestoneService = require('../milestone');
const Milestone = require('../../model').Milestone;

Milestone.findOne = jest.fn();
Milestone.findAll = jest.fn();
Milestone.create = jest.fn();
Milestone.destroy = jest.fn();
Milestone.update = jest.fn();

describe('read milestone service 테스트', () => {
  const milestoneResult = [
    {
      dataValues: {
        id: 1,
        content: 'helloworld',
        title: 'milestone1',
        deadline: '2020-20-20',
        is_opened: true,
        Issues: [
          {
            id: 1,
            is_opened: true,
          },
        ],
      },
    },
  ];
  it('함수인가', () => {
    expect(typeof milestoneService.read).toBe('function');
  });

  it('리턴 타입이 object인가', async () => {
    Milestone.findAll.mockReturnValue(milestoneResult);
    const result = await milestoneService.read();
    expect(typeof result).toBe('object');
  });
});

describe('create milestone service 테스트', () => {
  const milestoneResult = {
    id: 1,
    content: 'helloworld',
    title: 'milestone1',
    deadline: '2020-20-20',
  };
  it('함수인가', () => {
    expect(typeof milestoneService.create).toBe('function');
  });
  it('리턴 타입이 object인가', async () => {
    Milestone.create.mockReturnValue(milestoneResult);
    const result = await milestoneService.create(milestoneResult);
    expect(typeof result).toBe('object');
  });
  it('잘못된 정보는 에러를 반환하는가', async () => {
    Milestone.create.mockReturnValue(milestoneResult);
    const result = await milestoneService.create();
    expect(result).toEqual({ error: '정보가 부족합니다' });
  });
});

describe('update milestone service 테스트', () => {
  const milestoneResult = {
    id: 1,
    content: 'helloworld',
    title: 'milestone1',
    deadline: '2020-20-20',
  };

  it('함수인가', () => {
    expect(typeof milestoneService.update).toBe('function');
  });
  it('리턴 타입이 object인가', async () => {
    Milestone.update.mockReturnValue([1]);
    const result = await milestoneService.update(milestoneResult);
    expect(typeof result).toBe('object');
  });
  it('잘못된 정보는 에러를 반환하는가', async () => {
    Milestone.update.mockReturnValue([1]);
    const result = await milestoneService.update();
    expect(result).toEqual({ error: '정보가 부족합니다' });
  });
});

describe('remove milestone service 테스트', () => {
  const milestoneResult = {
    id: 1,
    content: 'helloworld',
    title: 'milestone1',
    deadline: '2020-20-20',
  };
  it('함수인가', () => {
    expect(typeof milestoneService.remove).toBe('function');
  });
  it('리턴 타입이 object인가', async () => {
    Milestone.destroy.mockReturnValue(1);
    const result = await milestoneService.remove(milestoneResult);
    expect(typeof result).toBe('object');
  });
  it('잘못된 정보는 에러를 반환하는가', async () => {
    Milestone.destroy.mockReturnValue(1);
    const result = await milestoneService.remove();
    expect(result).toEqual({ error: '정보가 부족합니다' });
  });
});

describe('updateState milestone service 테스트', () => {
  const milestoneResult = {
    id: 1,
    content: 'helloworld',
    title: 'milestone1',
    deadline: '2020-20-20',
  };
  const milestoneInput = {
    id: 1,
    isOpened: false,
  };
  it('함수인가', () => {
    expect(typeof milestoneService.updateState).toBe('function');
  });
  it('리턴 타입이 object인가', async () => {
    Milestone.findOne.mockReturnValue(milestoneResult);
    Milestone.update.mockReturnValue([1]);
    const result = await milestoneService.updateState(milestoneInput);
    expect(typeof result).toBe('object');
  });
  it('잘못된 정보는 에러를 반환하는가', async () => {
    Milestone.findOne.mockReturnValue(milestoneResult);
    Milestone.update.mockReturnValue([1]);
    const result = await milestoneService.updateState();
    expect(result).toEqual({ error: '정보가 부족합니다' });
  });
  it('상태변경이 안되면 에러를 반환하는가', async () => {
    Milestone.findOne.mockReturnValue(milestoneResult);
    Milestone.update.mockReturnValue([0]);
    const result = await milestoneService.updateState(milestoneInput);
    expect(result).toEqual({ error: 'Milestone 상태 변경 실패' });
  });
});
