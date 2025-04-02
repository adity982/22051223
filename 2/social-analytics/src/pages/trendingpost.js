import React, { useEffect, useState } from "react";
import { getUsers, getUserPosts, getPostComments } from "../api/socialAPI";

const TrendingPosts = () => {
    const [trendingPosts, setTrendingPosts] = useState([]);

    useEffect(() => {
        const fetchTrendingPosts = async () => {
            const users = await getUsers();
            let postCommentCounts = [];

            for (const userId in users) {
                const posts = await getUserPosts(userId);

                for (const post of posts) {
                    const comments = await getPostComments(post.id);
                    postCommentCounts.push({ ...post, commentCount: comments.length });
                }
            }

            // Find the maximum comment count
            const maxComments = Math.max(...postCommentCounts.map(post => post.commentCount), 0);
            
            // Filter posts with max comments
            setTrendingPosts(postCommentCounts.filter(post => post.commentCount === maxComments));
        };

        fetchTrendingPosts();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Trending Posts</h2>
            {trendingPosts.map(post => (
                <div key={post.id} className="mb-4 p-2 border rounded">
                    <h3 className="font-bold">{post.title}</h3>
                    <p>{post.body}</p>
                    <p className="text-sm text-gray-600">Comments: {post.commentCount}</p>
                </div>
            ))}
        </div>
    );
};

export default TrendingPosts;
