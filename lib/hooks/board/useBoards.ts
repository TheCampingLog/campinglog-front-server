import useSWR from "swr";
import fetcher from "@/lib/utils/fetcher";
import { ResponseGetBoardByCategory } from "@/lib/types/board/response";

function useBoards() {
  const { isLoading, data, error, mutate } = useSWR<
    ResponseGetBoardByCategory[]
  >(`/api/boards`, fetcher);

  return {
    isLoading,
    board: data,
    error,
    mutate,
  };
}

export default useBoards;
