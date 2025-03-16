import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import Dashboard from "./Components/Dashboard";
import Signup from "./Components/Signup"; // If you have signup
import TaxInfo from "./Components/TaxInfo";
import TrFinal from "./Components/TrFinal";
import Trdraft from "./Components/Trdraft";
import UploadDoc from "./Components/UploadDoc";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/dash" element={<Dashboard/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/download-form" element={<TaxInfo/>}/>
        <Route path="/upload-docs" element={<UploadDoc/>}/>
        <Route path="/download-draft" element={<Trdraft/>}/>
        <Route path="/download-final" element={<TrFinal/>}/>
      </Routes>
    </Router>
  );
}

export default App;
