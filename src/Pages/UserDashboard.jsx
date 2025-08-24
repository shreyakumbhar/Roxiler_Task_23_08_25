// src/pages/UserDashboard.jsx
// import { useContext } from "react";
// import { AuthContext } from "../Context/AuthContext";
// import StoresList from "./StoreList";

// export default function UserDashboard() {
//   const { logout, user } = useContext(AuthContext);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Welcome {user?.name} (User)</h2>
//       <StoresList />
//       <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
//         Logout
//       </button>
//     </div>
//   );
// }


// src/pages/UserDashboard.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

export default function UserDashboard() {
  const { logout, user } = useContext(AuthContext);
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const token = user?.token;

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/stores", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStores(res.data || []);
      } catch (err) {
        console.error("Error fetching stores:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, [token]);

  const handleRatingSubmit = async (storeId, rating) => {
    try {
      await axios.post(
        `http://localhost:4000/api/ratings/${storeId}`,
        { rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // update store list after rating
      setStores((prev) =>
        prev.map((s) =>
          s.id === storeId ? { ...s, userRating: rating } : s
        )
      );
    } catch (err) {
      console.error("Error submitting rating:", err);
    }
  };
console.log("stores",stores);
  const filteredStores = stores.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.address?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="p-6">Loading stores...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Welcome {user?.name} (User)
      </h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search stores by name or address..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Stores List */}
      <table className=" table border w-full my-3">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Store Name</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Overall Rating</th>
            <th className="border p-2">Your Rating</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.map((s) => (
            <tr key={s.id}>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.location}</td>
              <td className="border p-2">{s.rating || "No ratings yet"}</td>
              <td className="border p-2">
                <select
                  value={s.userRating || ""}
                  onChange={(e) => handleRatingSubmit(s.id, Number(e.target.value))}
                  className="border p-1 rounded"
                >
                  <option value="">Rate</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
}

