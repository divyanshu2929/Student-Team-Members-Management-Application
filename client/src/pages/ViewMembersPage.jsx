import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, UPLOADS_BASE_URL } from "../api";

function ViewMembersPage() {
  const [roster, setRoster] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchRoster = async () => {
      try {
        const res = await api.get("/members");
        setRoster(res.data);
      } catch (err) {
        setErrMsg(err.response?.data?.message || "Failed to load members.");
      } finally {
        setFetching(false);
      }
    };

    fetchRoster();
  }, []);

  const removeMember = async (memberId) => {
    if (!window.confirm("Remove this member from the roster?")) return;

    try {
      await api.delete(`/members/${memberId}`);
      setRoster((prev) => prev.filter((m) => m._id !== memberId));
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Could not remove member.");
    }
  };

  return (
    <section className="content-card">
      <div className="section-heading">
        <p className="eyebrow">Team Roster</p>
        <h2>All Members</h2>
      </div>

      {fetching && <p className="status">Loading roster...</p>}
      {errMsg && <p className="status error">{errMsg}</p>}
      {!fetching && !errMsg && roster.length === 0 && (
        <p className="status">No members yet. Start by adding one!</p>
      )}

      <div className="members-grid">
        {roster.map((member) => (
          <article className="member-card" key={member._id}>
            <img src={`${UPLOADS_BASE_URL}/${member.image}`} alt={member.fullName} />
            <div className="member-card-content">
              <h3>{member.fullName}</h3>
              <p>{member.role}</p>
              <div className="card-actions">
                <Link className="secondary-button" to={`/members/${member._id}`}>
                  Profile
                </Link>
                <button
                  className="danger-button"
                  type="button"
                  onClick={() => removeMember(member._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ViewMembersPage;