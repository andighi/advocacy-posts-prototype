import { useDispatch } from "react-redux";
import Comment from "./Comment";
import { updateLikeAction } from "../../store/reducers/usersReducer.ts";

function PostCard({ id, name, avatar, post }) {
    const dispatch = useDispatch();

    const likedByList = () => {
        const filteredPeople = post.likedBy.reduce((acc, curr, i, self) => {
            if (i < 4) {
                acc.push(curr);
            } else if (!acc.includes("---")) {
                acc.push(`and ${self.length - i} others`, '---');
            }
            return acc;
        }, []);

        const final = filteredPeople.filter(fp => fp !== '---');

        return final.map(
            (person, i, self) => `${person}${i !== self.length - 1 ? ", " : "."}`
        );
    };

    const onClickLike = (payload) => {
        dispatch(updateLikeAction(payload));
    };

    return (
        <>
            <cat-card class={"cat-mb-l cat-p-l"}>
                {/* START HEADER */}
                <div className="cat-flex cat-items-center header">
                    <cat-avatar src={avatar} label="avatar" round></cat-avatar>
                    <div className="cat-ml-s">
                        <div>{name}</div>
                        <div className="cat-text-xs text">{post.postedAt}</div>
                    </div>
                </div>

                <div className="cat-hr cat-mv-m"></div>

                {/* START CONTENT */}
                <div>
                    <div className="content">
                        <h2>{post.title}</h2>
                        <p className="cat-mt-m">{post.text}</p>
                    </div>
                    <div className="cat-pt-m cat-pb-m">
                        <img
                            src={post.image}
                            className="post-image cat-radius-m"
                            width={"100%"}
                        ></img>
                    </div>
                </div>

                {/* ACTIONS SECTION (LIKE / COMMENT) */}
                <div className="likes cat-flex cat-items-center">
                    <cat-button
                        icon="thumbs-up-outlined"
                        variant="text"
                        color={post.liked ? "primary" : ""}
                        data-testid={"like-button" + post.postId}
                        onClick={() =>
                            onClickLike({
                                userId: id,
                                postId: post.postId,
                                liked: post.liked,
                            })
                        }
                    >
                        {post.liked ? "Liked" : "Like"}
                    </cat-button>
                    <cat-button icon="comment-outlined" variant="text">
                        Comment
                    </cat-button>
                </div>

                <div className="cat-hr cat-mv-m"></div>

                {/* START LIKED BY SECTION */}
                <div className="cat-flex cat-items-center cat-text-xs">
                    <span
                        className={post.liked ? "cat-mr-s cat-text-primary" : "cat-mr-s"}
                    >
                        <cat-icon icon="thumbs-up-outlined" size="s" />
                    </span>
                    <span data-testid={"liked-by" + post.postId}>
                        Liked by {post.liked ? "You, " : ""}
                        {likedByList()}
                    </span>
                </div>

                <div className="cat-hr cat-mv-m"></div>

                {/* START COMMENT SECTION */}
                <div className="cat-flex cat-items-center cat-mb-l">
                    <cat-input
                        placeholder="Write a comment..."
                        class="input-comment"
                    ></cat-input>
                    <cat-button
                        icon-right="true"
                        icon="arrow-right-outlined"
                        variant="text"
                    >
                        Comment
                    </cat-button>
                </div>

                {/* COMMENTS */}
                {post.comments.map((comment) => (
                    <Comment comment={comment} key={comment.id} />
                ))}
            </cat-card>
        </>
    );
}

export default PostCard;
