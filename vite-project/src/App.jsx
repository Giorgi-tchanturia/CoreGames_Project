import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Header } from './components/Header/Header';
import { LibraryProvider } from './context/LibraryContext';
import { Home } from './pages/Home'; 
import { Library } from './pages/Library';
import { Footer } from './components/Footer/Footer';
import GameDetails from './components/GameDetails/GameDetails';
import { Auth } from './pages/Auth/Auth';

function App() {
  const themeMode = useSelector((state) => state.theme.mode);

  return (
    <AuthProvider>
      <LibraryProvider>
        <BrowserRouter>
          {/* 🟢 დავამატეთ data-theme ატრიბუტი */}
          <div 
            data-theme={themeMode} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              minHeight: '100vh',
              transition: 'all 0.3s ease'
            }}
          >
            <Header />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game/:id" element={<GameDetails />} />
                <Route path="/login" element={<Auth />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/library" element={<Library />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div> 
        </BrowserRouter>
      </LibraryProvider>
    </AuthProvider>
  );
}

export default App;