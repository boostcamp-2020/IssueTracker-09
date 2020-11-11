/* eslint-disable no-undef */
/**
 * 다른 테이블과의 연결관계가 들어가서 어떻게 만들어야 할지 모르겠다...
 * 다른 테이블과의 관계를 수정하는 것(getLabel 등)을 제외하고 작성
 */
const issueService = require('../issue');
const Model = require('../../model');
const Issue = Model.Issue;

Issue.findAll = jest.fn();
Issue.create = jest.fn();
Issue.destroy = jest.fn();
Issue.update = jest.fn();
issueService.makeObj = jest.fn();
Model.sequelize.transaction = jest.fn();
const rollback = jest.fn();

describe('read issue Service 테스트', () => {
  const newIssue = [
    {
      id: 1,
      title: 'title',
      content: 'content',
      is_opended: true,
      timestamp: '2020-20-20',
      milestone_id: 1,
      user_id: 1,
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
      User: {
        id: 1,
        name: 'name',
        image: 'image',
      },
    },
  ];
  it('함수인가', () => {
    expect(typeof issueService.read).toBe('function');
  });

  it('리턴 타입이 배열인가', async () => {
    Issue.findAll.mockReturnValue(newIssue);
    issueService.makeObj.mockReturnValue({});
    const result = await issueService.read({ q: '' });
    expect(typeof result).toBe('object');
  });

  it('쿼리가 없어도 되는가?', async () => {
    Issue.findAll.mockReturnValue(newIssue);
    issueService.makeObj.mockReturnValue({});
    const result = await issueService.read();
    expect(typeof result).toBe('object');
  });
});

describe('create issue Service 테스트', () => {
  const requestInfo = {
    title: 'title',
    content: 'content',
    milestoneId: 1,
    assigneeId: [1, 2, 3],
    labelId: [1, 2, 3],
    id: 1,
  };
  const newIssue = {
    title: 'title',
    content: 'content',
    milestone_id: 1,
    user_id: 1,
  };
  it('함수인가', () => {
    expect(typeof issueService.create).toBe('function');
  });

  it('rollback이 되는가', async () => {
    Issue.create.mockReturnValue(newIssue);
    Model.sequelize.transaction.mockReturnValue({ rollback });
    const result = await issueService.create(requestInfo);
    expect(typeof result).toBe('object');
  });
});

describe('remove issue service 테스트', () => {
  const requestInfo = { id: 1 };
  it('함수인가', () => {
    expect(typeof issueService.remove).toBe('function');
  });
  it('리턴 타입이 object인가', async () => {
    Issue.destroy.mockReturnValue(1);
    const result = await issueService.remove(requestInfo);
    expect(typeof result).toBe('object');
  });
  it('잘못된 정보는 에러를 반환하는가', async () => {
    Issue.destroy.mockReturnValue(1);
    const result = await issueService.remove();
    expect(result).toEqual({ error: '없는 id값 입니다' });
  });
});

describe('updateState issue service 테스트', () => {
  const issueResult = [
    {
      id: 1,
      content: 'helloworld',
      title: 'issue1',
      deadline: '2020-20-20',
    },
  ];
  const issueInput = {
    id: [1],
    isOpened: false,
  };
  it('함수인가', () => {
    expect(typeof issueService.updateState).toBe('function');
  });
  it('리턴 타입이 object인가', async () => {
    Issue.findAll.mockReturnValue(issueResult);
    Issue.update.mockReturnValue([1]);
    const result = await issueService.updateState(issueInput);
    expect(typeof result).toBe('object');
  });
  it('잘못된 정보는 에러를 반환하는가', async () => {
    Issue.findAll.mockReturnValue(issueResult);
    Issue.update.mockReturnValue([1]);
    const result = await issueService.updateState();
    expect(result).toEqual({ error: '정보가 부족합니다' });
  });
  it('issue가 존재하지 않으면 에러를 반환하는가', async () => {
    Issue.findAll.mockReturnValue([]);
    Issue.update.mockReturnValue([0]);
    const result = await issueService.updateState(issueInput);
    expect(result).toEqual({ error: '없는 id값 입니다.' });
  });
  it('result값이 없으면 실패 에러를 반환하는가', async () => {
    Issue.findAll.mockReturnValue(issueResult);
    Issue.update.mockReturnValue([0]);
    const result = await issueService.updateState(issueInput);
    expect(result).toEqual({ error: 'Issue 상태 변경 실패' });
  });
});
