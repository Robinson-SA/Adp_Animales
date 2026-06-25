import React from 'react'
import PropTypes from 'prop-types'

function FiltroEspecie({ filtros }) {
  return (
    <div className="filtro-especie-grid">
      {filtros.map((filtro) => (
        <label className="filtro-especie" key={filtro.name}>
          <span>{filtro.label}</span>
          <select
            value={filtro.value}
            onChange={(event) => filtro.onChange(event.target.value)}
          >
            {filtro.options.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  )
}

FiltroEspecie.propTypes = {
  filtros: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      onChange: PropTypes.func.isRequired,
    })
  ).isRequired,
}

export default FiltroEspecie
