import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/main.css';
import Home from './components/home';
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/login';
import Logout from './components/logout';
import User from './components/user';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/user" element={<User />} />
        </Routes>

        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
