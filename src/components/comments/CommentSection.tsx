import CreateComment from "./CreateComment";
import { serverTrpc } from "@/trpc/server";
import { formatTimeToNow } from "@/lib/utils";
import DeleteComment from "./DeleteComment";

interface CommentsSectionProps {
  postId: string;
  isBlogOwner: boolean
}

const CommentsSection = async ({ postId, isBlogOwner }: CommentsSectionProps) => {
  const comments = await serverTrpc.comment.viewAll({ postId });
  return (
    <div className="flex flex-col gap-y-4 mt-4" id="comments">
      <hr className="w-full h-px mt-6" />
      <h2 className="text-xl font-bold mt-6 mb-4">Comments</h2>
      <div className="flex flex-col items-start justify-start mb-6 max-h-96 overflow-y-auto border-b rounded-lg">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex flex-col gap-y-4 border-b p-8 w-full"
          >
            <div className="flex justify-between items-center gap-x-2">
              <div>
              <p className="text-md font-medium">{comment.name}</p>
              <p className="max-h-40 truncate text-sm text-muted-foreground">
                {formatTimeToNow(new Date(comment.createdAt))}
              </p>
              </div>
              {isBlogOwner && (
              <DeleteComment id={comment.id} />
              )}
            </div>

            <p className="text-md">{comment.text}</p>
          </div>
        ))}
      </div>

      <CreateComment postId={postId} />
    </div>
  );
};

export default CommentsSection;
