import BoardsRank from "@/components/board/BoardsRank";
import BoardReviewRankList from "@/components/campinfo/BoardReviewRankList";
import MembersRank from "@/components/member/MembersRank";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <BoardsRank />
          </div>

          <div className="col-span-1">
            <MembersRank />
          </div>
        </div>

        <BoardReviewRankList />
      </div>
    </div>
  );
}
