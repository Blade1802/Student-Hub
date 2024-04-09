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
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Updated data fetching logic
  const fetchResults = async (query, category) => {
    setLoading(true);
    setError(null);
    try {
      // Simulated fetch call
      const simulateFetchAllCategories = () => ({
        student: [{ name: "John Doe", id: 1 }],
        people: [{ name: "Jane Doe", id: 2 }],
        tasks: [{ name: "Task 1", id: 3 }],
        articles: [{ title: "Article 1", id: 4 }],
      });

      let fetchedResults = await new Promise((resolve, reject) =>
        setTimeout(() => {
          const results = simulateFetchAllCategories();
          // If 'all' category is selected, combine all results, else filter by category
          if (category === "all") {
            resolve(Object.values(results).flat());
          } else {
            resolve(results[category] ?? []);
          }
        }, 1000)
      );

      setResults(fetchedResults);
      console.log(results);
    } catch (err) {
      setError("Failed to fetch results. Please try again later.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults(query, selectedCategory);
  }, [query, selectedCategory]);

  return (
    <>
      <Navbar />
      <div className="container-fluid p-0">
        <div className="d-flex" id="wrapper">
          <Sidebar
            studentCount={2}
            peopleCount={0}
            tasksCount={1}
            articlesCount={0}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <div>
            {loading ? (
              <h1>Loading...</h1>
            ) : error ? (
              <div>Error: {error}</div>
            ) : results.length > 0 ? (
              <>
                <h2>
                  Search Results for "{query}" in "{selectedCategory}"
                </h2>
                <ul>
                  {results.map((item) => (
                    <li key={item.id}>{item.name || item.title}</li>
                  ))}
                </ul>
              </>
            ) : (
              <div>No results found for query: {query || "Empty query"}</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResultsPage;
