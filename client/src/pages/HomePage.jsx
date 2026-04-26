import { Link } from "react-router-dom";

function HomePage({ teamName }) {
  return (
    <section className="hero-card">
      <div className="hero-copy">
        <p className="eyebrow">Dashboard</p>
        <h2>{teamName}</h2>
        <p>
          Your central hub for managing team members. Register new people,
          explore the full roster, and access individual profiles with ease.
        </p>
        <div className="action-row">
          <Link className="primary-button" to="/add-member">
            + Add Member
          </Link>
          <Link className="secondary-button" to="/members">
            Browse Team
          </Link>
        </div>
      </div>

      <div className="hero-panel">
        <h3>App Highlights</h3>
        <ul className="feature-list">
          <li>Page routing powered by React Router</li>
          <li>Backend storage via MongoDB and Express</li>
          <li>Image upload support with member profiles</li>
          <li>Minimal, assignment-ready interface</li>
        </ul>
      </div>
    </section>
  );
}

export default HomePage;