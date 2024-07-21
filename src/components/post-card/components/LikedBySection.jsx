function LikedBySection({ post }) {
  const likedByList = () => {
    const filteredPeople = post.likedBy.reduce((acc, curr, i, self) => {
      if (i < 4) {
        acc.push(curr);
      } else if (!acc.includes("---")) {
        acc.push(`and ${self.length - i} others`, "---");
      }
      return acc;
    }, []);

    const final = filteredPeople.filter((fp) => fp !== "---");

    return final.map(
      (person, i, self) => `${person}${i !== self.length - 1 ? ", " : "."}`
    );
  };

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
