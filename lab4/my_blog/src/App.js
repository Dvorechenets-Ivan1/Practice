import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import blogData from "./data/blogs.json";
import "./App.css"; 

const BlogList = () => {
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;

  useEffect(() => {
    let blogsToDisplay = blogData;

    if (searchQuery) {
      blogsToDisplay = blogsToDisplay.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOrder === "recent") {
      blogsToDisplay = blogsToDisplay.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; 
      });
    } else if (sortOrder === "alphabetical") {
      blogsToDisplay = blogsToDisplay.sort((a, b) => {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase()); 
      });
    }

    setFilteredBlogs(blogsToDisplay);
  }, [searchQuery, sortOrder]);

  const lastPostIndex = currentPage * blogsPerPage;
  const firstPostIndex = lastPostIndex - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(firstPostIndex, lastPostIndex);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="container">
      <h1>Blog</h1>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <select onChange={(e) => setSortOrder(e.target.value)} className="sort-select">
        <option value="recent">By Date</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
      <button className="filter-button">
        <Link to="/filter" className="filter-link">Category Filter</Link>
      </button>
      <div className="blog-list">
        {currentBlogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <h2><Link to={`/blog/${blog.id}`} className="no-underline">{blog.title}</Link></h2>
            <p>{blog.category} | {new Date(blog.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

const CategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredBlogs, setFilteredBlogs] = useState(blogData);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;

  useEffect(() => {
    let blogsToDisplay = blogData;
    if (selectedCategory !== "All") {
      blogsToDisplay = blogData.filter((blog) => blog.category === selectedCategory);
    }
    setFilteredBlogs(blogsToDisplay);
  }, [selectedCategory]);

  const lastPostIndex = currentPage * blogsPerPage;
  const firstPostIndex = lastPostIndex - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(firstPostIndex, lastPostIndex);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="container">
      <h1>Category Filter</h1>
      <select onChange={(e) => setSelectedCategory(e.target.value)} className="category-select">
        <option value="All">All Categories</option>
        <option value="Design">Design</option>
        <option value="Product">Product</option>
        <option value="Software Engineering">Software Engineering</option>
        <option value="Artificial Intelligence">Artificial Intelligence</option>
        <option value="Cloud Technology">Cloud Technology</option>
        <option value="Cybersecurity">Cybersecurity</option>
        <option value="Data Science">Data Science</option>
        <option value="Mobile Development">Mobile Development</option>
        <option value="Technology Trends">Technology Trends</option>
      </select>
      <div className="blog-list">
        {currentBlogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <h2><Link to={`/blog/${blog.id}`} className="no-underline">{blog.title}</Link></h2>
            <p>{blog.category} | {new Date(blog.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
      <Link to="/" className="back-link">Back</Link>
    </div>
  );
};

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === parseInt(id));

  if (!blog) {
    return <h2>Post not found</h2>;
  }

  return (
    <div className="container">
      <h1>{blog.title}</h1>
      <p>{blog.category} | {new Date(blog.date).toLocaleDateString()}</p>
      <p>{blog.content}</p>
      <Link to="/" className="back-link">Back to list</Link>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/filter" element={<CategoryFilter />} />
      </Routes>
    </Router>
  );
};

export default App;
