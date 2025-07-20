import React from "react";
import Footer from "./footer";
import Navbar from './navbar'

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#00aaff] to-white">
    <Navbar />
      <main className="flex-1">{children}</main>
    <Footer />
    </div>
  );
};

export default Layout;