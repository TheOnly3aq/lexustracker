"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Camera, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

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
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(false);
  const [hasCheckedConsent, setHasCheckedConsent] = useState(false);

  useEffect(() => {
    const consentStatus = Cookies.get("cookieConsent");
    if (consentStatus) {
      const hasConsent = consentStatus === "true";
      setCookieConsent(hasConsent);
      
      if (hasConsent) {
        const savedLikes = Cookies.get("likedPhotos");
        if (savedLikes) {
          try {
            const likedIds = JSON.parse(savedLikes) as number[];
            setLikedPhotos(new Set(likedIds));
          } catch (error) {
            console.error("Error parsing liked photos from cookies:", error);
          }
        }
      }
    } else {
      setCookieConsent(null);
    }
    setHasCheckedConsent(true);
  }, []);

  useEffect(() => {
    if (cookieConsent === true && likedPhotos.size >= 0) {
      Cookies.set("likedPhotos", JSON.stringify(Array.from(likedPhotos)), {
        expires: 30, 
        sameSite: "lax", 
        secure: process.env.NODE_ENV === "production",
      });
    }
  }, [likedPhotos, cookieConsent]);

  const handleCookieConsent = (consent: boolean) => {
    setCookieConsent(consent);
    Cookies.set("cookieConsent", consent.toString(), {
      expires: 365, 
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    if (!consent) {
      setLikedPhotos(new Set());
      Cookies.remove("likedPhotos");
    }
  };

  const toggleLike = (photoId: number) => {
    if (cookieConsent !== true) return;

    setLikedPhotos((prev) => {
      const newLikedPhotos = new Set(prev);
      if (newLikedPhotos.has(photoId)) {
        newLikedPhotos.delete(photoId);
      } else {
        newLikedPhotos.add(photoId);
      }
      return newLikedPhotos;
    });
  };

  return (
    <div className="space-y-8">
      <div className="ml-12 lg:ml-0 ">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
          <Camera className="w-8 h-8 text-red-500" />
          Photo Gallery
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-lg">
            Explore our collection of Lexus vehicles
          </p>
          {cookieConsent === true && likedPhotos.size > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>{likedPhotos.size} liked</span>
            </div>
          )}
        </div>
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
              {cookieConsent === true && (
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(photo.id);
                    }}
                    className="p-2 glass-effect-cookie-banner rounded-full hover:bg-white/10 transition-colors duration-200"
                    aria-label={
                      likedPhotos.has(photo.id) ? "Unlike photo" : "Like photo"
                    }
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors duration-200 ${
                        likedPhotos.has(photo.id)
                          ? "text-red-500 fill-red-500"
                          : "text-red-400 hover:text-red-300"
                      }`}
                    />
                  </button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {hasCheckedConsent && cookieConsent === null && (
        <div 
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-20 glass-effect-cookie-banner rounded-xl p-4 sm:p-6 border border-white/10 shadow-2xl"
          style={{
            animation: 'slideInFromBottom 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards'
          }}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 hidden sm:block bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg border border-red-500/30 shrink-0">
              <Heart className="w-4 h-4 text-red-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center mb-2">
                <h3 className="text-white font-semibold text-sm sm:text-base">
                  Like Photos?
                </h3>
                <span className="inline-block ml-2 sm:hidden">
                  <Heart className="w-4 h-4 text-red-400" />
                </span>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm mb-4 leading-relaxed">
                We'd like to use cookies to remember your liked photos. No
                tracking, just your preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => handleCookieConsent(true)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover-lift"
                >
                  Allow Cookies
                </button>
                <button
                  onClick={() => handleCookieConsent(false)}
                  className="flex-1 glass-effect-cookie-banner hover:bg-white/5 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border border-white/10"
                >
                  No Thanks
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
