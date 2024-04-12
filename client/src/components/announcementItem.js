import { useEffect, useState } from "react";
import { fetchAnnouncements } from "../api/announcements";

const Announcement = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchAnnouncementList = async () => {
      try {
        const response = await fetchAnnouncements();

        const sortedTasks = response.data.announcements.sort(
          (b, a) => new Date(a.createdat) - new Date(b.createdat)
        );
        setItems(sortedTasks.slice(0, 2)); // Keep only the first 2 tasks
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnnouncementList();
  }, []);

  return (
    <div className="d-flex flex-row">
      {items.map((item) => (
        <div
          key={item.id}
          className="card mx-1 my-2 rounded-4 position-relative"
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
      ))}
    </div>
  );
};

export default Announcement;
