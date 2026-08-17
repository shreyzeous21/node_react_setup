import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layouts/Header";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/contact/ContactPage";
import Footer from "./components/layouts/Footer";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={"not found"} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
}
