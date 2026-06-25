import React from 'react'
import Mascotacard from './Mascotacard'

function ListaMascotas({
  mascotas,
  especieSeleccionada,
  estadoSeleccionado,
  edadSeleccionada,
  etiquetaSeleccionada,
}) {
  const mascotasFiltradas = mascotas
    .filter((mascota) =>
      especieSeleccionada === 'Todas'
        ? true
        : mascota.especie === especieSeleccionada
    )
    .filter((mascota) => {
      if (estadoSeleccionado === 'Todas') return true
      if (estadoSeleccionado === 'Urgente') return mascota.adopcionUrgente
      return !mascota.adopcionUrgente
    })
    .filter((mascota) => {
      if (edadSeleccionada === 'Todas') return true
      if (edadSeleccionada === '0-2') return mascota.edad <= 2
      if (edadSeleccionada === '3-5') return mascota.edad >= 3 && mascota.edad <= 5
      return mascota.edad >= 6
    })
    .filter((mascota) =>
      etiquetaSeleccionada === 'Todas'
        ? true
        : mascota.caracteristicas.includes(etiquetaSeleccionada)
    )

  if (mascotasFiltradas.length === 0) {
    return (
      <div className="empty-state">
        No hay mascotas que coincidan con los filtros seleccionados.
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
