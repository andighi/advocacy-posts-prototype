function LikedBySection({ post }) {
  /** If the array is more than four, slices a copy
   * then counts the remaining elements and
   * pushes it into the array
   */
  const likedByList = () => {
    const likedBy = [...post.likedBy].slice(0, 4);

    if (post.likedBy.length > 4) {
      likedBy.push(`and ${post.likedBy.length - 4} others`);
    }

    return likedBy.map(
      (person, i, self) => `${person}${i !== self.length - 1 ? ", " : "."}`
    );
  };

  /** Renders the according text based on
   * liked by and liked params */
  const renderElements = () => {
    if (!post.likedBy.length) {
      if (post.liked) {
        return <span>Liked by You.</span>;
      } else {
        return <span>No one liked this post yet.</span>;
      }
    } else {
      if (post.liked) {
        return <span>Liked by You, {likedByList()}</span>;
      } else {
        return <span>Liked by {likedByList()}</span>;
      }
    }
  };

  return (
    <>
      <div className="cat-flex cat-items-center cat-text-xs">
        <span className={post.liked ? "cat-mr-s cat-text-primary" : "cat-mr-s"}>
          <cat-icon icon="thumbs-up-outlined" size="s" />
        </span>

        <span data-testid={"liked-by" + post.postId}>{renderElements()}</span>
      </div>
    </>
  );
}

export default LikedBySection;
