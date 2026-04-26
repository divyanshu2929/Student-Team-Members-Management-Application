import { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddMemberPage from "./pages/AddMemberPage";
import ViewMembersPage from "./pages/ViewMembersPage";
import MemberDetailsPage from "./pages/MemberDetailsPage";
import { api } from "./api";

function App() {
  const [groupName, setGroupName] = useState("Tech Pioneers");

  useEffect(() => {
    const fetchGroupName = async () => {
      try {
        const res = await api.get("/team");
        setGroupName(res.data.teamName || "Tech Pioneers");
      } catch {
        setGroupName("Tech Pioneers");
      }
    };

    fetchGroupName();
  }, []);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>{groupName}</h1>
        </div>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/add-member">Add Member</NavLink>
          <NavLink to="/members">Team Roster</NavLink>
        </nav>
      </header>

      <main className="page-wrapper">
        <Routes>
          <Route path="/" element={<HomePage teamName={groupName} />} />
          <Route path="/add-member" element={<AddMemberPage />} />
          <Route path="/members" element={<ViewMembersPage />} />
          <Route path="/members/:id" element={<MemberDetailsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;