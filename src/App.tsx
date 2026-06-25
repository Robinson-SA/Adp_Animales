import { useMemo, useState } from 'react'
import './App.css'
import { mascotas } from './data/mascotas'
import FiltroEspecie from './componentes/FiltroEspecie'
import Mascotacard from './componentes/Mascotacard'

function App() {
  const [especieSeleccionada, setEspecieSeleccionada] = useState('Todas')
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('Todas')
  const [edadSeleccionada, setEdadSeleccionada] = useState('Todas')
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState('Todas')
  const [busquedaNombre, setBusquedaNombre] = useState('')

  const normalizarTexto = (texto: string): string => texto.trim().toLowerCase()

  const opcionesEspecies = useMemo(
    () => ['Todas', ...Array.from(new Set(mascotas.map((mascota) => mascota.especie)))],
    []
  )

  const opcionesEstados = useMemo(
    () => ['Todas', 'Urgente', 'Normal'],
    []
  )

  const opcionesEdad = useMemo(
    () => ['Todas', '0-2', '3-5', '6+'],
    []
  )

  const opcionesEtiquetas = useMemo(
    () => [
      'Todas',
      ...Array.from(
        new Set(mascotas.flatMap((mascota) => mascota.caracteristicas))
      ).sort(),
    ],
    []
  )

  const mascotasFiltradas = useMemo(() => {
    return mascotas
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
      .filter((mascota) => {
        if (!busquedaNombre) return true
        return normalizarTexto(mascota.nombre).includes(normalizarTexto(busquedaNombre))
      })
  }, [especieSeleccionada, estadoSeleccionado, edadSeleccionada, etiquetaSeleccionada, busquedaNombre])

  const filtros = [
    {
      name: 'especie',
      label: 'Especie',
      value: especieSeleccionada,
      options: opcionesEspecies,
      onChange: setEspecieSeleccionada,
    },
    {
      name: 'estado',
      label: 'Estado',
      value: estadoSeleccionado,
      options: opcionesEstados,
      onChange: setEstadoSeleccionado,
    },
    {
      name: 'edad',
      label: 'Años',
      value: edadSeleccionada,
      options: opcionesEdad,
      onChange: setEdadSeleccionada,
    },
    {
      name: 'etiqueta',
      label: 'Etiqueta',
      value: etiquetaSeleccionada,
      options: opcionesEtiquetas,
      onChange: setEtiquetaSeleccionada,
    },
  ]

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">AdoptaPet</p>
          <h1>Mascotas en adopción</h1>
          <p className="subtitle">
            Encuentra mascotas organizadas por especie y resalta los casos de adopción urgente.
          </p>
        </div>
        <div className="header-cards">
          <div className="stat-card">
            <strong>{mascotas.length}</strong>
            <span>mascotas</span>
          </div>
          <div className="stat-card stat-urgent">
            <strong>{mascotas.filter((mascota) => mascota.adopcionUrgente).length}</strong>
            <span>urgentes</span>
          </div>
        </div>
      </header>

      <section className="filters">
        <div className="busqueda-nombre">
          <label htmlFor="busquedaNombre">Buscar por nombre</label>
          <input
            id="busquedaNombre"
            type="search"
            placeholder="Escribe un nombre..."
            value={busquedaNombre}
            onChange={(event) => setBusquedaNombre(event.target.value)}
          />
        </div>
        <FiltroEspecie filtros={filtros} />
      </section>

      <section className="pet-list">
        {mascotasFiltradas.length === 0 ? (
          <div className="empty-state">
            No hay mascotas que coincidan.
          </div>
        ) : (
          <div className="lista-mascotas">
            {mascotasFiltradas.map((mascota) => (
              <Mascotacard key={mascota.id} mascota={mascota} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default App
