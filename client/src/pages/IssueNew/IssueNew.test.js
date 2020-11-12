/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import IssueNew from '.';

function renderComponent() {
  return render(<IssueNew />);
}

describe('loads and displays greeting', () => {
  it('렌더링 테스트', async () => {
    renderComponent();
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
