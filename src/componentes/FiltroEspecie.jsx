import React from 'react'

function FiltroEspecie({ opciones, especieSeleccionada, setEspecieSeleccionada }) {
  return (
    <label className="filtro-especie">
      <span>Filtrar por especie</span>
      <select
        value={especieSeleccionada}
        onChange={(event) => setEspecieSeleccionada(event.target.value)}
      >
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
    </label>
  )
}

export default FiltroEspecie
