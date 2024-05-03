import Home from "./pages/Home";
import Search from "./components/Search.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/userPage" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
