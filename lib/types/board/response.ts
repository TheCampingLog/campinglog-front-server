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
