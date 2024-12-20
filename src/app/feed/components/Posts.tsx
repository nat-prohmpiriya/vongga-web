'use client';

import React from 'react';
import Post from './Post';

const Posts = () => {
  const posts = [
    {
      user: {
        name: 'Frances Guerrero',
        role: 'Web Developer at Stackbros',
        image: 'https://picsum.photos/200?random=1',
      },
      content: "I'm thrilled to share that I've completed a graduate certificate course in project management with the president's honor roll.",
      time: '2 hours ago',
      image: 'https://picsum.photos/800/400?random=1',
      likes: 56,
      comments: 12,
      shares: 3,
      commentsList: [
        {
          user: {
            name: 'Samuel Bishop',
            image: 'https://picsum.photos/200?random=2',
          },
          content: 'Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection.',
          time: '5 hours ago',
          likes: 3,
          replies: 2,
        },
        {
          user: {
            name: 'Dennis Barrett',
            image: 'https://picsum.photos/200?random=3',
          },
          content: 'See resolved goodness felicity shy civility domestic had but Drawings offended yet answered Jennings perceive.',
          time: '2 hours ago',
          likes: 5,
        },
        {
          user: {
            name: 'Lori Ferguson',
            image: 'https://picsum.photos/200?random=4',
          },
          content: 'Wishing calling is warrant settled was lucky.',
          time: '15 minutes ago',
          likes: 0,
        },
        {
          user: {
            name: 'Judy Nguyen',
            image: 'https://picsum.photos/200?random=5',
          },
          content: 'Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection.',
          time: '4 minutes ago',
          likes: 1,
        },
      ],
    },
    // Add more posts here as needed
  ];

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
};

export default Posts;
