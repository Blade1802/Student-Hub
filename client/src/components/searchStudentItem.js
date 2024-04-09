const DisplayItem = ({ student }) => {
  return (
    <div className="student">
      <h3>{student.name}</h3>
      <p>ID: {student.id}</p>
      <p>Email: {student.email}</p>
      <p>Academic Unit: {student.academicUnit}</p>
      <p>Location: {student.location}</p>
      <p>Last Term of Enrollment: {student.lastTermOfEnrollment}</p>
    </div>
  );
};

export default DisplayItem;
