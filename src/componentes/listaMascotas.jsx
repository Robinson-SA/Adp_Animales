import React from 'react'
import Mascotacard from './Mascotacard'

function ListaMascotas({ mascotas, especieSeleccionada }) {
  const mascotasFiltradas = especieSeleccionada === 'Todas'
    ? mascotas
    : mascotas.filter((mascota) => mascota.especie === especieSeleccionada)

  if (mascotasFiltradas.length === 0) {
    return (
      <div className="empty-state">
        No hay mascotas para la especie seleccionada.
      </div>
    )
  }

  return (
    <div className="lista-mascotas">
      {mascotasFiltradas.map((mascota) => (
        <Mascotacard key={mascota.id} mascota={mascota} />
      ))}
    </div>
  )
}

export default ListaMascotas
