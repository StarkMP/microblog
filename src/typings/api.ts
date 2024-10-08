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

export type APICommentModel = {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
};

export type APIGetCommentsResponse = {
  comments: APICommentModel[];
  total: number;
  skip: number;
  limit: number;
};

export type APIGetPostsResponse = {
  posts: APIPostModel[];
  total: number;
  skip: number;
  limit: number;
};

export type APIUserResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type APIAuthResponse = APIUserResponse & {
  token: string;
  refreshToken: string;
};

export type APIRefreshTokenResponse = {
  token: string;
  refreshToken: string;
};

export type APIGetTagsResponse = string[];
