import { useState } from "react";
import "./App.css";

type Turno = {
  id: string;
  nombre: string;
  motivo: string;
};

const turnosIniciales: Turno[] = [
  { id: "t-1", nombre: "Lina", motivo: "Pregunta sobre React" },
  { id: "t-2", nombre: "Tomás", motivo: "Error de instalación" },
];

export default function App() {
  const [turnos, setTurnos] = useState<Turno[]>(turnosIniciales);
  const [nombre, setNombre] = useState("");
  const [motivo, setMotivo] = useState("");

  // Agregar turno con validación e inmutabilidad
  function agregarTurno(e?: React.FormEvent) {
    if (e) e.preventDefault(); // Evita recarga si se usa en un formulario

    const nombreLimpio = nombre.trim();
    const motivoLimpio = motivo.trim();

    if (!nombreLimpio || !motivoLimpio) {
      return;
    }

    const nuevoTurno: Turno = {
      id: crypto.randomUUID(),
      nombre: nombreLimpio,
      motivo: motivoLimpio,
    };

    setTurnos((filaActual) => [...filaActual, nuevoTurno]);
    setNombre("");
    setMotivo("");
  }

  // Atender al primer turno (FIFO) usando slice(1)
  function atenderSiguiente() {
    setTurnos((filaActual) => filaActual.slice(1));
  }

  const siguienteTurno = turnos[0];

  return (
    <div className="container">
      <header>
        <h1>Fila Creativa</h1>
        <p className="subtitle">Gestión de Turnos FIFO</p>
      </header>

      {/* Formulario de registro */}
      <form className="card form-card" onSubmit={agregarTurno}>
        <h2>Registrar Persona</h2>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            placeholder="Ej. Lina"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="motivo">Motivo de la consulta</label>
          <input
            id="motivo"
            type="text"
            placeholder="Ej. Pregunta sobre React"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Agregar a la fila
        </button>
      </form>

      {/* Tarjeta destacada: Siguiente Turno */}
      <section className="card highlight-card">
        <h2>Siguiente Turno</h2>
        {siguienteTurno ? (
          <div className="current-turn">
            <span className="badge">En atención</span>
            <h3>{siguienteTurno.nombre}</h3>
            <p>
              <strong>Motivo:</strong> {siguienteTurno.motivo}
            </p>
            <button onClick={atenderSiguiente} className="btn btn-success">
              Atender siguiente
            </button>
          </div>
        ) : (
          <p className="empty-msg">No hay personas en espera.</p>
        )}
      </section>

      {/* Lista visual de espera */}
      <section className="card list-card">
        <h2>Personas en Espera ({turnos.length})</h2>
        {turnos.length > 0 ? (
          <ol className="turnos-list">
            {turnos.map((turno, index) => (
              <li
                key={turno.id}
                className={index === 0 ? "turn-item active" : "turn-item"}
              >
                <div className="turn-info">
                  <strong>{turno.nombre}</strong>
                  <span>{turno.motivo}</span>
                </div>
                {index === 0 && <span className="tag">Siguiente</span>}
              </li>
            ))}
          </ol>
        ) : (
          <p className="empty-msg">La fila está totalmente vacía.</p>
        )}
      </section>
    </div>
  );
}