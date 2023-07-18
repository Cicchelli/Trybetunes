import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import { UserType } from '../types';

const data = {
  name: '',
};

function Login() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(data);
  const [disabled, setDisabled] = useState(true);
  const { name } = user;
  const nav = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setLoading(false);
    createUser(user);
    setTimeout(() => {
      nav('/search');
    }, 1500);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    if (event.target.value.length >= 3) {
      setDisabled(false);
    }
    setUser({ name: event.target.value });
  }
  return (
    <div className="container">
      <h1>TrybeTunes</h1>
      {loading
        ? (
          <form onSubmit={ handleSubmit }>
            <input
              type="text"
              name="name"
              value={ name }
              data-testid="login-name-input"
              placeholder="Insira o seu nome"
              onChange={ handleChange }
            />
            <button
              data-testid="login-submit-button"
              disabled={ disabled }
            >
              Entrar
            </button>
          </form>) : <h1>Carregando...</h1>}
    </div>
  );
}

export default Login;
