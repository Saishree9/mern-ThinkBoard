import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import CreateNote from "./pages/CreateNote";
import NoteDetails from "./pages/NoteDetails";
import Navbar from "./pages/components/Navbar";

const App = () => {
  return (
    <div data-theme="forest">
      <div className="absolute inset-0 -z-10 h-full w-full px-5 pb-24 [background:radial-gradient(125%_125%_at_50%_10%,_#000_60%,_#00FF9D40_100%)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createNote" element={<CreateNote />} />
          <Route path="/noteDetails/:id" element={<NoteDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
