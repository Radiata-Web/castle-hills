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
    <div
      className="flex flex-row items-center align-middle"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          aria-hidden
          className={`w-4 h-4 ${
            star <= rating ? "text-accent fill-accent" : "text-zinc-300"
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
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-2">
            Social proof
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl/none">
            What do our clients say?
          </h2>
          <p className="mt-3 text-zinc-600">
            Real jobs across DFW—swipe the cards on mobile, or open Google for
            the full thread.
          </p>
        </div>

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

        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-zinc-200/90 bg-zinc-50/90 p-6 sm:flex-row sm:items-center sm:justify-between md:mt-12 md:p-8">
          <p className="text-sm text-zinc-600 md:max-w-lg">
            Showing a sample here—on Google you&apos;ll find the full set of
            reviews and photos from recent projects.
          </p>
          <Button variant="outline" className="shrink-0 sm:hover:scale-105 transition-transform" asChild>
            <Link
              href="https://maps.app.goo.gl/RteUFevUMNKuLVkv8"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more on Google
              <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
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
        <span aria-hidden>5.0</span>
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
