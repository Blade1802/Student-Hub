import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearchResults } from "../api/search";
import Loading from "../components/loading";
import Sidebar from "../components/searchSidebar";
import StudentItem from "../components/searchStudentItem";
import TaskItem from "../components/searchTaskItem";
import Layout from "../components/layout";

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

  useEffect(() => {
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

    fetchResults();
  }, [query]);

  return (
    <Layout>
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
          <div className="container-fluid bg-white p-5 min-vh-100">
            {loading ? (
              <Loading />
            ) : error ? (
              <div>Error: {error}</div>
            ) : results.students?.length ||
              results.people?.length ||
              results.tasks?.length ||
              results.articles?.length ? (
              <>
                {(selectedCategory === "all" ||
                  selectedCategory === "student") &&
                  results.students &&
                  results.students.length > 0 && (
                    <>
                      <strong className="fs-4">Student</strong>
                      {results.students.map((student) => (
                        <StudentItem key={student.id} student={student} />
                      ))}
                    </>
                  )}

                {(selectedCategory === "all" ||
                  selectedCategory === "people") &&
                  results.people &&
                  results.people.length > 0 && (
                    <>
                      {selectedCategory === "all" && (
                        <hr className="my-4" style={{ width: "65%" }} />
                      )}
                      <strong className="fs-4">People</strong>
                      <ul>
                        {results.people.map((person) => (
                          <li key={person._id}>{person.name}</li> // Assuming structure is similar
                        ))}
                      </ul>
                    </>
                  )}

                {(selectedCategory === "all" || selectedCategory === "tasks") &&
                  results.tasks &&
                  results.tasks.length > 0 && (
                    <>
                      {selectedCategory === "all" && (
                        <hr className="my-4" style={{ width: "65%" }} />
                      )}
                      <strong className="fs-4">Tasks and Reports</strong>
                      {results.tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                      ))}
                    </>
                  )}

                {(selectedCategory === "all" ||
                  selectedCategory === "articles") &&
                  results.articles &&
                  results.articles.length > 0 && (
                    <>
                      {selectedCategory === "all" && (
                        <hr className="my-4" style={{ width: "65%" }} />
                      )}
                      <strong className="fs-4">Articles</strong>
                      <ul>
                        {results.articles.map((article) => (
                          <li key={article._id}>{article.title}</li> // Adjust according to actual structure
                        ))}
                      </ul>
                    </>
                  )}
              </>
            ) : (
              <strong className="fs-4">
                No results found for query: {query || "Empty query"}
              </strong>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchResultsPage;
