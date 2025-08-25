'use client';

import { ResponseGetCampLatestList } from "@/lib/types/camps/response";
import { MapPin } from "lucide-react";
import { Phone } from "lucide-react";

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
    <div className="mt-5 mb-10">
      <div className="flex flex-col items-center justify-center gap-6">
        {camps.map((camp, index) => (
          <div
            key={index}
            className="bg-[#FAF6F0] w-full rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="flex flex-row items-center">
              <div className="w-64 h-40 p-5 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={camp.firstImageUrl || "/image/camp-default.png"}
                  alt={camp.facltNm || "캠핑장 이미지"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-[#798964] rounded-lg px-2 py-1 inline-block text-white text-xs">
                    {camp.doNm} {camp.sigunguNm}
                  </div>
                  <h3 className="font-bold text-black text-lg line-clamp-2">
                    {camp.facltNm}
                  </h3>
                </div>
                <div className="flex items-center mb-2 gap-3">
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{camp.addr1}</span>
                    <span>{camp.addr2}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{camp.tel}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-500">{camp.sbrsCl}</span>
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