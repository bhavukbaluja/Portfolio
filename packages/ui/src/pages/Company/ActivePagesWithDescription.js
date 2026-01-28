import { useEffect, useState } from "react";
import axios from "axios";

const ActivePagesWithDescriptions = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const { data: allActivePages } = await axios.get("/allActive");

        // Fetch full page data (with description) for each page
        const fullPagesPromises = allActivePages.map((page) =>
          axios.get(`/getPageData`, { params: { id: page.id } }).then(res => res.data)
        );

        const fullPages = await Promise.all(fullPagesPromises);
        setPages(fullPages);
      } catch (error) {
        console.error("Error fetching page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {pages.map((page) => (
        <div key={page.id}>
          <h3>{page.name}</h3>
          <p>Status: {page.status}</p>
          <p>{page.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ActivePagesWithDescriptions;
