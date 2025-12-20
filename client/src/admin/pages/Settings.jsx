import React, { useState } from "react";

function AdminSettings() {
  const [storeName, setStoreName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [weeklySummary, setWeeklySummary] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call your backend API to save these settings
    console.log({ storeName, contactEmail, weeklySummary });
  };

  return (
    <div>
      <h1>Admin Settings</h1>
      <p>Here you can configure various admin options.</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <h3>General</h3>
        <div className="mb-3">
          <label>Store name</label>
          <input
            type="text"
            className="form-control"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Contact email</label>
          <input
            type="email"
            className="form-control"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>

        <h3 className="mt-4">Notifications</h3>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="weeklySummary"
            checked={weeklySummary}
            onChange={(e) => setWeeklySummary(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="weeklySummary">
            Send weekly sales summary emails
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Save settings
        </button>
      </form>
    </div>
  );
}

export default AdminSettings;
