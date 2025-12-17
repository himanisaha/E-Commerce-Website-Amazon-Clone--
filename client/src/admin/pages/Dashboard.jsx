export default function Dashboard() {

  console.log("Dashboard rendered"); // ✅ ADD HERE (top of function)

  return (
    <>
      <h2>Dashboard</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <div>Total Users</div>
        <div>Total Orders</div>
        <div>Total Products</div>
        <div>Total Revenue</div>
      </div>
    </>
  );
}
