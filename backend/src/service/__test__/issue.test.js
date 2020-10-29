/* eslint-disable no-undef */
const issueService = require('../issue');
const Issue = require('../../model').Issue;

Issue.findAll = jest.fn();

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
    Comment: {
      commentCount: 1,
    },
  },
];

describe('read issue Service 테스트', () => {
  it('함수인가', () => {
    expect(typeof issueService.read).toBe('function');
  });

  it('리턴 타입이 배열인가', async () => {
    Issue.findAll.mockReturnValue(newIssue);
    const result = await issueService.read();
    expect(typeof result).toBe('object');
  });
});
