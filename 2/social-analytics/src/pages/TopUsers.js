import React, { useEffect, useState } from "react";
import { getUsers, getUserPosts } from "../api/socialAPI";

const TopUsers = () => {
    const [topUsers, setTopUsers] = useState([]);

    useEffect(() => {
        const fetchTopUsers = async () => {
            const users = await getUsers();
            const userPostCounts = [];

            for (const userId in users) {
                const posts = await getUserPosts(userId);
                userPostCounts.push({ id: userId, name: users[userId], postCount: posts.length });
            }

            // Sort users by post count in descending order and take top 5
            userPostCounts.sort((a, b) => b.postCount - a.postCount);
            setTopUsers(userPostCounts.slice(0, 5));
        };

        fetchTopUsers();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Top 5 Users</h2>
            <ul>
                {topUsers.map(user => (
                    <li key={user.id} className="mb-2">
                        {user.name} - {user.postCount} posts
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopUsers;
