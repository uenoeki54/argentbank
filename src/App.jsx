import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/main.css';
import Home from './components/home';
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/login';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
