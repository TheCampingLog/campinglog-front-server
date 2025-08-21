export interface ResponseGetBoardReviewRank {
  reviewAverage: number;
  firstImageUrl: string;
  doNm: string;
  sigunguNm: string;
  mapX: string;
  mapY: string;
  facltNm: string;
}

export interface ResponseGetBlahList {
  reviews: string[];
}

export interface ResponseGetCampLatestList {
  facltNm: string;
  doNm: string;
  sigunguNm: string;
  addr1: string;
  addr2: string;
  mapX: string;
  mapY: string;
  tel: string;
  sbrsCl: string;
  firstImageUrl: string;
  totalCount: number;
}