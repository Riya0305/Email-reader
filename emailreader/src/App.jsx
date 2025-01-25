import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the root path */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
