import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

function Header() {
  const [loading, setLoading] = useState(true);
  const [firstData, setFirstData] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const users = await getUser();
      setFirstData(users.name);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <header data-testid="header-component">
            <Link to="/search" data-testid="link-to-search">
              <span>Search</span>
            </Link>
            <Link to="/favorites" data-testid="link-to-favorites">
              <span>Favorites</span>
            </Link>
            <Link to="/profile" data-testid="link-to-profile">
              <span>Profile</span>
            </Link>
          </header>
          <main>
            <div>
              <h3 data-testid="header-user-name">{firstData}</h3>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default Header;
