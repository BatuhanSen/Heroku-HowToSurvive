import React from "react";

const Post = ({ title, content, imageUrl, editPost, _id, deletePost }) => {

  return (
    <>
      <section className="post-container">
        <h2>{title}</h2>
        <p className="post-content"> {content}</p>
        <button className="button" onClick={() => editPost(_id)}>Edit</button>
        <button className="button" onClick={() => deletePost(_id)}>Delete</button>

      </section>
    </>
  );
};
export default Post;