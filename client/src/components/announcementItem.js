import { useEffect, useState } from "react";
import { fetchAnnouncements } from "../api/announcements";
import AnnouncementDisplayModel from "./announcementDisplayModel";

const Announcement = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchAnnouncementList = async () => {
      try {
        const response = await fetchAnnouncements();

        const sortedAnnouncements = response.data.announcements.sort(
          (b, a) => new Date(a.createdat) - new Date(b.createdat)
        );
        setItems(sortedAnnouncements.slice(0, 2)); // Keep only the first 2
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnnouncementList();
  }, []);

  return (
    <div className="d-flex flex-row">
      {items.map((item) => (
        <div key={item.id}>
          <div
            className="card mx-1 my-2 rounded-4 position-relative"
            data-bs-toggle="modal"
            data-bs-target={`#announcementModal-${item.id}`}
          >
            <div className="bg-dark bg-opacity-50 position-absolute top-0 start-0 w-100 h-100 rounded-4"></div>
            <img
              src={`http://localhost:4000/${item.image_url.replace("\\", "/")}`}
              className="card-img rounded-4"
              alt={item.title}
            />
            <div className="card-img-overlay d-flex flex-column justify-content-end">
              <h5 className="card-title text-white ms-1">{item.title}</h5>
            </div>
          </div>

          <AnnouncementDisplayModel announcement={item} />
        </div>
      ))}
    </div>
  );
};

export default Announcement;
