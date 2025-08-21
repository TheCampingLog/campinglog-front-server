import useSWR from "swr";
import fetcher from "@/lib/utils/fetcher";
import { backendUrl } from "@/lib/config";
import { ResponseGetCampLatestList } from "@/lib/types/camps/response";

function useCampLatestList(pageNo: number) {
  const { isLoading, data, error, mutate } = useSWR<ResponseGetCampLatestList[]>(
    `${backendUrl}/api/camps/list/${pageNo}`,
    fetcher
  );

  return {
    isLoading,
    campLatestList: data,
    error,
    mutate,
  };
}
export default useCampLatestList;