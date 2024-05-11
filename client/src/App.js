import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from "./pages/start";
import HomePage from "./pages/home";
import MyPage from "./pages/myPage";

function App() {
  return (
    <Router>
            <div>
              <Routes>
                    <Route path="/" element={<StartPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/mypage" element={<MyPage />} />
              </Routes>
            </div>
    </Router>
  );
}

export default App;
