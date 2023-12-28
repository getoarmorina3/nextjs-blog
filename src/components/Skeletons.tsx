import { Skeleton } from "@/components/ui/skeleton";

function PostSkeleton() {
  return (
    <div className="relative">
      <div className="flex flex-col gap-2 p-6 rounded-lg hover:bg-card">
        <div className="hidden md:block absolute left-0 top-6 text-muted-foreground lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]">
          <dd className="whitespace-nowrap text-sm leading-6">
            <Skeleton className="w-20 h-4" /> {/* Date placeholder */}
          </dd>
        </div>
        <div className="w-fit text-muted-foreground transition-colors hover:text-primary text-sm">
          <Skeleton className="w-20 h-4" /> {/* Category name placeholder */}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Skeleton className="w-full h-6" /> {/* Title placeholder */}
            <Skeleton className="w-full h-6" /> {/* Description placeholder */}
            <Skeleton className="w-full h-6" /> {/* Description placeholder */}
            <div className="flex gap-4 md:gap-0 flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex justify-start gap-4 items-center">
                {/* User avatar placeholder */}
                <Skeleton className="w-8 h-8 rounded-full" />
                {/* User name placeholder */}
                <Skeleton className="hidden md:block w-20 h-4" />
                {/* Date cropped placeholder */}
                <Skeleton className="block md:hidden w-20 h-4" />
              </div>
              <Skeleton className="w-20 h-4" /> {/* View count placeholder */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PostsSkeleton() {
  return (
    <div className="relative sm:pb-12 sm:ml-[calc(2rem+1px)] md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]">
      <Skeleton className="hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px sm:block bg-border mt-6" />
      <div className="space-y-8 md:space-y-16">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    </div>
  );
}
