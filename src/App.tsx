import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/album:id" element={ <Album /> } />
      <Route path="/" element={ <Login /> } />
      <Route path="/*" element={ <NotFound /> } />
      <Route path="/search" element={ <Search /> } />
    </Routes>
  );
}

export default App;
