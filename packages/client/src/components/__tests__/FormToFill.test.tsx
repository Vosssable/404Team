import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import FormToFill from '../FormToFill'

// Мокаем валидацию
jest.mock('../../hooks/Validation', () => ({
  Validation: {
    validate: jest.fn(() => true),
    setError: jest.fn(),
  },
}))

jest.mock('../../hooks/ValidationHook', () => ({
  validationHook: jest.fn(() => true),
}))

// Мокаем OAuthButton
jest.mock('../oauth-button/OAuthButton', () => ({
  OAuthButton: () => <div data-testid="oauth-button">OAuth Button</div>,
}))

// Импортируем мок для использования в тестах
import { Validation } from '../../hooks/Validation'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('FormToFill', () => {
  const defaultProps = {
    description: 'Тестовая форма',
    inputs: [
      { type: 'text', id: 'name', label: 'Имя', name: 'name' },
      { type: 'email', id: 'email', label: 'Email', name: 'email' },
    ],
    buttonText: 'Отправить',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('должен рендерить форму с правильным заголовком', () => {
    renderWithRouter(<FormToFill {...defaultProps} />)

    expect(screen.getByText('Тестовая форма')).toBeInTheDocument()
  })

  it('должен рендерить все поля ввода', () => {
    renderWithRouter(<FormToFill {...defaultProps} />)

    expect(screen.getByLabelText('Имя')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('должен рендерить кнопку отправки', () => {
    renderWithRouter(<FormToFill {...defaultProps} />)

    const submitButton = screen.getByRole('button', { name: 'Отправить' })
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toHaveAttribute('type', 'submit')
  })

  it('должен применять правильные классы к форме', () => {
    renderWithRouter(<FormToFill {...defaultProps} />)

    const form = screen
      .getByText('Тестовая форма')
      .closest('.card')
      ?.querySelector('form')
    expect(form).toBeInTheDocument()

    const card = screen.getByText('Тестовая форма').closest('.card')
    expect(card).toHaveClass('tofill__block')
  })

  it('должен рендерить ссылку когда передан href', () => {
    const propsWithLink = {
      ...defaultProps,
      href: '/login',
      linkText: 'Уже есть аккаунт?',
    }

    renderWithRouter(<FormToFill {...propsWithLink} />)

    const link = screen.getByText('Уже есть аккаунт?')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/login')
  })

  it('должен рендерить OAuth кнопку когда showOAuth=true', () => {
    const propsWithOAuth = {
      ...defaultProps,
      showOAuth: true,
    }

    renderWithRouter(<FormToFill {...propsWithOAuth} />)

    expect(screen.getByTestId('oauth-button')).toBeInTheDocument()
  })

  it('не должен рендерить OAuth кнопку когда showOAuth=false', () => {
    renderWithRouter(<FormToFill {...defaultProps} />)

    expect(screen.queryByTestId('oauth-button')).not.toBeInTheDocument()
  })

  it('должен вызывать onSubmit при отправке формы', async () => {
    const mockOnSubmit = jest.fn()
    const propsWithSubmit = {
      ...defaultProps,
      onSubmit: mockOnSubmit,
    }

    renderWithRouter(<FormToFill {...propsWithSubmit} />)

    const form = screen
      .getByText('Тестовая форма')
      .closest('.card')
      ?.querySelector('form')
    form && fireEvent.submit(form)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    })
  })

  it('должен применять валидацию при blur событии', () => {
    renderWithRouter(<FormToFill {...defaultProps} />)

    const nameInput = screen.getByLabelText('Имя')
    fireEvent.blur(nameInput)

    expect(Validation.validate).toHaveBeenCalledWith(nameInput)
  })

  it('должен рендерить поля с правильными атрибутами', () => {
    renderWithRouter(<FormToFill {...defaultProps} />)

    const nameInput = screen.getByLabelText('Имя')
    expect(nameInput).toHaveAttribute('type', 'text')
    expect(nameInput).toHaveAttribute('id', 'name')
    expect(nameInput).toHaveAttribute('name', 'name')

    const emailInput = screen.getByLabelText('Email')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveAttribute('id', 'email')
    expect(emailInput).toHaveAttribute('name', 'email')
  })

  it('должен иметь правильную структуру DOM', () => {
    renderWithRouter(<FormToFill {...defaultProps} />)

    const card = screen.getByText('Тестовая форма').closest('.card')
    expect(card).toHaveClass('tofill__block')

    const wrapper = card?.querySelector('.tofill__wrapper')
    expect(wrapper).toBeInTheDocument()

    const heading = wrapper?.querySelector('.tofill__heading')
    expect(heading).toHaveTextContent('Тестовая форма')

    const form = wrapper?.querySelector('form')
    expect(form).toBeInTheDocument()
  })

  it('должен работать с разными типами полей', () => {
    const propsWithDifferentTypes = {
      description: 'Форма с разными полями',
      inputs: [
        { type: 'text', id: 'text', label: 'Текст', name: 'text' },
        { type: 'password', id: 'password', label: 'Пароль', name: 'password' },
        { type: 'email', id: 'email', label: 'Email', name: 'email' },
        { type: 'tel', id: 'phone', label: 'Телефон', name: 'phone' },
      ],
      buttonText: 'Сохранить',
    }

    renderWithRouter(<FormToFill {...propsWithDifferentTypes} />)

    expect(screen.getByLabelText('Текст')).toHaveAttribute('type', 'text')
    expect(screen.getByLabelText('Пароль')).toHaveAttribute('type', 'password')
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText('Телефон')).toHaveAttribute('type', 'tel')
  })
})
