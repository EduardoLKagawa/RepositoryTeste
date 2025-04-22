import { useEffect, useState,useRef } from 'react';
import './cards.css';
import PropTypes from 'prop-types';

export default function CardImc({ pessoa }) {
  const alt = pessoa.altura;
  const [peso, setPeso] = useState(pessoa.peso);
  const [imc, setImc] =   useEffect(() => {
    setImc((peso / alt ** 2).toFixed(2));
  }, [peso, alt]);
  
  const [isAtleta, setIsAtleta] = useState(false)
  const inputEsportesRef = useRef(null)
  

  
  useEffect(() => {
    setTimeout(() => setPeso(peso + (!isAtleta?1:-1)), 2000);
  }, [peso, isAtleta]);

  useEffect(()=>{
    console.log(`${pessoa.name} ${isAtleta?'começou a':'parou de'} praticar esportes!!!`)
  },[isAtleta, pessoa.name])

  const atualizaRotina = () =>{
    console.log(inputEsportesRef.current.checked)
    setIsAtleta(inputEsportesRef.current.checked)
  }

  return (
    <div className={imc > 24.5 ? 'imcCard imcRed' : 'imcCard'}>
      <h1>{pessoa.name}:</h1>
      <p>Altura: {alt} m</p>
      <p>Peso: {peso}</p>
      <p>Imc: {imc}</p>
      <p>{isAtleta?'Atleta':<b>Sedentário</b>}</p>
      <p>
        <input 
          type='radio' 
          ref={inputEsportesRef}
          onChange={atualizaRotina}
        />
        Pratica esportes!
      </p>
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
