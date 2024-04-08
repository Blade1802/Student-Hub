import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Sidebar from "../components/searchSidebar";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Extracted data fetching logic
  const fetchStudents = async (query) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate fetching students based on the query
      // Replace this with actual fetch call to API
      const fetchedStudents = await new Promise((resolve, reject) =>
        setTimeout(() => resolve([{ name: "John Doe", id: 1 }]), 1000)
      );
      setStudents(fetchedStudents.length > 0 ? fetchedStudents : []);
    } catch (err) {
      setError("Failed to fetch students. Please try again later.");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchStudents(query);
    } else {
      setStudents([]);
    }
  }, [query]);

  return (
    <>
      <Navbar />
      <div className="container-fluid p-0">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <div>Error: {error}</div>
        ) : students.length > 0 ? (
          <div className="d-flex" id="wrapper">
            <Sidebar
              studentCount={2}
              peopleCount={0}
              tasksCount={1}
              articlesCount={0}
            />
            <h2>Search Results for "{query}"</h2>
            <ul>
              {students.map((student) => (
                <li key={student.id}>{student.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No students found for query: {query || "Empty query"}</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchResultsPage;
