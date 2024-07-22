function Comment({ comment }) {
  const hasParams = () => {
    return comment.id && comment.text && comment.avatar && comment.name;
  };
  return (
    <>
      {hasParams() && (
        <div className="cat-grid cat-grid-6 cat-mt-s comment cat-p-s cat-radius-s cat-items-center">
          <div className="cat-text-center">
            <cat-avatar src={comment.avatar} label="avatar" round></cat-avatar>
            <div className="cat-mt-xs">{comment.name}</div>
          </div>
          <div className="cat-ml-m cat-grid-col-5">{comment.text}</div>
        </div>
      )}
      {!hasParams() && (
        <div className=" comment cat-p-s cat-radius-s cat-items-center">
          {" "}
          Something went wrong with the loading of the comment
        </div>
      )}
    </>
  );
}

export default Comment;
