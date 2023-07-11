import React, { useEffect } from "react";
import Home from "./Home";
import Profile from "./Profile";
import Login from "./Login";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { computeHeadingLevel } from "@testing-library/react";
import MySubgreddits from "./mysgs";
import SubGreddit from "./Subgreddit";
import AllSubGreddits from "./Allsgs";
import Post from "./Post";
import SavedPosts from "./Saved";

function App() {

  return (
    <BrowserRouter>
    <Routes>   
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mysubgreddits" element={<MySubgreddits />} /> 
        <Route path="/allsubgreddits" element={<AllSubGreddits />} />
        <Route path="/allsubgreddits/:id" element={<Post />} />  
        <Route path="/mysubgreddits/:id" element={<SubGreddit />} />
        <Route path="/savedposts" element={<SavedPosts/>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
