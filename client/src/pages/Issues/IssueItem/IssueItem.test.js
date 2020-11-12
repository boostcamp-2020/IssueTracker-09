/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import IssueItem from '.';

function renderComponent(issue, checked, checkedHandler) {
  return render(
    <IssueItem
      issue={issue}
      checked={checked}
      checkedHandler={checkedHandler}
    />
  );
}

describe('loads and displays greeting', () => {
  const issue = {
    id: 1,
    title: 'issue title',
    is_opened: true,
    timestamp: '2020-11-03T12:20:25.000Z',
    Assignees: [
      {
        id: 1,
        user_code: 'g46195613',
        name: 'assignee name',
        image: '',
      },
    ],
    Milestone: {
      id: 1,
      title: 'milestone title',
      content: '수정 테스트',
      deadline: '2020-11-05',
      is_opened: true,
    },
    User: {
      id: 1,
      user_code: 'code',
      name: 'user name',
      image: '',
    },
    Labels: [
      {
        id: 2,
        color: '#975917',
        title: 'label name',
        content: '입력 테스트',
      },
    ],
  };

  it('렌더링 테스트', async () => {
    renderComponent(issue, []);

    expect(screen.getByText('issue title')).toBeInTheDocument();
    expect(screen.getByText('milestone title')).toBeInTheDocument();
    expect(screen.getByText('label name')).toBeInTheDocument();
    expect(
      screen.getByText('opened yesterday by user name')
    ).toBeInTheDocument();
    expect(screen.getByText('#1')).toBeInTheDocument();
  });

  it('체크 여부', async () => {
    renderComponent(issue, [1]);
    const input = screen.getByTestId('checkbox');
    expect(input.checked).toBeTruthy();
  });

  // fireevent작동 안함...
  // it('체크 여부', async () => {
  //   renderComponent(issue, [1], (id) => id);
  //   const input = screen.getByTestId('checkbox');

  //   fireEvent.click(input);
  //   expect(input.checked).toBeFalsy();
  // });
});
