"use client";

import useBoards from "@/lib/hooks/board/useBoard";

interface BoardFragmentProps {
  boardId: string;
}

function BoardFragment(props: BoardFragmentProps) {
  const { boardId } = props;

  const { isLoading, board, error } = useBoards(boardId);

  if (isLoading || !board) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error!</div>;
  }

  return (
    <div>
      <div>{board.title}</div>
      <div>{board.content}</div>
      <div>{board.categoryName}</div>
      <div>{board.viewCount}</div>
      <div>{board.likeCount}</div>
      <div>{board.commentCount}</div>
      <div>{board.boardImage}</div>
      <div>{board.createAt}</div>
    </div>
  );
}

export default BoardFragment;
