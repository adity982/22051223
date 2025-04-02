import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TopUsers from "./pages/TopUsers";
import TrendingPosts from "./pages/TrendingPosts";
import Feed from "./pages/Feed";

const App = () => {
    return (
        <Router>
            <nav className="p-4 bg-blue-500 text-white flex space-x-4">
                <Link to="/">Top Users</Link>
                <Link to="/trending">Trending Posts</Link>
                <Link to="/feed">Feed</Link>
            </nav>
            <Routes>
                <Route path="/" element={<TopUsers />} />
                <Route path="/trending" element={<TrendingPosts />} />
                <Route path="/feed" element={<Feed />} />
            </Routes>
        </Router>
    );
};

export default App;
