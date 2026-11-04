
import { useEffect, useState } from 'react'
import './App.css'

const API = 'http://localhost:8080/api/auth'

const partidosIniciales = [
  {
    id: 1,
    local: 'PERÚ',
    visitante: 'BRASIL',
    banderaLocal: '🇵🇪',
    banderaVisitante: '🇧🇷',
    fecha: 'Partido de demostración',
    grupo: 'AMISTOSO',
  },
  {
    id: 2,
    local: 'ARGENTINA',
    visitante: 'FRANCIA',
    banderaLocal: '🇦🇷',
    banderaVisitante: '🇫🇷',
    fecha: 'Encuentro de ejemplo',
    grupo: 'DESTACADO',
  },
  {
    id: 3,
    local: 'ESPAÑA',
    visitante: 'PORTUGAL',
    banderaLocal: '🇪🇸',
    banderaVisitante: '🇵🇹',
    fecha: 'Encuentro de ejemplo',
    grupo: 'DESTACADO',
  },
]

const rankingInicial = [
  { nombre: 'GolDeOro', puntos: 125, pais: '🇦🇷' },
  { nombre: 'MisterFutbol', puntos: 110, pais: '🇧🇷' },
  { nombre: 'Crack2026', puntos: 98, pais: '🇵🇪' },
  { nombre: 'ElProde', puntos: 85, pais: '🇪🇸' },
]

function leerLocalStorage(clave, valorInicial) {
  try {
    const valor = localStorage.getItem(clave)
    return valor ? JSON.parse(valor) : valorInicial
  } catch {
    return valorInicial
  }
}

// =====================================================
// PANEL ADMINISTRATIVO
// =====================================================

