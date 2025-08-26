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

export interface ResponseGetCampWrapper<T> {
  items: T[];
  totalCount: number;
  totalPage: number;
  hasNext: boolean;
  page: number;
  size: number;
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

export interface ResponseGetCampDetail {
  facltNm: string;// 야영장명
  lineIntro: string;// 한줄소개
  intro: string;// 소개
  hvofBgnde: string;// 휴장기간 휴무기간 시작일
  hvofEnddle: string;// 휴장기간 휴무기간 종료일
  featureNm: string;// 특징
  induty: string;// 업종
  lctCl: string;// 입지구분
  addr1: string;// 주소
  addr2: string;// 주소상세
  tel: string;// 전화
  homepage: string;// 홈페이지
  resveUrl: string;// 예약 페이지
  siteBottomCl1: string;// 잔디
  siteBottomCl2: string;// 파쇄석
  siteBottomCl3: string;// 테크
  siteBottomCl4: string;// 자갈
  siteBottomCl5: string;// 맨흙
  operPdCl: string;// 운영기간
  operDeCl: string;// 운영일
  toiletCo: string;// 화장실 개수
  swrmCo: string;// 샤워실 개수
  wtrplCo: string;// 개수대 개수
  sbrsCl: string;// 부대시설
  firstImageUrl: string;// 대표이미지
  animalCmgCl: string;// 애완동물 출입
  eqpmnLendCl: string;// 캠핑장비 대여
  posblFcltyCl: string;// 주변 이용가능시설
  doNm: string;
  sigunguNm: string;
}