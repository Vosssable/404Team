import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '../Button'

describe('Button', () => {
  it('должен рендерить кнопку с текстом', () => {
    render(<Button>Нажми меня</Button>)

    const button = screen.getByRole('button', { name: 'Нажми меня' })
    expect(button).toBeInTheDocument()
  })

  it('должен применять переданные классы', () => {
    render(<Button className="btn btn-primary">Кнопка</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('btn', 'btn-primary')
  })

  it('должен вызывать onClick при клике', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Клик</Button>)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('должен передавать все HTML атрибуты', () => {
    render(
      <Button
        type="submit"
        disabled
        data-testid="custom-button"
        aria-label="Описание кнопки">
        Отправить
      </Button>
    )

    const button = screen.getByTestId('custom-button')
    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-label', 'Описание кнопки')
  })

  it('должен рендерить без текста', () => {
    render(<Button />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('')
  })

  it('должен рендерить с React элементами как children', () => {
    render(
      <Button>
        <span>Текст</span>
        <strong>Жирный</strong>
      </Button>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('ТекстЖирный')
    expect(button.querySelector('span')).toBeInTheDocument()
    expect(button.querySelector('strong')).toBeInTheDocument()
  })
})
