import { useCommentary } from '../context/CommentaryContext'
import List from './List'

export default function ListMenu() {
  const { commentaries } = useCommentary()

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col gap-6 justify-items-center">
        {commentaries.map((commentary) => (
          <List
            key={commentary.id}
            commentary={commentary}
          />
        ))}
      </div>
    </div>
  )
}