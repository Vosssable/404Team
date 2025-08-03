import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import HomeCard from '../HomeCard'

// Обертка для компонентов с роутингом
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('HomeCard', () => {
  const defaultProps = {
    title: 'Тестовая карточка',
    text: 'Описание карточки',
    buttonText: 'Нажми меня',
    link: '/test',
  }

  it('должен рендерить карточку с правильным содержимым', () => {
    renderWithRouter(<HomeCard {...defaultProps} />)

    expect(screen.getByText('Тестовая карточка')).toBeInTheDocument()
    expect(screen.getByText('Описание карточки')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Нажми меня' })
    ).toBeInTheDocument()
  })

  it('должен иметь правильную структуру DOM', () => {
    renderWithRouter(<HomeCard {...defaultProps} />)

    const card = screen.getByText('Тестовая карточка').closest('.card')
    expect(card).toHaveClass('custom-card', 'text-center', 'shadow')

    const cardBody = card?.querySelector('.card-body')
    expect(cardBody).toBeInTheDocument()

    const title = cardBody?.querySelector('.card-title')
    expect(title).toHaveTextContent('Тестовая карточка')

    const text = cardBody?.querySelector('.card-text')
    expect(text).toHaveTextContent('Описание карточки')
  })

  it('должен содержать ссылку с правильным href', () => {
    renderWithRouter(<HomeCard {...defaultProps} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test')
  })

  it('должен применять правильные классы к кнопке', () => {
    renderWithRouter(<HomeCard {...defaultProps} />)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('btn', 'btn-light', 'button__bgc')
  })

  it('должен работать с разными пропсами', () => {
    const customProps = {
      title: 'Другая карточка',
      text: 'Другое описание',
      buttonText: 'Другая кнопка',
      link: '/another',
    }

    renderWithRouter(<HomeCard {...customProps} />)

    expect(screen.getByText('Другая карточка')).toBeInTheDocument()
    expect(screen.getByText('Другое описание')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Другая кнопка' })
    ).toBeInTheDocument()

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/another')
  })

  it('должен рендерить кнопку внутри ссылки', () => {
    renderWithRouter(<HomeCard {...defaultProps} />)

    const link = screen.getByRole('link')
    const button = link.querySelector('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Нажми меня')
  })

  it('должен иметь правильную иерархию элементов', () => {
    renderWithRouter(<HomeCard {...defaultProps} />)

    const card = screen.getByText('Тестовая карточка').closest('.card')
    const cardBody = card?.querySelector('.card-body')
    const link = cardBody?.querySelector('a')
    const button = link?.querySelector('button')

    expect(card).toBeInTheDocument()
    expect(cardBody).toBeInTheDocument()
    expect(link).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })
})
