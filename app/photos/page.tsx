import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Camera, Heart } from "lucide-react"

// This would typically come from a content.json file
const photos = [
  {
    id: 1,
    title: "Lexus IS 250C Front View",
    description:
      "Front angle of a Lexus IS 250C in red, showcasing its sleek coupe design.",
    image:
      "https://pyu0cnhpfktnlqct.public.blob.vercel-storage.com/1-2u0Id0XnNt4JTFr5159S3AEcrRB82W.jpg",
    alt: "Front view of a red Lexus IS 250C convertible parked outdoors",
  },
  {
    id: 2,
    title: "Lexus IS 250C Side Profile",
    image:
      "https://pyu0cnhpfktnlqct.public.blob.vercel-storage.com/2-mvDoR4JKMNeoxe9PCsqsm3eghFGXd2.jpg",
    alt: "Side profile of a Lexus IS 250C convertible with the roof down",
  },
  {
    id: 3,
    title: "Lexus IS 250C Rear View",
    image:
      "https://pyu0cnhpfktnlqct.public.blob.vercel-storage.com/3-EObEHr6JmuXCDnvBn1XZsrO3hXzNVL.jpg",
    alt: "Rear view of a Lexus IS 250C convertible showing taillights and trunk",
  },
  {
    id: 4,
    title: "Lexus IS 250C Interior",
    image:
      "https://pyu0cnhpfktnlqct.public.blob.vercel-storage.com/5-53yrbNvuTPhti0nXhM0A7tLsthPFNu.jpg",
    alt: "Interior of a Lexus IS 250C convertible focusing on seats and dashboard",
  },
  {
    id: 5,
    title: "Lexus IS 250C Dashboard",
    image:
      "https://pyu0cnhpfktnlqct.public.blob.vercel-storage.com/6-a56q7z6LKDtGclMJ2b1HobQdYuZ61Z.jpg",
    alt: "Dashboard and steering wheel of a Lexus IS 250C convertible",
  },
  {
    id: 6,
    title: "Lexus IS 250C Wheel Detail",
    image:
      "https://pyu0cnhpfktnlqct.public.blob.vercel-storage.com/7-50BCrDMQFK1fN2E8Lhq7adQgFxqCRH.jpg",
    alt: "Close-up of the alloy wheel and tire of a Lexus IS 250C convertible",
  },
];

export default function Photos() {
  return (
    <div className="space-y-8">
      <div className="ml-12 lg:ml-0 ">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
          <Camera className="w-8 h-8 text-red-500" />
          Photo Gallery
        </h1>
        <p className="text-gray-400 text-lg">Explore our collection of Lexus vehicles</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map((photo, index) => (
          <Card
            key={photo.id}
            className="card-gradient hover-lift  group overflow-hidden cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-96 w-full overflow-hidden">
              <Image
                src={photo.image || "/placeholder.svg"}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-2 glass-effect rounded-full">
                  <Heart className="w-4 h-4 text-red-400" />
                </div>
              </div>
            </div>

          </Card>
        ))}
      </div>
    </div>
  )
}
