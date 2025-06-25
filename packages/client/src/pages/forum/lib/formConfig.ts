export const createTopicProps = {
  description: 'Создать топик',
  inputs: [
    { type: 'text', id: 'title', label: 'Заголовок', name: 'title' },
    { type: 'textarea', id: 'content', label: 'Содержание', name: 'content' },
  ],
  buttonText: 'Создать',
  href: '/forum',
  linkText: 'К списку топиков',
}

export const createCommentProps = {
  description: 'Добавить комментарий',
  inputs: [
    { type: 'textarea', id: 'content', label: 'Комментарий', name: 'content' },
  ],
  buttonText: 'Отправить',
  href: '', // Можно оставить пустым, если не требуется переход
  linkText: '',
}
