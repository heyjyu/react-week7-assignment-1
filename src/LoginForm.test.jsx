import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderLoginForm({ loginInputs }) {
    return render((
      <LoginForm
        loginInputs={loginInputs}
        onChange={handleChange}
        onClick={handleClick}
      />));
  }

  it('제목, 이메일 입력창, 암호 입력창, 버튼을 보여줍니다.', () => {
    const initialInputs = {
      email: '',
      password: '',
    };

    const { queryByText, queryByLabelText } = renderLoginForm({ loginInputs: initialInputs });

    expect(queryByText(/Log in/)).not.toBeNull();

    expect(queryByLabelText(/E-mail/)).not.toBeNull();
    expect(queryByLabelText(/Password/)).not.toBeNull();

    expect(queryByLabelText(/E-mail/).value).toBe('');
    expect(queryByLabelText(/Password/).value).toBe('');

    expect(queryByText(/Login/)).not.toBeNull();
  });

  it('이메일, 암호 입력창에 값을 입력하면 입력값이 업데이트 됩니다.', () => {
    const initialInputs = {
      email: 'previousEmail@example.com',
      password: 'previousPassword123',
    };

    const { queryByLabelText } = renderLoginForm({ loginInputs: initialInputs });

    expect(queryByLabelText(/E-mail/).value).toBe('previousEmail@example.com');
    expect(queryByLabelText(/Password/).value).toBe('previousPassword123');

    fireEvent.change(queryByLabelText(/E-mail/), { target: { value: 'currentEmail@example.com' } });

    expect(handleChange).toBeCalled();

    fireEvent.change(queryByLabelText(/Password/), { target: { value: 'currentPassword123' } });

    expect(handleChange).toBeCalled();
  });

  it('로그인하는 버튼을 눌러 아이디와 비밀번호를 제출합니다.', () => {
    const initialInputs = {
      email: '',
      password: '',
    };

    const { getByText, getByLabelText } = renderLoginForm({ loginInputs: initialInputs });

    fireEvent.click(getByText(/Login/));

    expect(handleClick).toBeCalled();

    expect(getByLabelText(/E-mail/).value).toBe('');
    expect(getByLabelText(/Password/).value).toBe('');
  });
});