function AdminDashboard({ usuario, cerrarSesion }) {
  const [seccion, setSeccion] = useState('inicio')

  const opciones = [
    { id: 'inicio', nombre: 'Dashboard', icono: '📊' },
    { id: 'partidos', nombre: 'Gestionar partidos', icono: '⚽' },
    { id: 'resultados', nombre: 'Resultados oficiales', icono: '🏆' },
    { id: 'usuarios', nombre: 'Usuarios', icono: '👥' },
    { id: 'ranking', nombre: 'Ranking', icono: '🥇' },
  ]

  const tarjeta = {
    background: '#111f30',
    padding: '24px',
    borderRadius: '14px',
    border: '1px solid #26384b',
  }

  const boton = {
    width: '100%',
    padding: '14px',
    marginBottom: '8px',
    textAlign: 'left',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '14px',
  }

  return (
    
    <div style={{
      background: '#08111f',
      color: '#fff',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 5%',
        borderBottom: '1px solid #26384b',
        flexWrap: 'wrap',
        gap: '15px',
      }}>
        <h2>
          ⚽ MUNDIAL<span style={{ color: '#8bdc28' }}>PREDICT</span>
        </h2>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}>
          <span>👤 {usuario}</span>
          <span style={{
            background: '#29451c',
            color: '#a5ef66',
            padding: '7px 12px',
            borderRadius: '20px',
          }}>
            ADMIN
          </span>

          <button
            onClick={cerrarSesion}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              border: '1px solid #536477',
              background: 'transparent',
              color: '#fff',
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <div style={{
        display: 'flex',
        minHeight: 'calc(100vh - 80px)',
        flexWrap: 'wrap',
      }}>
        <aside style={{
          width: '240px',
          maxWidth: '100%',
          padding: '25px 15px',
          background: '#0d1929',
          boxSizing: 'border-box',
        }}>
          <p style={{
            color: '#8bdc28',
            fontWeight: 'bold',
            paddingLeft: '12px',
          }}>
            ADMINISTRACIÓN
          </p>

          {opciones.map(opcion => (
            <button
              key={opcion.id}
              onClick={() => setSeccion(opcion.id)}
              style={{
                ...boton,
                background: seccion === opcion.id
                  ? '#29451c'
                  : 'transparent',
              }}
            >
              {opcion.icono} {opcion.nombre}
            </button>
          ))}
        </aside>

        <main style={{
          flex: 1,
          minWidth: 280,
          padding: '35px 5%',
          boxSizing: 'border-box',
        }}>
          <p style={{ color: '#8bdc28' }}>
            PANEL DE CONTROL / ADMINISTRADOR
          </p>

          {seccion === 'inicio' && (
            <>
              <h1>Bienvenido, {usuario}</h1>
              <p>Administra la plataforma MundialPredict.</p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 18,
                marginTop: 30,
              }}>
                {[
                  ['⚽', 'Partidos', 'Pendiente de conectar'],
                  ['👥', 'Usuarios', 'Pendiente de conectar'],
                  ['🏆', 'Resultados', 'Pendiente de conectar'],
                  ['🥇', 'Predicciones', 'Pendiente de conectar'],
                ].map(([icono, titulo, detalle]) => (
                  <div key={titulo} style={tarjeta}>
                    <h3>{icono} {titulo}</h3>
                    <p style={{ color: '#a5ef66' }}>—</p>
                    <small>{detalle}</small>
                  </div>
                ))}
              </div>

              <div style={{ ...tarjeta, marginTop: 25 }}>
                <h2>Administración del torneo</h2>
                <p>
                  Desde este panel podrás gestionar los partidos,
                  registrar resultados y supervisar a los jugadores.
                </p>
              </div>
            </>
          )}

          {seccion === 'partidos' && (
            <div style={tarjeta}>
              <h1>⚽ Gestionar partidos</h1>
              <p>
                Aquí se implementará el registro, edición y eliminación
                de partidos del Mundial 2026.
              </p>
              <p>La gestión todavía no está conectada al backend.</p>
            </div>
          )}

          {seccion === 'resultados' && (
            <div style={tarjeta}>
              <h1>🏆 Resultados oficiales</h1>
              <p>
                Aquí se implementará el registro de marcadores finales
                y el cálculo automático de puntos.
              </p>
              <p>La gestión todavía no está conectada al backend.</p>
            </div>
          )}

          {seccion === 'usuarios' && (
            <div style={tarjeta}>
              <h1>👥 Usuarios registrados</h1>
              <p>
                Aquí se implementará la consulta y administración
                de las cuentas de los jugadores.
              </p>
              <p>La gestión todavía no está conectada al backend.</p>
            </div>
          )}

          {seccion === 'ranking' && (
            <div style={tarjeta}>
              <h1>🥇 Ranking general</h1>
              <p>
                Aquí se implementará la clasificación real de los
                participantes según sus puntuaciones.
              </p>
              <p>La gestión todavía no está conectada al backend.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

// =====================================================
// APLICACIÓN PRINCIPAL
// =====================================================

function App() {
  const [modal, setModal] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)

  const [usuario, setUsuario] = useState(() =>
    localStorage.getItem('usuarioMundial')
  )

  const [rol, setRol] = useState(() =>
    localStorage.getItem('rolMundial') || 'JUGADOR'
  )

  const [predicciones, setPredicciones] = useState(() =>
    leerLocalStorage('prediccionesMundial', {})
  )

  const [grupos, setGrupos] = useState(() =>
    leerLocalStorage('gruposMundial', [])
  )

  const [nombreGrupo, setNombreGrupo] = useState('')
  const [descripcionGrupo, setDescripcionGrupo] = useState('')
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [notificacion, setNotificacion] = useState('')

  useEffect(() => {
    localStorage.setItem(
      'prediccionesMundial',
      JSON.stringify(predicciones)
    )
  }, [predicciones])

  useEffect(() => {
    localStorage.setItem('gruposMundial', JSON.stringify(grupos))
  }, [grupos])

  function notificar(texto) {
    setNotificacion(texto)
    window.setTimeout(() => setNotificacion(''), 3000)
  }

  function abrirModal(tipo) {
    setModal(tipo)
    setMensaje('')
    setCorreo('')
    setPassword('')
    setNombre('')
    setNombreGrupo('')
    setDescripcionGrupo('')
    setMenuAbierto(false)
  }

  // ===================================================
  // LOGIN Y REGISTRO
  // ===================================================

  async function enviarFormulario(e) {
    e.preventDefault()
    setCargando(true)
    setMensaje('')

    const tipoFormulario = modal
    const endpoint = tipoFormulario === 'registro'
      ? '/registro'
      : '/login'

    const datos = tipoFormulario === 'registro'
      ? { nombre, correo, password }
      : { correo, password }

    try {
      const respuesta = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      })

      const resultado = await respuesta.json()

      if (!respuesta.ok) {
        throw new Error(
          resultado.mensaje ||
          resultado.message ||
          resultado.error ||
          'No se pudo completar la operación.'
        )
      }

      if (tipoFormulario === 'registro') {
        setModal('login')
        setPassword('')
        setMensaje('¡Tu cuenta fue creada! Ahora inicia sesión.')
        return
      }

      if (!resultado.token) {
        throw new Error('El servidor no devolvió un token de acceso.')
      }

      const datosUsuario = resultado.usuario || resultado.user || {}

      const nombreUsuario =
        datosUsuario.nombre || correo.split('@')[0]

      const rolUsuario =
        String(datosUsuario.rol || 'JUGADOR').trim().toUpperCase()

      if (!['ADMIN', 'JUGADOR'].includes(rolUsuario)) {
        throw new Error('El servidor devolvió un rol no reconocido.')
      }

      localStorage.setItem('tokenMundial', resultado.token)
      localStorage.setItem('usuarioMundial', nombreUsuario)
      localStorage.setItem('rolMundial', rolUsuario)

      setUsuario(nombreUsuario)
      setRol(rolUsuario)
      setModal('')
      setMensaje('')

      notificar(`¡Bienvenido, ${nombreUsuario}!`)
    } catch (error) {
      setMensaje(
        error.message || 'No se pudo conectar con el servidor.'
      )
    } finally {
      setCargando(false)
    }
  }

  // ===================================================
  // CERRAR SESIÓN
  // ===================================================

  function cerrarSesion() {
    localStorage.removeItem('tokenMundial')
    localStorage.removeItem('usuarioMundial')
    localStorage.removeItem('rolMundial')

    setUsuario(null)
    setRol('JUGADOR')
    setModal('')
    setMenuAbierto(false)

    notificar('Has cerrado sesión correctamente.')
  }

  // ===================================================
  // PREDICCIONES
  // ===================================================

  function actualizarMarcador(id, campo, valor) {
    if (
      valor !== '' &&
      (!/^\d+$/.test(valor) || Number(valor) > 99)
    ) {
      return
    }

    setPredicciones(actuales => ({
      ...actuales,
      [id]: {
        ...actuales[id],
        [campo]: valor,
        guardada: false,
      },
    }))
  }

  function guardarPrediccion(id) {
    if (!usuario) {
      abrirModal('login')
      return
    }

    if (rol === 'ADMIN') {
      notificar('Los administradores no realizan predicciones.')
      return
    }

    const prediccion = predicciones[id]

    if (
      prediccion?.local === undefined ||
      prediccion?.visitante === undefined ||
      prediccion.local === '' ||
      prediccion.visitante === ''
    ) {
      notificar('Completa los dos marcadores antes de guardar.')
      return
    }

    setPredicciones(actuales => ({
      ...actuales,
      [id]: {
        ...actuales[id],
        guardada: true,
      },
    }))

    notificar('¡Tu predicción se guardó correctamente!')
  }

  // ===================================================
  // GRUPOS
  // ===================================================

  function crearGrupo(e) {
    e.preventDefault()

    if (!usuario) {
      abrirModal('login')
      return
    }

    if (rol === 'ADMIN') {
      notificar('Los administradores no pueden crear grupos.')
      return
    }

    if (!nombreGrupo.trim()) {
      notificar('Escribe un nombre para tu grupo.')
      return
    }

    const nuevoGrupo = {
      id: Date.now(),
      nombre: nombreGrupo.trim(),
      descripcion: descripcionGrupo.trim() || 'Grupo de amigos',
      codigo: `MP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      creador: usuario,
      participantes: 1,
    }

    setGrupos(actuales => [...actuales, nuevoGrupo])
    setModal('')
    setNombreGrupo('')
    setDescripcionGrupo('')

    notificar('¡Tu grupo fue creado!')
  }

  async function copiarCodigo(codigo) {
    try {
      await navigator.clipboard.writeText(codigo)
      notificar('Código de invitación copiado.')
    } catch {
      notificar(`Código de invitación: ${codigo}`)
    }
  }

  // ===================================================
  // DATOS DEL JUGADOR
  // ===================================================

  const totalPredicciones = Object.values(predicciones)
    .filter(p => p.guardada).length

  const miPuntuacion = 0

  const ranking = [
    ...rankingInicial,
    ...(usuario
      ? [{
          nombre: usuario,
          puntos: miPuntuacion,
          pais: '👤',
          propio: true,
        }]
      : []),
  ].sort((a, b) => b.puntos - a.puntos)

  // ===================================================
  // SEPARACIÓN DE ROLES
  // ===================================================

  if (usuario && rol === 'ADMIN') {
    return (
      <AdminDashboard
        usuario={usuario}
        cerrarSesion={cerrarSesion}
      />
    )
  }

  // ===================================================
  // VISTA ORIGINAL DEL JUGADOR
  // ===================================================

  return (
    <div className="app">
      <header className="navbar">
        <a href="#inicio" className="logo">
          <span className="logo-icon">⚽</span>
          MUNDIAL<span className="logo-green">PREDICT</span>
        </a>

        <button
          className="mobile-menu"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        <nav className={menuAbierto ? 'nav-links open' : 'nav-links'}>
          <a href="#inicio" onClick={() => setMenuAbierto(false)}>
            Inicio
          </a>
          <a href="#partidos" onClick={() => setMenuAbierto(false)}>
            Partidos
          </a>
          <a href="#ranking" onClick={() => setMenuAbierto(false)}>
            Ranking
          </a>
          <a href="#grupos" onClick={() => setMenuAbierto(false)}>
            Grupos
          </a>
        </nav>

        <div className="nav-actions">
          {usuario ? (
            <>
              <button
                className="user-chip"
                onClick={() => abrirModal('perfil')}
              >
                <span className="avatar-small">👤</span>
                <span>{usuario}</span>
              </button>

              <button className="login-btn" onClick={cerrarSesion}>
                Salir
              </button>
            </>
          ) : (
            <>
              <button
                className="login-btn"
                onClick={() => abrirModal('login')}
              >
                Iniciar sesión
              </button>

              <button
                className="register-btn"
                onClick={() => abrirModal('registro')}
              >
                Crear cuenta
              </button>
            </>
          )}
        </div>
      </header>

      <main>
        <section className="hero-section" id="inicio">
          <div className="hero-background" />

          <div className="hero-content">
            <div className="tag">
              <span>🏆</span> LA PASIÓN DEL FÚTBOL COMIENZA AQUÍ
            </div>

            <h1>
              EL MUNDIAL
              <br />
              SE VIVE.
              <br />
              <span>TÚ LO PREDICES.</span>
            </h1>

            <p className="hero-description">
              Demuestra cuánto sabes de fútbol. Predice los resultados,
              gana puntos y compite con tus amigos para convertirte
              en el campeón de MundialPredict.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-btn"
                onClick={() => abrirModal(usuario ? 'perfil' : 'registro')}
              >
                COMENZAR A JUGAR <span>→</span>
              </button>

              <a href="#partidos" className="outline-btn">
                EXPLORAR PARTIDOS
              </a>
            </div>

            <div className="hero-note">
              <span className="live-dot" />
              UNA PREDICCIÓN PUEDE CAMBIARLO TODO
            </div>
          </div>

          <div className="hero-side">
            <div className="world-card">
              <div className="world-card-top">
                <span className="badge">EDICIÓN 2026</span>
                <span>🌎</span>
              </div>

              <p className="world-overline">EL TORNEO MÁS ESPERADO</p>

              <h2>
                WORLD
                <br />
                <span>CUP 2026</span>
              </h2>

              <div className="world-divider" />

              <div className="world-info">
                <div>
                  <strong>48</strong>
                  <span>SELECCIONES</span>
                </div>
                <div>
                  <strong>104</strong>
                  <span>PARTIDOS</span>
                </div>
              </div>

              <div className="world-ball">⚽</div>
            </div>
          </div>

          <div className="hero-scroll">
            DESCUBRE LA COMPETENCIA <span>↓</span>
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-item">
            <strong>48</strong>
            <span>Selecciones</span>
          </div>
          <div className="stat-item">
            <strong>104</strong>
            <span>Partidos</span>
          </div>
          <div className="stat-item">
            <strong>3</strong>
            <span>Países anfitriones</span>
          </div>
          <div className="stat-item">
            <strong>∞</strong>
            <span>Emociones</span>
          </div>
        </section>

        <section className="content-section" id="partidos">
          <div className="section-heading">
            <div>
              <p className="section-tag">⚽ LA COMPETENCIA COMIENZA</p>
              <h2>
                PARTIDOS <span>DESTACADOS</span>
              </h2>
              <p className="section-subtitle">
                Elige tus marcadores y demuestra que eres un experto.
              </p>
            </div>

            <span className="section-counter">
              03 ENCUENTROS DE EJEMPLO
            </span>
          </div>

          <div className="matches-grid">
            {partidosIniciales.map(partido => {
              const p = predicciones[partido.id] || {}

              return (
                <article className="match-card" key={partido.id}>
                  <div className="match-card-header">
                    <span>{partido.grupo}</span>
                    <span className="match-status">
                      ● DEMOSTRACIÓN
                    </span>
                  </div>

                  <p className="match-date">{partido.fecha}</p>

                  <div className="match-teams">
                    <div className="match-team">
                      <span className="team-flag">
                        {partido.banderaLocal}
                      </span>
                      <strong>{partido.local}</strong>
                    </div>

                    <div className="match-vs">VS</div>

                    <div className="match-team">
                      <span className="team-flag">
                        {partido.banderaVisitante}
                      </span>
                      <strong>{partido.visitante}</strong>
                    </div>
                  </div>

                  <div className="prediction-area">
                    <p>MI PREDICCIÓN</p>

                    <div className="score-inputs">
                      <input
                        type="number"
                        min="0"
                        max="99"
                        placeholder="0"
                        aria-label={`Goles de ${partido.local}`}
                        value={p.local ?? ''}
                        onChange={e =>
                          actualizarMarcador(
                            partido.id,
                            'local',
                            e.target.value
                          )
                        }
                      />

                      <span>:</span>

                      <input
                        type="number"
                        min="0"
                        max="99"
                        placeholder="0"
                        aria-label={`Goles de ${partido.visitante}`}
                        value={p.visitante ?? ''}
                        onChange={e =>
                          actualizarMarcador(
                            partido.id,
                            'visitante',
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <button
                      className="save-prediction"
                      onClick={() => guardarPrediccion(partido.id)}
                    >
                      {p.guardada
                        ? '✓ PREDICCIÓN GUARDADA'
                        : 'GUARDAR PREDICCIÓN →'}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>

          <p className="demo-notice">
            Estos encuentros son ejemplos visuales para probar la plataforma.
            No representan el calendario oficial del torneo.
          </p>
        </section>

        <section className="how-section">
          <div className="section-heading centered">
            <p className="section-tag">ASÍ DE FÁCIL ES COMPETIR</p>
            <h2>
              TRES PASOS PARA <span>GANAR</span>
            </h2>
          </div>

          <div className="steps-grid">
            <article className="step-card">
              <span className="step-number">01</span>
              <div className="step-icon">👤</div>
              <h3>CREA TU CUENTA</h3>
              <p>
                Regístrate y forma parte de la comunidad MundialPredict.
              </p>
            </article>

            <article className="step-card">
              <span className="step-number">02</span>
              <div className="step-icon">⚽</div>
              <h3>HAZ TUS PREDICCIONES</h3>
              <p>
                Pronostica los marcadores antes de que comience cada partido.
              </p>
            </article>

            <article className="step-card">
              <span className="step-number">03</span>
              <div className="step-icon">🏆</div>
              <h3>GANA PUNTOS</h3>
              <p>
                Acumula puntos y escala posiciones en la clasificación.
              </p>
            </article>
          </div>
        </section>

        <section className="content-section ranking-section" id="ranking">
          <div className="section-heading">
            <div>
              <p className="section-tag">🥇 LOS MEJORES JUGADORES</p>
              <h2>
                EL GRAN <span>RANKING</span>
              </h2>
              <p className="section-subtitle">
                Cada acierto te acerca a la cima.
              </p>
            </div>

            <span className="section-counter">
              CLASIFICACIÓN DE EJEMPLO
            </span>
          </div>

          <div className="ranking-layout">
            <div className="ranking-card">
              <div className="ranking-trophy">🏆</div>
              <p className="section-tag">EL OBJETIVO ES UNO</p>
              <h3>
                CONVIÉRTETE EN EL
                <br />
                <span>CAMPEÓN</span>
              </h3>
              <p>
                Demuestra tu conocimiento y conquista el primer lugar.
              </p>

              <button
                className="primary-btn"
                onClick={() => abrirModal(usuario ? 'perfil' : 'registro')}
              >
                {usuario ? 'VER MI PERFIL →' : 'UNIRME AHORA →'}
              </button>
            </div>

            <div className="leaderboard">
              <div className="leaderboard-title">
                <h3>TOP JUGADORES</h3>
                <span>🏅</span>
              </div>

              {ranking.slice(0, 5).map((jugador, index) => (
                <div
                  className={`leader-row ${jugador.propio ? 'my-row' : ''}`}
                  key={`${jugador.nombre}-${index}`}
                >
                  <span className={`rank-number rank-${index + 1}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="rank-avatar">{jugador.pais}</span>

                  <strong>{jugador.nombre}</strong>

                  {jugador.propio && (
                    <span className="you-label">TÚ</span>
                  )}

                  <span className="rank-points">
                    {jugador.puntos} <small>PTS</small>
                  </span>
                </div>
              ))}

              <p className="ranking-footnote">
                Puntuaciones de demostración. El ranking real se conectará
                al backend.
              </p>
            </div>
          </div>
        </section>

        <section className="content-section groups-section" id="grupos">
          <div className="section-heading">
            <div>
              <p className="section-tag">👥 JUEGA CON TUS AMIGOS</p>
              <h2>
                GRUPOS <span>PRIVADOS</span>
              </h2>
              <p className="section-subtitle">
                Crea tu propia competencia e invita a tus amigos.
              </p>
            </div>

            <button
              className="primary-btn"
              onClick={() =>
                usuario ? abrirModal('grupo') : abrirModal('login')
              }
            >
              + CREAR GRUPO
            </button>
          </div>

          {grupos.length > 0 ? (
            <div className="groups-grid">
              {grupos.map(grupo => (
                <article className="group-card" key={grupo.id}>
                  <div className="group-icon">👥</div>
                  <span className="badge">GRUPO PRIVADO</span>
                  <h3>{grupo.nombre}</h3>
                  <p>{grupo.descripcion}</p>

                  <div className="group-meta">
                    <span>👤 {grupo.participantes} participante</span>
                    <strong>{grupo.codigo}</strong>
                  </div>

                  <button
                    className="save-prediction"
                    onClick={() => copiarCodigo(grupo.codigo)}
                  >
                    COPIAR INVITACIÓN →
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-groups">
              <span>👥</span>
              <h3>TU COMPETENCIA, TUS REGLAS</h3>
              <p>
                Aún no tienes grupos. Crea uno e invita a tus amigos.
              </p>

              <button
                className="outline-btn"
                onClick={() =>
                  usuario ? abrirModal('grupo') : abrirModal('registro')
                }
              >
                CREAR MI PRIMER GRUPO
              </button>
            </div>
          )}
        </section>

        <section className="points-section">
          <div>
            <p className="section-tag">📊 SISTEMA DE PUNTUACIÓN</p>
            <h2>
              CADA ACIERTO <span>CUENTA.</span>
            </h2>
            <p>
              Cuanto más se acerque tu predicción al resultado real,
              más puntos podrás conseguir.
            </p>
          </div>

          <div className="points-list">
            <div>
              <strong>5 PTS</strong>
              <span>Marcador exacto</span>
            </div>
            <div>
              <strong>3 PTS</strong>
              <span>Ganador o empate correcto</span>
            </div>
            <div>
              <strong>2 PTS</strong>
              <span>Diferencia de goles correcta</span>
            </div>
            <div>
              <strong>+2 PTS</strong>
              <span>Racha de 3 aciertos consecutivos</span>
            </div>
            <div>
              <strong>+1 PTS</strong>
              <span>Predicción con más de 24 horas de anticipación</span>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="cta-content">
            <p className="section-tag">🏆 TU HISTORIA COMIENZA AQUÍ</p>
            <h2>
              ¿ESTÁS LISTO PARA
              <br />
              <span>SER EL CAMPEÓN?</span>
            </h2>
            <p>
              Crea tu cuenta, predice, compite y demuestra cuánto sabes
              de fútbol.
            </p>

            <button
              className="primary-btn"
              onClick={() => abrirModal(usuario ? 'perfil' : 'registro')}
            >
              {usuario
                ? 'IR A MI PERFIL →'
                : 'UNIRME A LA COMPETENCIA →'}
            </button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a href="#inicio" className="logo">
          ⚽ MUNDIAL<span className="logo-green">PREDICT</span>
        </a>

        <p>La emoción del fútbol está en tus predicciones.</p>

        <div className="footer-bottom">
          <span>© 2026 MundialPredict. Proyecto académico.</span>
          <a href="#inicio">VOLVER ARRIBA ↑</a>
        </div>
      </footer>

      {notificacion && (
        <div className="toast">
          <span>✓</span> {notificacion}
        </div>
      )}

      {modal && (
        <div
          className="modal-overlay"
          onClick={() => setModal('')}
        >
          <div
            className="auth-modal"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="close-modal"
              onClick={() => setModal('')}
              aria-label="Cerrar"
            >
              ×
            </button>

            {modal === 'perfil' && (
              <>
                <div className="profile-avatar">👤</div>
                <p className="section-tag">MI CUENTA</p>
                <h2>¡HOLA, {usuario}!</h2>

                <p className="modal-description">
                  Este es tu resumen de actividad en MundialPredict.
                </p>

                <div className="profile-stats">
                  <div>
                    <strong>{totalPredicciones}</strong>
                    <span>Predicciones guardadas</span>
                  </div>

                  <div>
                    <strong>{miPuntuacion}</strong>
                    <span>Puntos</span>
                  </div>

                  <div>
                    <strong>{grupos.length}</strong>
                    <span>Grupos creados</span>
                  </div>
                </div>

                <p className="section-tag">TIPO DE CUENTA: {rol}</p>

                <button
                  className="primary-btn submit-btn"
                  onClick={() => setModal('')}
                >
                  CONTINUAR
                </button>
              </>
            )}

            {modal === 'grupo' && (
              <>
                <p className="section-tag">👥 MUNDIALPREDICT</p>
                <h2>CREAR GRUPO</h2>

                <p className="modal-description">
                  Crea una competencia privada para jugar con tus amigos.
                </p>

                <form onSubmit={crearGrupo}>
                  <label>Nombre del grupo</label>
                  <input
                    type="text"
                    placeholder="Ej. Los cracks del barrio"
                    value={nombreGrupo}
                    onChange={e => setNombreGrupo(e.target.value)}
                    maxLength={40}
                    required
                  />

                  <label>Descripción</label>
                  <input
                    type="text"
                    placeholder="Describe tu competencia"
                    value={descripcionGrupo}
                    onChange={e => setDescripcionGrupo(e.target.value)}
                    maxLength={100}
                  />

                  <button className="primary-btn submit-btn" type="submit">
                    CREAR MI GRUPO →
                  </button>
                </form>
              </>
            )}

            {(modal === 'login' || modal === 'registro') && (
              <>
                <p className="section-tag">⚽ MUNDIALPREDICT</p>

                <h2>
                  {modal === 'login'
                    ? 'BIENVENIDO DE NUEVO'
                    : 'ÚNETE AL JUEGO'}
                </h2>

                <p className="modal-description">
                  {modal === 'login'
                    ? 'Ingresa a tu cuenta y continúa compitiendo.'
                    : 'Crea tu cuenta y comienza a realizar predicciones.'}
                </p>

                <form onSubmit={enviarFormulario}>
                  {modal === 'registro' && (
                    <>
                      <label>Nombre completo</label>
                      <input
                        type="text"
                        placeholder="Tu nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        maxLength={80}
                        required
                      />
                    </>
                  )}

                  <label>Correo electrónico</label>
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={correo}
                    onChange={e => setCorreo(e.target.value)}
                    required
                  />

                  <label>Contraseña</label>
                  <input
                    type="password"
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    minLength={6}
                    required
                  />

                  {mensaje && (
                    <p className="form-message">{mensaje}</p>
                  )}

                  <button
                    className="primary-btn submit-btn"
                    type="submit"
                    disabled={cargando}
                  >
                    {cargando
                      ? 'PROCESANDO...'
                      : modal === 'login'
                        ? 'INICIAR SESIÓN →'
                        : 'CREAR MI CUENTA →'}
                  </button>
                </form>

                <p className="switch-auth">
                  {modal === 'login'
                    ? '¿Todavía no tienes cuenta?'
                    : '¿Ya tienes una cuenta?'}
                  {' '}

                  <button
                    onClick={() => {
                      setModal(modal === 'login' ? 'registro' : 'login')
                      setMensaje('')
                      setPassword('')
                    }}
                  >
                    {modal === 'login'
                      ? 'Regístrate'
                      : 'Inicia sesión'}
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
