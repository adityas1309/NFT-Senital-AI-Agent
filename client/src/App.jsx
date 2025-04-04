import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";
import { useContext } from "react";
import { WalletContext } from "./context/WalletContext";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";


const ProtectedRoute = ({ element }) => {
  const { account } = useContext(WalletContext);

  return account ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
