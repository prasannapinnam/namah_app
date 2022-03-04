import React from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function Like(props) {
  const { onLike, isLiked } = props;

  return isLiked ? (
    <FaHeart
      onClick={onLike}
      size="2em"
      color="red"
      style={{ cursor: "pointer" }}
    />
  ) : (
    <FaRegHeart onClick={onLike} size="2em" style={{ cursor: "pointer" }} />
  );
}

export default Like;
