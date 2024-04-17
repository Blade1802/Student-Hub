import { useNavigate } from "react-router-dom";

const StudentItem = ({ student }) => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <style>
        {`
          .clickable-hover:hover {
            text-decoration: underline;
          }
        `}
      </style>
      <div
        className="card my-3"
        style={{ width: "65%", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}
      >
        <div className="card-body p-4">
          <h5 className="card-title text-primary">{student.name}</h5>
          <p className="card-text text-secondary">{student.id}</p>
          <hr />
          <div className="row">
            <div className="col-md-6">
              <strong>Date of Birth</strong>
              <p>
                {new Date(student.dateOfBirth).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="col-md-6">
              <strong>Email</strong>
              <p className="text-primary">{student.email}</p>
            </div>
            <div className="col-md-6">
              <strong>Academic Unit</strong>
              <p
                className="text-primary clickable-hover"
                style={{ cursor: "pointer" }}
                onClick={() => handleSearch(student.academicUnit)}
              >
                {student.academicUnit}
              </p>
            </div>
            <div className="col-md-6">
              <strong>Location</strong>
              <p
                className="text-primary clickable-hover"
                style={{ cursor: "pointer" }}
                onClick={() => handleSearch(student.location)}
              >
                {student.location}
              </p>
            </div>
            <div className="col-md-6">
              <strong>Last Term of Enrollment</strong>
              <p className="text-primary">{student.lastTermOfEnrollment}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentItem;
