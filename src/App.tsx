import { useMemo, useState } from 'react'
import './App.css'
import { mascotas } from './data/mascotas'
import FiltroEspecie from './componentes/FiltroEspecie'
import ListaMascotas from './componentes/listaMascotas'

function App() {
  const [especieSeleccionada, setEspecieSeleccionada] = useState('Todas')

  const opcionesEspecies = useMemo(
    () => ['Todas', ...Array.from(new Set(mascotas.map((mascota) => mascota.especie)))],
    []
  )

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
        <FiltroEspecie
          opciones={opcionesEspecies}
          especieSeleccionada={especieSeleccionada}
          setEspecieSeleccionada={setEspecieSeleccionada}
        />
      </section>

      <section className="pet-list">
        <ListaMascotas mascotas={mascotas} especieSeleccionada={especieSeleccionada} />
      </section>
    </main>
  )
}

export default App
