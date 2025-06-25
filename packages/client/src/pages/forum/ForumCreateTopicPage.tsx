import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ForumPage.module.css'
import FormToFill from '../../components/FormToFill'
import { createTopicProps } from './lib/formConfig'

const ForumCreateTopicPage = () => {
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Здесь должна быть логика создания топика (API)
    navigate('/forum')
  }

  return (
    <div className={styles.forumRoot}>
      <FormToFill {...createTopicProps} onSubmit={handleSubmit} />
    </div>
  )
}

export default ForumCreateTopicPage
