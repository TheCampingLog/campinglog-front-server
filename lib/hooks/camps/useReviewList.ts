import { ResponseGetReviewList } from "@/lib/types/camps/response";
import { useEffect, useState } from "react";


function useBoardReview(mapX: string, mapY: string) {
    const [reviewList, setBoardReview] = useState<ResponseGetReviewList | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBoardReview = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/camps/reviews/${mapX}/${mapY}`);
                if (!response.ok) throw new Error(`리뷰 로드 실패: ${response.statusText}`);
                const data = await response.json();
                setBoardReview(data);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        if (mapX && mapY) fetchBoardReview();
    }, [mapX, mapY]);

    return { reviewList, isLoading, error };
}
export default useBoardReview;