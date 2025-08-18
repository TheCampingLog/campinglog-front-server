export interface ResponseGetRanking {
  nickName: string;
  memberGrade: MemberGrade;
}

enum MemberGrade {
  GREEN,
  BLUE,
  RED,
  BLACK,
}
