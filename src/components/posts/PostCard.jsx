import Comment from './Comment';

function PostCard({ name, avatar, post }) {

    const likedByList = () => {
        const filteredPeople = post.likedBy.reduce((acc, curr, i) => {
            if (i < 3) {
                acc.push(curr);
            } else if (!acc.includes('and others')) {
                acc.push('and others');
            }
            return acc;
        }, [])

        return (
            filteredPeople.map((person, i, self) => `${person}${i !== self.length - 1 ? ', ' : '.'}`)
        )
    }

    return (
        <>
            <cat-card class={'cat-mb-l cat-p-l'} >
                {/* START HEADER */}
                <div className="cat-flex cat-items-center header">
                    <cat-avatar src={avatar} label="avatar" round></cat-avatar>
                    <div className="cat-ml-s">
                        <div>{name}</div>
                        <div className="cat-text-xs text" >{post.postedAt}</div>
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
                        <img src={post.image} className="post-image cat-radius-m" width={'100%'}></img>
                    </div>
                </div>

                {/* ACTIONS SECTION (LIKE / COMMENT) */}
                <div className="likes cat-flex cat-items-center" >
                    <cat-button icon="thumbs-up-outlined" variant="text" >Like</cat-button>
                    <cat-button icon="comment-outlined" variant="text" >Comment</cat-button>
                </div>

                <div className="cat-hr cat-mv-m"></div>

                {/* START LIKED BY SECTION */}
                <div className="cat-flex cat-items-center cat-text-xs" >
                    <cat-icon icon="thumbs-up-outlined" size="s" class={post.liked ? 'cat-mr-s cat-text-primary' : 'cat-mr-s'} />
                    <span>Liked by {post.liked ? 'You, ' : ''}{likedByList()}</span>
                </div>

                <div className="cat-hr cat-mv-m"></div>

                {/* START COMMENT SECTION */}
                <div className="cat-flex cat-items-center cat-mb-l">
                    <cat-input placeholder='Write a comment...' class='input-comment' ></cat-input>
                    <cat-button icon-right='true' icon="arrow-right-outlined" variant="text">Comment</cat-button>
                </div>

                {/* COMMENTS */}
                {post.comments.map(comment => <Comment comment={comment} key={comment.id} />)}

            </cat-card>
        </>
    )
}

export default PostCard
