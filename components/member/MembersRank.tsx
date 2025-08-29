// components/RankingList.tsx
"use client";

import { useState, useEffect } from "react";
import { ResponseGetRanking } from "@/lib/types/member/response";

function MembersRank() {
  const [rankings, setRankings] = useState<ResponseGetRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchRankings() {
      try {
        const response = await fetch(`/api/members/rank`);
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setRankings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchRankings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="font-bold text-sm mb-3 text-gray-700">명예의 캠핑로거</h3>
      <div className="space-y-2">
        {rankings.map((ranking, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md transition-colors"
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-600">
                {index + 1}등
              </span>
              <span className="text-sm">{ranking.memberGrade}</span>
              <span className="font-medium text-gray-700 text-sm">
                {ranking.nickname}
                {ranking.memberGrade}                
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MembersRank;
