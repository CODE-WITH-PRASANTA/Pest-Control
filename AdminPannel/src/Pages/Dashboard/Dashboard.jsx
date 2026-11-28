import React, { useEffect, useMemo, useState } from "react";
import DashboardOne from "../../Components/DashboardOne/DashboardOne";
import DashboardTwo from "../../Components/DashboardTwo/DashboardTwo";
import { API_BASE_URL } from "../../config/api";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [projectsCount, setProjectsCount] = useState(0);
  const [blogsCount, setBlogsCount] = useState(0);
  const [teamsCount, setTeamsCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);
  const [pendingReviewsCount, setPendingReviewsCount] = useState(0);

  useEffect(() => {
    let ignore = false;
    const loadDashboard = async () => {
      try {
        const [bRes, pRes, blRes, eRes, tRes, gRes, rRes] = await Promise.all([
          fetch(`${API_BASE_URL}/bookings`),
          fetch(`${API_BASE_URL}/projects`),
          fetch(`${API_BASE_URL}/blogs`),
          fetch(`${API_BASE_URL}/enquiries`),
          fetch(`${API_BASE_URL}/teams`),
          fetch(`${API_BASE_URL}/gallery`),
          fetch(`${API_BASE_URL}/blog-comments`),
        ]);
        const [bJson, pJson, blJson, eJson, tJson, gJson, rJson] = await Promise.all([
          bRes.json(),
          pRes.json(),
          blRes.json(),
          eRes.json(),
          tRes.json(),
          gRes.json(),
          rRes.json(),
        ]);
        if (!ignore) {
          if (bRes.ok && bJson.success) setBookings(bJson.data || []);
          if (pRes.ok && pJson.success) setProjectsCount((pJson.data || []).length);
          if (blRes.ok && blJson.success) setBlogsCount((blJson.data || []).length);
          if (eRes.ok && eJson.success) setEnquiries(eJson.data || []);
          if (tRes.ok && tJson.success) setTeamsCount((tJson.data || []).length);
          if (gRes.ok && gJson.success) setGalleryCount((gJson.data || []).length);
          if (rRes.ok && rJson.success) {
            setPendingReviewsCount(
              (rJson.data || []).filter((c) => c.status === "Draft").length
            );
          }
        }
      } catch {
        // Keep zero defaults if server is unreachable
      }
    };
    loadDashboard();
    return () => {
      ignore = true;
    };
  }, []);

  const stats = useMemo(
    () => [
      {
        key: "bookings",
        label: "Total Bookings",
        value: bookings.length,
        trend: bookings.length > 0 ? 12 : 0,
        up: true,
        icon: "calendar",
        mark: "calendar",
        tone: "bookings",
      },
      {
        key: "projects",
        label: "Total Projects",
        value: projectsCount,
        trend: projectsCount > 0 ? 8 : 0,
        up: true,
        icon: "layers",
        mark: "layers",
        tone: "projects",
      },
      {
        key: "orders",
        label: "Total Blogs",
        value: blogsCount,
        trend: blogsCount > 0 ? 15 : 0,
        up: true,
        icon: "cart",
        mark: "cart",
        tone: "orders",
      },
      {
        key: "enquiries",
        label: "Total Enquiries",
        value: enquiries.length,
        trend: enquiries.length > 0 ? 5 : 0,
        up: true,
        icon: "mail",
        mark: "mail",
        tone: "enquiries",
      },
    ],
    [bookings.length, projectsCount, blogsCount, enquiries.length]
  );

  return (
    <div>
      <DashboardOne stats={stats} />
      <DashboardTwo
        bookings={bookings}
        enquiries={enquiries}
        summary={{
          teams: teamsCount,
          gallery: galleryCount,
          projects: projectsCount,
          blogs: blogsCount,
          pendingReviews: pendingReviewsCount,
        }}
      />
    </div>
  );
};

export default Dashboard;
