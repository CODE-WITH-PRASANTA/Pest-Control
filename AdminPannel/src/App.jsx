
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";

import Login from "./Components/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";

import TeamManagement from "./Components/TeamManagement/TeamManagement";
import Booking from "./Components/Booking/Booking";

import AddProjects from "./Components/AddProjects/AddProjects";
import ManageProjects from "./Components/ManageProjects/ManageProjects";

import AddGallery from "./Components/AddGallery/AddGallery";
import ManageGallery from "./Components/ManageGallery/ManageGallery";

import BlogPostig from "./Components/BlogPostig/BlogPostig";
import BlogManagement from "./Components/BlogManagement/BlogManagement";

import Order from "./Components/Order/Order";
import Enquiry from "./Components/Enquiry/Enquiry";

import AddService from "./Components/AddService/AddService";
import ManageService from "./Components/ManageService/ManageService";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<MainLayout />}>

            <Route index element={<Dashboard />} />

            <Route path="team" element={<TeamManagement />} />
            <Route path="booking" element={<Booking />} />

            <Route path="projects/add" element={<AddProjects />} />
            <Route path="projects" element={<ManageProjects />} />

            <Route path="gallery/add" element={<AddGallery />} />
            <Route path="gallery" element={<ManageGallery />} />

            <Route path="blog/new" element={<BlogPostig />} />
            <Route path="blog" element={<BlogManagement />} />

            <Route path="orders" element={<Order />} />
            <Route path="enquiry" element={<Enquiry />} />

            <Route path="services/add" element={<AddService />} />
            <Route path="services" element={<ManageService />} />

          </Route>
        </Route>

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
