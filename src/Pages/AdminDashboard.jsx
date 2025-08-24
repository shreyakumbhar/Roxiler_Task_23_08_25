
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

export default function AdminDashboard() {
  const { logout, user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = user?.token;
      
        console.log("token",token);
        const [usersRes, storesRes] = await Promise.all([
          axios.get("http://localhost:4000/api/admin/users", {
            // headers: { Authorization: `Bearer ${token}` },
            headers: { Authorization: `Bearer ${token}` }
           
          }),
          axios.get("http://localhost:4000/api/admin/stores", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
  console.log("usersRes",usersRes);
        setUsers(usersRes.data);
        setStores(storesRes.data);
      } catch (err) {
        console.error("Error fetching admin data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);


   const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const authHeader = `Bearer ${user.token}`;
      await axios.post("http://localhost:4000/api/admin/users", newUser, {
        headers: { Authorization: authHeader },
      });

      alert("User created successfully!");
      setNewUser({ name: "", email: "", password: "", address: "", role: "user" });

      // Refresh user list
      const usersRes = await axios.get("http://localhost:4000/api/admin/users", {
        headers: { Authorization: authHeader },
      });
      setUsers(usersRes.data.users);
    } catch (err) {
      console.error("Error adding user", err);
      alert(err.response?.data?.message || "Failed to add user");
    }
  };

  console.log("stores",stores);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-100 rounded shadow">Users: {users?.length}</div>
        <div className="p-4 bg-gray-100 rounded shadow">Stores: {stores?.length}</div>
        <div className="p-4 bg-gray-100 rounded shadow">Ratings: 12</div>
      </div>



            <div className="mb-6 p-4 border rounded shadow">
        <h2 className="text-xl mb-3 font-semibold">Add New User</h2>
        <form onSubmit={handleAddUser} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-2 w-full"
            value={newUser.address}
            onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
            required
          />
          <select
            className="border p-2 w-full"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="owner">Owner</option>
            <option value="admin">Admin</option>
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add User
          </button>
        </form>
      </div>


      {/* Stores List */}
      <h3 className="text-lg font-semibold">Stores</h3>
      <table className="border w-full my-3">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores?.map((s) => (
            <tr key={s.id}>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.email}</td>
              <td className="border p-2">{s.location}</td>
              <td className="border p-2">{s.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Users List */}
      <h3 className="text-lg font-semibold">Users</h3>
      <table className="border w-full my-3">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.address}</td>
              <td className="border p-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}

