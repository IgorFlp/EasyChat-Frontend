import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login" 
import ChatPage from "./pages/chatpage";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/chats" element={<ProtectedRoute><ChatPage /></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
