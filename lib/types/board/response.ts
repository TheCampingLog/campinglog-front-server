export interface ResponseGetBoardByCategory {
  boardId: string;
  title: string;
  content: string;
  categoryName: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  boardImage: string;
  createAt: string;
}

export interface ResponseGetBoardRank {
  boardId: string;
  boardImage: string;
  title: string;
  nickname: string;
  rank: number;
  viewCount: number;
}
