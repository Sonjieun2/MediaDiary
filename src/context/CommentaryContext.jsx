import { createContext, useContext, useState, useEffect } from 'react'

const CommentaryContext = createContext()

export function CommentaryProvider({ children }) {
  const [commentaries, setCommentaries] = useState(() => {
    const saved = localStorage.getItem('commentaries')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem(
      'commentaries',
      JSON.stringify(commentaries)
    )
  }, [commentaries])

  return (
    <CommentaryContext.Provider value={{ commentaries, setCommentaries }}>
      {children}
    </CommentaryContext.Provider>
  )
}

export const useCommentary = () =>
  useContext(CommentaryContext)