import { createContext, useContext, useEffect, useState } from 'react'

const CategoryContext = createContext()

const defaultCategory = [
  { label: '영화', fields: ['runningTime', 'platform', 'seat', 'format'] },
  { label: '드라마', fields: ['episode', 'platform', 'company'] },
  { label: '애니메이션', fields: ['episode', 'platform', 'company'] },
]

export function CategoryProvider({ children }) {
  const [category, setCategory] = useState(() => {
    const saved = localStorage.getItem('category')

    return saved ? JSON.parse(saved) : defaultCategory
  })

  useEffect(() => {
    localStorage.setItem(
      'category',
      JSON.stringify(category)
    )
  }, [category])

  return (
    <CategoryContext.Provider
      value={{category, setCategory}}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategory = () => 
  useContext(CategoryContext)