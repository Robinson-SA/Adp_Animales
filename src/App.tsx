import { useMemo, useState } from 'react'
import './App.css'
import { mascotas } from './data/mascotas'
import FiltroEspecie from './componentes/FiltroEspecie'
import ListaMascotas from './componentes/listaMascotas'

function App() {
  const [especieSeleccionada, setEspecieSeleccionada] = useState('Todas')
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('Todas')
  const [edadSeleccionada, setEdadSeleccionada] = useState('Todas')
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState('Todas')

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
        <FiltroEspecie filtros={filtros} />
      </section>

      <section className="pet-list">
        <ListaMascotas
          mascotas={mascotas}
          especieSeleccionada={especieSeleccionada}
          estadoSeleccionado={estadoSeleccionado}
          edadSeleccionada={edadSeleccionada}
          etiquetaSeleccionada={etiquetaSeleccionada}
        />
      </section>
    </main>
  )
}

export default App
