import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Sidebar from "../components/searchSidebar";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("student"); // new state for selected category

  // Updated data fetching logic
  const fetchResults = async (query, category) => {
    setLoading(true);
    setError(null);
    try {
      // Replace this with actual fetch call to API
      // The API call would depend on both the query and the category
      const fetchedResults = await new Promise((resolve, reject) =>
        setTimeout(
          () =>
            resolve({
              student: [{ name: "John Doe", id: 1 }],
              people: [{ name: "Johnny Doe", id: 1 }],
              tasks: [],
              articles: [],
            }),
          10
        )
      );
      setResults(fetchedResults[category] ?? []);
    } catch (err) {
      setError("Failed to fetch results. Please try again later.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchResults(query, selectedCategory);
    } else {
      setResults([]);
    }
  }, [query, selectedCategory]);

  return (
    <>
      <Navbar />
      <div className="container-fluid p-0">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <div>Error: {error}</div>
        ) : results.length > 0 ? (
          <div className="d-flex" id="wrapper">
            <Sidebar
              studentCount={2}
              peopleCount={0}
              tasksCount={1}
              articlesCount={0}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory} // Pass the function to the Sidebar
            />
            <div>
              <h2>
                Search Results for "{query}" in "{selectedCategory}"
              </h2>
              <ul>
                {results.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div>No results found for query: {query || "Empty query"}</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchResultsPage;
