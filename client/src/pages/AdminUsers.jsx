import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch users from Admin API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://https://safespot-backend-ltud.onrender.com/api/admin/users");

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        // Backend se { success: true, users: [...] } aa raha hai
        setUsers(data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Search users
  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.phone || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <main className="admin-users-page">

        {/* HEADER */}
        <section className="admin-users-header">
          <div>
            <p className="admin-tag">USER MANAGEMENT</p>
            <h1>Users</h1>
            <p>Manage registered SafeSpot users and monitor user activity.</p>
          </div>
        </section>

        {/* USER MANAGEMENT PANEL */}
        <section className="users-management-panel">

          <div className="users-panel-top">
            <div>
              <h2>Registered Users</h2>
              <p>View and manage users registered on SafeSpot.</p>
            </div>

            <div className="users-count">
              <span>Total Users</span>
              <strong>{users.length}</strong>
            </div>
          </div>

          {/* SEARCH */}
          <div className="users-search">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* USERS TABLE */}
          <div className="users-table">

            <div className="users-table-row users-table-heading">
              <span>User</span>
              <span>Email</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="users-empty-state">
                <h3>Loading users...</h3>
                <p>Please wait while user data is being loaded.</p>
              </div>
            )}

            {/* USERS */}
            {!loading && filteredUsers.length > 0 && (
              filteredUsers.map((user) => (
                <div className="users-table-row" key={user._id}>
                  <span>
                    <strong>{user.name}</strong>
                  </span>
                  <span>{user.email}</span>
                  <span>
                    <span className="user-status">Active</span>
                  </span>
                  <span>
                    <button className="user-action-button">
                      View
                    </button>
                  </span>
                </div>
              ))
            )}

            {/* NO SEARCH RESULTS */}
            {!loading && users.length > 0 && filteredUsers.length === 0 && (
              <div className="users-empty-state">
                <div className="users-empty-icon">U</div>
                <h3>No users found</h3>
                <p>No registered user matches your search.</p>
              </div>
            )}

            {/* NO USERS */}
            {!loading && users.length === 0 && (
              <div className="users-empty-state">
                <div className="users-empty-icon">U</div>
                <h3>No users registered yet</h3>
                <p>Registered SafeSpot users will appear here once they create an account.</p>
              </div>
            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminUsers;