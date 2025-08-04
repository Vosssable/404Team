import styles from './ForumPage.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { mockTopics } from './lib/mockForumData'

const ForumPage = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.forumRoot}>
      <div className={styles.forumModal}>
        <div className={styles.forumTitle}>Форум</div>
        <div className={styles.topicsHeader}>
          <span>Темы</span>
          <button
            className={styles.createTopicBtn}
            onClick={() => navigate('/forum/create')}>
            + Создать топик
          </button>
        </div>
        <div className={styles.topicsList}>
          {mockTopics.map(topic => (
            <div key={topic.id} className={styles.topicCard}>
              <Link to={`/forum/${topic.id}`} className={styles.topicLink}>
                <div className={styles.topicTitle}>{topic.title}</div>
                <div className={styles.topicMeta}>
                  {topic.author} | {topic.createdAt}
                </div>
                <div className={styles.topicPreview}>{topic.content}</div>
              </Link>

              {/* Эмодзи-реакции для топика в списке */}
              {topic.reactions && topic.reactions.length > 0 && (
                <div className={styles.topicReactionsPreview}>
                  {topic.reactions.map(reaction => (
                    <span key={reaction.id} className={styles.reactionPreview}>
                      {reaction.emoji} {reaction.count}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ForumPage
