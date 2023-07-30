import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

export default function Sidebar() {
  
  return (
    <>
      <nav className="ts-sidebar">
        <ul className="ts-sidebar-menu">
          <li><a href="/landing">View Jobs</a></li>
          <li><a href="/create">Add new Job</a></li>
        </ul>
        </nav>
    </>
    
  );
}
