import { useEffect, useState } from 'react';
import './cards.css';
import PropTypes from 'prop-types';

export default function CardImc({ pessoa }) {
  const [peso, setPeso] = useState(pessoa.peso);
  const alt = pessoa.altura;
  const [imc, setImc] = useState((peso / alt ** 2).toFixed(2));
  const [corCard, setCorCard] = useState('imcVerde');

  useEffect(() => {
    const novoImc = (peso / alt ** 2).toFixed(2);
    setImc(novoImc);

    if (novoImc <= 24.5) {
      setCorCard('imcVerde');
    } else if (novoImc < 30) {
      setCorCard('imcAmarelo');
    } else {
      setCorCard('imcVermelho');
    }
  }, [peso, alt]);

  const aumentarPeso = () => setPeso(p => p + 1);
  const diminuirPeso = () => setPeso(p => p - 1);

  return (
    <div className={`imcCard ${corCard}`}>
      <h1>{pessoa.name}:</h1>
      <p>Altura: {alt} m</p>
      <p>
        Peso: {peso} kg
        <button onClick={aumentarPeso}> + </button>
        <button onClick={diminuirPeso}> - </button>
      </p>
      <p>IMC: {imc}</p>
    </div>
  );
}

CardImc.propTypes = {
  pessoa: PropTypes.shape({
    name: PropTypes.string.isRequired,
    altura: PropTypes.number.isRequired,
    peso: PropTypes.number.isRequired
  }).isRequired
};