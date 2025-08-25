import useSWR from "swr";
import fetcher from "@/lib/utils/fetcher";
import { ResponseGetBoardRank } from "@/lib/types/board/response";

function useBoardRankList() {
  const key = "/api/boards/rank";
  const { isLoading, data, error, mutate } = useSWR<ResponseGetBoardRank[]>(
    key,
    fetcher
  );

  return {
    isLoading,
    boardsRank: data,
    error,
    mutate,
  };
}

export default useBoardRankList;
