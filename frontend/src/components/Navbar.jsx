import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const nav= useNavigate();
  function redirectLogin(){
    localStorage.setItem('isLoggedIn', 'false');
    nav("/");
  }

  function redirectMysgs(){
    nav("/mysubgreddits");
  }

  function redirectSaved(){
    nav("/savedposts");
  }

  function redirectAllsgs(){
    nav("/allsubgreddits");
  }

  function redirectProfile(){
    nav("/profile");
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark">
        <a class="navbar-brand" href="#"> <i class="fa-brands fa-reddit fa-2x nav-icon"></i> <span className="greddiit"> Greddiit </span></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
      <ul class="navbar-nav ms-auto"> 
         <li class="nav-item">
             <a class="nav-link"> <i class="fa-sharp fa-solid fa-house-user"></i> Home</a>
         </li>
         <li class="nav-item">
          <a class="nav-link" onClick={redirectProfile}><i class="fa-solid fa-circle-user"></i> Profile</a>
      </li>
      <li class="nav-item">
          <a class="nav-link" onClick={redirectMysgs} >My Subgreddits</a>
      </li>
      <li class="nav-item">
          <a class="nav-link" onClick={redirectAllsgs} >All Subgreddits</a>
      </li>
      <li class="nav-item">
          <a class="nav-link" onClick={redirectSaved}  >Saved Posts</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" onClick={redirectLogin}><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
    </li>
      </ul>
      </div>
    </nav>
    </div>
  );
}

export default Navbar;
