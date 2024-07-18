

function PostCard() {

    return (
        <>
            <cat-card class={'cat-mb-l cat-p-l'} >
                <div className="cat-flex cat-items-center header">
                    <cat-avatar src="https://tinyurl.com/bdcu9va5" label="avatar" round></cat-avatar>
                    <div className="cat-ml-s">
                        <div>Robert</div>
                        <div className="cat-text-xs text" >4h ago</div>
                    </div>
                </div>
                <div className="cat-hr cat-mv-m"></div>

                <div className="content ">
                    <h2>Title</h2>
                    <p className="cat-mt-m">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non incidunt temporibus dolore corporis velit mollitia.</p>
                </div>
                <div className="cat-pt-m cat-pb-m">
                    <img src="https://www.telegraph.co.uk/content/dam/Travel/2019/January/greek-seaside-parga.jpg" className="post-image cat-radius-m" width={'100%'}></img>
                </div>

                <div className="likes cat-flex cat-items-center" >
                    <cat-button icon="thumbs-up-outlined" variant="text" >Like</cat-button>
                    <cat-button icon="comment-outlined" variant="text" >Comment</cat-button>
                </div>

                <div className="cat-hr cat-mv-m"></div>


                <div className="cat-flex cat-items-center cat-text-xs" >
                    <cat-button icon="thumbs-up-outlined" variant="text" size="xs" />
                    <span>You, Andreea, Corina and 12 others liked this</span>
                </div>

                <div className="cat-hr cat-mv-m"></div>

                <div className="cat-flex cat-items-center">
                    <cat-input placeholder='Write a comment...' class='input-comment' ></cat-input>
                    <cat-button icon="comment-outlined" variant="text">Comment</cat-button>
                </div>

                <div className="cat-flex cat-justify-center cat-mt-l">
                    No comments yet
                </div>
            </cat-card>
        </>
    )
}

export default PostCard
