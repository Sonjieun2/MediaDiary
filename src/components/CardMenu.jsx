import Card from './Card'

export default function CardMenu() {
  return (
    <div className="flex flex-col justify-center">
      <div className="grid grid-cols-4 gap-6 justify-items-center">
        <Card />
      </div>
    </div>
  )
}