import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api, UPLOADS_BASE_URL } from "../api";

function MemberDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/members/${id}`);
        setProfile(res.data);
      } catch (err) {
        setErrMsg(err.response?.data?.message || "Could not load member info.");
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, [id]);

  const removeMember = async () => {
    if (!window.confirm("Remove this member permanently?")) return;

    try {
      await api.delete(`/members/${id}`);
      navigate("/members");
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Deletion failed. Try again.");
    }
  };

  if (fetching) return <p className="status">Fetching profile...</p>;
  if (errMsg) return <p className="status error">{errMsg}</p>;
  if (!profile) return <p className="status">No profile found.</p>;

  return (
    <section className="member-details-layout">
      <article className="member-details-card">
        <img
          className="member-details-image"
          src={`${UPLOADS_BASE_URL}/${profile.image}`}
          alt={profile.fullName}
        />
        <div className="member-details-content">
          <p className="eyebrow">Profile</p>
          <h2>{profile.fullName}</h2>
          <div className="details-grid">
            <div>
              <span>Position</span>
              <strong>{profile.role}</strong>
            </div>
            <div>
              <span>Email</span>
              <strong>{profile.email}</strong>
            </div>
            <div>
              <span>Phone</span>
              <strong>{profile.contactNumber}</strong>
            </div>
            <div>
              <span>Department</span>
              <strong>{profile.department}</strong>
            </div>
          </div>
          <div className="bio-panel">
            <span>About</span>
            <p>{profile.bio || "No bio available."}</p>
          </div>
          <div className="details-actions">
            <Link className="secondary-button" to="/members">
              ← Back to Roster
            </Link>
            <button className="danger-button" type="button" onClick={removeMember}>
              Remove Member
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default MemberDetailsPage;