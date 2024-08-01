export type APIPostModel = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
};

export type APIGetPostsResponse = {
  posts: APIPostModel[];
  total: number;
  skip: number;
  limit: number;
};
