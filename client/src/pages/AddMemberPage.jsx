import { useState } from "react";
import { api } from "../api";

const blankEntry = {
  fullName: "",
  role: "",
  email: "",
  contactNumber: "",
  department: "",
  bio: "",
};

function AddMemberPage() {
  const [formData, setFormData] = useState(blankEntry);
  const [profilePic, setProfilePic] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const onFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrMsg("");

    if (!profilePic) {
      setErrMsg("A profile photo is required.");
      return;
    }

    setIsSaving(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([k, v]) => payload.append(k, v));
      payload.append("image", profilePic);

      await api.post("/members", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFormData(blankEntry);
      setProfilePic(null);
      e.target.reset();
      setSuccessMsg("New member registered successfully!");
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="content-card">
      <div className="section-heading">
        <p className="eyebrow">New Entry</p>
        <h2>Register a Team Member</h2>
      </div>

      <form className="member-form" onSubmit={onFormSubmit}>
        <label>
          Full Name
          <input name="fullName" type="text" value={formData.fullName} onChange={onFieldChange} required />
        </label>

        <label>
          Position / Role
          <input name="role" type="text" value={formData.role} onChange={onFieldChange} required />
        </label>

        <label>
          Email Address
          <input name="email" type="email" value={formData.email} onChange={onFieldChange} required />
        </label>

        <label>
          Phone Number
          <input name="contactNumber" type="text" value={formData.contactNumber} onChange={onFieldChange} required />
        </label>

        <label>
          Department
          <input name="department" type="text" value={formData.department} onChange={onFieldChange} required />
        </label>

        <label className="full-width">
          About This Member
          <textarea
            name="bio"
            rows="4"
            value={formData.bio}
            onChange={onFieldChange}
            placeholder="Write a brief description about this member..."
          />
        </label>

        <label className="full-width">
          Profile Photo
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
            required
          />
        </label>

        {successMsg && <p className="status success">{successMsg}</p>}
        {errMsg && <p className="status error">{errMsg}</p>}

        <button className="primary-button" type="submit" disabled={isSaving}>
          {isSaving ? "Please wait..." : "Add Member"}
        </button>
      </form>
    </section>
  );
}

export default AddMemberPage;