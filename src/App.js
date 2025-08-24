// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "./Context/AuthContext";

// import Login from "./Pages/Login";
// import Signup from "./Pages/Signup";
// import StoresList from "./Pages/StoreList";
// import AdminDashboard from "./Pages/AdminDashboard";
// import UserDashboard from "./Pages/UserDashboard";
// import StoreOwnerDashboard from "./Pages/StoreOwnerDashboard";

// import ProtectedRoute from "./Component/ProtectedRoutes";

// export default function App() {
//   const { user } = useContext(AuthContext);

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected Routes */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute roles={["admin"]}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/user"
//           element={
//             <ProtectedRoute roles={["user"]}>
//               <UserDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/owner"
//           element={
//             <ProtectedRoute roles={["owner"]}>
//               <StoreOwnerDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Common Stores Page (all users can see) */}
//         <Route path="/stores" element={<StoresList />} />

//         {/* Default route */}
//         <Route path="*" element={user ? <StoresList /> : <Login />} />
//       </Routes>
//     </Router>
//   );
// }
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AdminDashboard from "./Pages/AdminDashboard";
import OwnerDashboard from "./Pages/StoreOwnerDashboard";
import UserDashboard from "./Pages/UserDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
