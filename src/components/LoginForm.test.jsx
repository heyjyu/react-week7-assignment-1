import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import LoginForm from './LoginForm';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('LoginForm', () => {
  const handleChangeId = jest.fn();
  const handleChangePassword = jest.fn();
  const handleClick = jest.fn();

  const renderLogin = ({ id, password }) => render(
    <LoginForm
      id={id}
      password={password}
      onChangeId={handleChangeId}
      onChangePassword={handleChangePassword}
      onClick={handleClick}
    />,
  );
  context('with all fields', () => {
    const renderFullField = () => renderLogin({ id: 'id', password: 'passowrd' });

    it('all valid and clickable button', () => {
      renderFullField();

      screen.getAllByRole('textbox').forEach((input) => {
        expect(input).toHaveAttribute('aria-invalid', 'false');
      });
      expect(screen.getByRole('button', { name: 'Log in' })).toBeEnabled();
    });

    it('can click login button', () => {
      renderFullField();

      expect(handleClick).not.toBeCalled();

      fireEvent.click(screen.getByRole('button'));

      expect(handleClick).toBeCalled();
    });
  });

  context('without one field', () => {
    const renderOnlyIdField = () => renderLogin({ id: 'id' });

    it('password field is invalid. disabled button', () => {
      renderOnlyIdField();

      expect(screen.getByDisplayValue('id'))
        .toHaveAttribute('aria-invalid', 'false');
      expect(screen.getByPlaceholderText('PASSWORD'))
        .toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByRole('button', { name: 'Log in' }))
        .toBeDisabled();
    });

    it('can not click login button', () => {
      renderOnlyIdField();

      expect(handleClick).not.toBeCalled();

      fireEvent.click(screen.getByRole('button'));

      expect(handleClick).not.toBeCalled();
    });
  });

  context('without all fields', () => {
    it('all field is invalid. disabled button', () => {
      renderLogin({});

      screen.getAllByRole('textbox').forEach((input) => {
        expect(input).toHaveAttribute('aria-invalid', 'true');
      });
      expect(screen.getByRole('button', { name: 'Log in' })).toBeDisabled();
    });
  });

  context('when change input', () => {
    it('called onChangeId', () => {
      renderLogin({});

      expect(handleChangeId).not.toBeCalled();

      fireEvent.change(
        screen.getByPlaceholderText('ID'),
        { target: { value: 'id' } },
      );

      expect(handleChangeId).toBeCalled();
    });

    it('called onChangeId', () => {
      renderLogin({});

      expect(handleChangePassword).not.toBeCalled();

      fireEvent.change(
        screen.getByPlaceholderText('PASSWORD'),
        { target: { value: 'password' } },
      );

      expect(handleChangePassword).toBeCalled();
    });
  });
});
