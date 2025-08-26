import { Star, StarHalf, Star as StarOutline } from "lucide-react";

interface StarRatingProps {
    reviewAverage: number; // 예: 3.7
}

export default function StarRating({ reviewAverage }: StarRatingProps) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (reviewAverage >= i) {
            // 꽉 찬 별
            stars.push(<Star key={i} className="text-[#4A6920] w-8 h-8 inline-block text-4xl" fill="currentColor" />);
        } else if (reviewAverage >= i - 0.5) {
            // 반 별
            stars.push(<StarHalf key={i} className="text-[#4A6920] w-8 h-8 inline-block text-4xl" fill="currentColor" />);
        }
    }
    return <span className="inline-flex gap-x-8">{stars}</span>;
}