export interface Categories {
  id: string;
  name: string;
  slug: string;
  posts: Array<{}>
};

export interface PostProps {
  title: string;
  slug: string;
  createdAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
  visitCount: number;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}
