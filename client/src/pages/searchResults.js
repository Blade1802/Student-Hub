import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearchResults } from "../api/search";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Sidebar from "../components/searchSidebar";
import StudentItem from "../components/searchStudentItem";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState({
    students: [],
    people: [],
    tasks: [],
    articles: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Updated data fetching logic
  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSearchResults(query);

      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch results. Please try again later.");
      setResults({
        students: [],
        people: [],
        tasks: [],
        articles: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [query]);

  return (
    <>
      <Navbar />
      <div className="container-fluid p-0">
        <div className="d-flex" id="wrapper">
          <Sidebar
            studentCount={results.students?.length ?? 0}
            peopleCount={results.people?.length ?? 0}
            tasksCount={results.tasks?.length ?? 0}
            articlesCount={results.articles?.length ?? 0}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <div className="container-fluid bg-light p-5">
            {loading ? (
              <h1>Loading...</h1>
            ) : error ? (
              <div>Error: {error}</div>
            ) : results.students?.length ||
              results.people?.length ||
              results.tasks?.length ||
              results.articles?.length ? (
              <>
                {results.students && results.students.length > 0 && (
                  <>
                    <dt className="fs-4">Student</dt>

                    {results.students.map((student) => (
                      <StudentItem student={student} />
                    ))}
                  </>
                )}

                {results.people && results.people.length > 0 && (
                  <>
                    <dt className="fs-4">People</dt>
                    <ul>
                      {results.people.map((person) => (
                        <li key={person._id}>{person.name}</li> // Assuming structure is similar
                      ))}
                    </ul>
                  </>
                )}

                {results.tasks && results.tasks.length > 0 && (
                  <>
                    <dt className="fs-4">Tasks</dt>
                    <ul>
                      {results.tasks.map((task) => (
                        <li key={task._id}>{task.title}</li> // Adjust according to actual structure
                      ))}
                    </ul>
                  </>
                )}

                {results.articles && results.articles.length > 0 && (
                  <>
                    <dt className="fs-4">Articles</dt>
                    <ul>
                      {results.articles.map((article) => (
                        <li key={article._id}>{article.title}</li> // Adjust according to actual structure
                      ))}
                    </ul>
                  </>
                )}
              </>
            ) : (
              <dt className="fs-4">
                No results found for query: {query || "Empty query"}
              </dt>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResultsPage;
