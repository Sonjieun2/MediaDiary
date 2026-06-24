import { createContext, useContext, useState, useEffect } from 'react'

const CommentaryContext = createContext()

export function CommentaryProvider({ children }) {
  const [commentaries, setCommentaries] = useState(() => {
    const saved = localStorage.getItem('commentaries')
    return saved ? JSON.parse(saved) : []
  })

  // 삭제
  const deleteCommentary = (id) => {
    setCommentaries(prev =>
      prev.filter(item => item.id !== id)
    )
  }

  useEffect(() => {
    localStorage.setItem(
      'commentaries',
      JSON.stringify(commentaries)
    )
  }, [commentaries])

  return (
    <CommentaryContext.Provider
      value={{
        commentaries, setCommentaries, deleteCommentary,
      }}
    >
      {children}
    </CommentaryContext.Provider>
  )
}

export const useCommentary = () =>
  useContext(CommentaryContext)