import { Star } from 'lucide-react'

export default function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-600 text-gray-600'}`}
        />
      ))}
    </div>
  )
}
