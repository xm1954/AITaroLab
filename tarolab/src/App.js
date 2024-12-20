import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Screens/Layout";
import Login from "./Screens/Login";
import Signup from './Screens/Signup'
import Question from './Screens/Question'
import Footer from './Screens/Footer'
import Card from './Screens/Card'
import ResultPage from './Screens/ResultPage'
import MyPage from "./Screens/MyPage";
import ScrollToTop from "./assets/js/ScrollToTop";
import AdminPage from "./Screens/AdminPage";
import ProtectedRoute from "./assets/js/ProtectedRoute";
import FeedbackForm from "./Screens/FeedbackForm";
import FeedbackList from "./Screens/FeedbackList";
import NotificationDetail from "./Screens/NotificationDetail"; // 유저 리스트를 보여줄 컴포넌트

function App() {
  return (
      <Router>
          <ScrollToTop />
          <Routes>
            <Route path ="/" element = {<Layout />} />
            <Route path ="Login" element = {<Login />} />
            <Route path ="Signup" element = {<Signup />} />
            <Route path ="Question" element = {<Question />} />
            <Route path ="Card" element = {<Card />} />
            <Route path ="result" element = {<ResultPage />} />
            <Route path ="feedback" element = {<FeedbackForm />} />
            <Route path ="feedbacklist" element = {<FeedbackList />} />
              <Route path="/notifications/:id" element={<NotificationDetail />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route
                  path="/admin"
                  element={
                      <ProtectedRoute>
                          <AdminPage />
                      </ProtectedRoute>
                  }
              />
          </Routes>
      </Router>
  );
}

export default App;
