import { PostCardData } from "../models/models";


const useUserAndPost = (users: PostCardData[], additionalData: any) => {
    let userIndex = null;
    let postIndex = null;
    const user = users.find(user => user.userId === additionalData.userId);
    if (user) {
        userIndex = users.findIndex(user => user.userId === additionalData.userId);
        const post = user.posts.find(post => post.postId === additionalData.postId);
        if (post) {
            postIndex = user.posts.findIndex(post => post.postId === additionalData.postId);
        }
    }
    return { userIndex, postIndex }
}

export { useUserAndPost };