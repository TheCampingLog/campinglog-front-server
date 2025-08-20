import useSWR from "swr";
import fetcher from "@/lib/utils/fetcher";
import { ResponseGetBoardRank } from "@/lib/types/board/response";
import { backendUrl } from "@/lib/config";

function useBoardRankList() {
  const { isLoading, data, error, mutate } = useSWR<ResponseGetBoardRank[]>(
    backendUrl + `/api/boards/rank`,
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
