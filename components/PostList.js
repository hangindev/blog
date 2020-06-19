import React from 'react';
import PostListItem from './PostListItem';

function PostList({ className, posts }) {
  return (
    <div className={className}>
      {posts.map(post => (
        <PostListItem key={post.slug} {...post} />
      ))}
    </div>
  );
}

export default PostList;
