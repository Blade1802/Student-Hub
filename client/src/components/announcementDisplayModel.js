const AnnouncementDisplayModel = ({ announcement }) => {
  return (
    <>
      <div
        className="modal fade"
        id={`announcementModal-${announcement.id}`}
        tabIndex="-1"
        aria-labelledby="announcementModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="taskModalLabel">
                {announcement.title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>{announcement.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementDisplayModel;
