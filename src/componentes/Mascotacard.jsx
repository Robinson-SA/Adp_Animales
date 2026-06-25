import React from 'react'
import PropTypes from 'prop-types'

function Mascotacard({ mascota }) {
  const especieClase = mascota.especie.toLowerCase() === 'perro'
    ? 'species-perro'
    : mascota.especie.toLowerCase() === 'gato'
    ? 'species-gato'
    : 'species-otro'

  return (
    <article className={`mascota-card ${mascota.adopcionUrgente ? 'urgente' : ''}`}>
      <div className="mascota-card-header">
        <div>
          <h2>{mascota.nombre}</h2>
          <p className="subtext">{mascota.raza} • {mascota.edad} años</p>
        </div>
        {mascota.adopcionUrgente && <span className="adopcion-badge">Urgente</span>}
      </div>

      <div className="species-tag-wrapper">
        <span className={`species-tag ${especieClase}`}>{mascota.especie}</span>
      </div>

      <p className="descripcion">{mascota.descripcion}</p>

      <ul className="caracteristicas">
        {mascota.caracteristicas.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </article>
  )
}

Mascotacard.propTypes = {
  mascota: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    raza: PropTypes.string.isRequired,
    edad: PropTypes.number.isRequired,
    especie: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    caracteristicas: PropTypes.arrayOf(PropTypes.string).isRequired,
    adopcionUrgente: PropTypes.bool.isRequired,
  }).isRequired,
}

export default Mascotacard
