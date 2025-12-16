import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ExternalLink, Star, User } from "lucide-react";
import { REVIEWS } from "@/lib/data";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex flex-row items-center align-middle">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "text-accent fill-accent" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default function ReviewGrid() {
  return (
    <section id="reviews">
      <div className="max-w-8xl mx-auto py-6 md:py-10 lg:py-14 px-4 md:px-8 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight mb-8 sm:text-4xl xl:text-5xl/none">
          What do our clients say?
        </h2>

        {/* Desktop - Show all reviews */}
        <section className="hidden md:block columns-1 md:columns-2 lg:columns-3 gap-6 col-auto space-y-6 ">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </section>

        {/* Mobile -- Only show 3 reviews */}
        <section className="columns-1 gap-6 col-auto space-y-6 w-full md:hidden">
          {REVIEWS.slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </section>
      </div>

      {/* <div className="flex justify-center mt-2">
        <Button variant="outline" asChild>
          <Link
            href="https://maps.app.goo.gl/mFHuGgPHYESyk8ng6"
            target="_blank"
          >
            See more reviews on Google Maps
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div> */}
    </section>
  );
}

export interface Review {
  id: number;
  rating: number;
  text: string;
  name: string;
}

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <Card key={review.id} className="w-full break-inside-avoid-column">
      <CardHeader className="flex flex-row text-sm gap-2 font-semibold text-accent items-center">
        <StarRating rating={review.rating} />
        5.0
      </CardHeader>
      <CardContent>
        <p className="text-zinc-600 text-sm">{review.text}</p>
      </CardContent>
      <CardFooter className="flex flex-row justify-between items-center">
        <span className="flex flex-row items-center gap-2">
          <User className="w-4 h-4" />
          <p>{review.name}</p>
        </span>
        <Image
          src="/logos/google.png"
          width={20}
          height={20}
          alt="Google logo"
        />
      </CardFooter>
    </Card>
  );
};
