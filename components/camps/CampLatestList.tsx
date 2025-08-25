'use client';

import { ResponseGetCampLatestList } from "@/lib/types/camps/response";

interface CampLatestListProps {
  camps: ResponseGetCampLatestList[] | undefined;
}
function CampLatestList(  { camps }: CampLatestListProps) {
  // useCampLatestList 훅 사용

  if(!camps || camps.length === 0) {
    return (
    <div className="text-center py-8">최근 캠핑장 정보가 없습니다.</div>
    );
  }

  // 이미지 둥글게 안 돼...
  return (
    <div className="mt-15 mb-10">
      <div className="flex flex-col items-center justify-center gap-6">
        {camps.map((camp, index) => (
          <div
            key={index}
            className="bg-[#FAF6F0] w-320 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="flex flex-row items-center">
              <div className="w-64 h-40 p-5 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={camp.firstImageUrl || "/image/camp-default.png"}
                  alt={camp.facltNm || "캠핑장 이미지"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h4 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2">
                  {camp.facltNm}
                </h4>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                  <span>{camp.addr1}</span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}
export default CampLatestList;