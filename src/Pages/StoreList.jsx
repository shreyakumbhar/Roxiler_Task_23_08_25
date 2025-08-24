// src/pages/StoresList.jsx
import { useState } from "react";

const mockStores = [
  { id: 1, name: "Starbucks", address: "NY", avgRating: 4.2 },
  { id: 2, name: "Dominos", address: "LA", avgRating: 3.8 }
];

export default function StoresList() {
  const [ratings, setRatings] = useState({}); // { storeId: userRating }

  const submitRating = (storeId, rating) => {
    setRatings({ ...ratings, [storeId]: rating });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Stores</h2>
      <div className="space-y-4">
        {mockStores.map(store => (
          <div key={store.id} className="border p-4 rounded shadow">
            <h3 className="text-lg">{store.name}</h3>
            <p>{store.address}</p>
            <p>⭐ Average Rating: {store.avgRating}</p>
            <p>Your Rating: {ratings[store.id] || "Not rated yet"}</p>
            <div className="flex space-x-2">
              {[1,2,3,4,5].map(r => (
                <button key={r} className={`p-2 border rounded ${ratings[store.id]===r ? "bg-blue-500 text-white" : ""}`}
                  onClick={() => submitRating(store.id, r)}>{r}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
