

function PostCard({ comment }) {

    return (
        <>
            <div className="cat-flex cat-mt-s comment cat-p-s cat-radius-s" key={comment.text} >
                <div className="cat-flex cat-items-center">
                    <div className="cat-text-center" >
                        <cat-avatar src={comment.avatar} label="avatar" round></cat-avatar>
                        <div className="cat-mt-xs" >{comment.name}</div>
                    </div>
                    <div className="cat-ml-m">
                        {comment.text}
                    </div>

                </div>
            </div>
        </>
    )
}

export default PostCard
