export interface PostCardData {
    userId: number;
    name: string;
    avatar: string;
    posts: Post[];
}

export interface Post {
    postId: number;
    title: string;
    text: string;
    postedAt: string;
    image: string;
    likedBy: string[];
    comments: Comment[];
    liked: boolean;
}

export interface Comment {
    id: number,
    name: string;
    avatar: string;
    text: string;
}