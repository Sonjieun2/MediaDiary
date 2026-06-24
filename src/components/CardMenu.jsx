import { useCommentary } from '../context/CommentaryContext'
import Card from './Card'

export default function CardMenu() {
  const { commentaries } = useCommentary()

  return (
    <div className="flex flex-col justify-center">
      <div className="grid grid-cols-5 gap-6 justify-items-center">
        {commentaries.map((commentary) => (
          <Card
            key={commentary.id}
            commentary={commentary}
          />
        ))}
      </div>
    </div>
  )
}