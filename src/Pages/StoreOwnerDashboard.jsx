// src/pages/StoreOwnerDashboard.jsx
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const mockRatings = [
  { user: "Alice", rating: 5 },
  { user: "John", rating: 4 },
  { user: "Emma", rating: 3 },
];

export default function StoreOwnerDashboard() {
  const { logout, user } = useContext(AuthContext);

  const avgRating =
    mockRatings.reduce((sum, r) => sum + r.rating, 0) / mockRatings.length;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome {user?.name} (Store Owner)</h2>

      <h3 className="text-lg font-semibold">Ratings for Your Store</h3>
      <table className="border w-full my-3">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">User</th>
            <th className="border p-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {mockRatings.map((r, i) => (
            <tr key={i}>
              <td className="border p-2">{r.user}</td>
              <td className="border p-2">{r.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-3 font-semibold">⭐ Average Rating: {avgRating.toFixed(1)}</p>

      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
        Logout
      </button>
    </div>
  );
}
