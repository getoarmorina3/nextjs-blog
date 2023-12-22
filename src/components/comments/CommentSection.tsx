import CreateComment from "./CreateComment";
import { serverTrpc } from "@/trpc/server";
import { formatTimeToNow } from "@/lib/utils";

interface CommentsSectionProps {
  postId: string;
}

const CommentsSection = async ({ postId }: CommentsSectionProps) => {
  const comments = await serverTrpc.comment.viewAll({ postId });
  return (
    <div className="flex flex-col gap-y-4 mt-4" id="comments">
      <hr className="w-full h-px mt-6" />
      <h2 className="text-xl font-bold mt-6 mb-4">Comments</h2>
      <div className="flex flex-col items-start justify-start mb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-y-4 border-b rounded-lg p-8 w-full">
            <div className="flex items-center gap-x-2">
              <p className="text-md font-medium">{comment.name}</p>
              <p className="max-h-40 truncate text-sm text-muted-foreground">
                {formatTimeToNow(new Date(comment.createdAt))}
              </p>
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
