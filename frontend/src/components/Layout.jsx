"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Layout.css"

const Layout = ({ children }) => {
  const [nombre, setNombre] = useState(localStorage.getItem("nombre"))
  const [rol, setRol] = useState(localStorage.getItem("rol"))
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isLoggedIn = !!rol

  useEffect(() => {
    const onStorage = () => {
      setNombre(localStorage.getItem("nombre"))
      setRol(localStorage.getItem("rol"))
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("storage", onStorage)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    window.dispatchEvent(new Event("storage"))
    window.location.href = "/"
    setMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    if (!mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  return (
    <div className="layout">
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">
          <Link to="/" className="logo">
            Pañalería <span>Claudia</span>
          </Link>
          <div className="nav-links">
            <Link to="/">Inicio</Link>
            <Link to="/productos">Productos</Link>
            <Link to="/promociones">Promociones</Link>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/contacto">Contacto</Link>
          </div>
          <div className="nav-actions">
            <button className="search-btn" aria-label="Buscar">
              <span role="img" aria-label="search">
                🔍
              </span>
            </button>
            <Link to="/cart" className="cart-btn">
              <span role="img" aria-label="cart">
                🛒
              </span>
              <span className="cart-count">0</span>
            </Link>
            {!isLoggedIn ? (
              <div className="auth-buttons">
                <Link to="/login" className="login-btn">
                  Iniciar Sesión
                </Link>
                <Link to="/registrar" className="register-btn">
                  Registrarse
                </Link>
              </div>
            ) : (
              <div className="user-menu">
                <span className="user-name">{nombre}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Cerrar sesión
                </button>
              </div>
            )}
            <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Menú">
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
            Pañalería <span>Claudia</span>
          </Link>
          <button className="close-menu" onClick={toggleMobileMenu} aria-label="Cerrar menú">
            ✕
          </button>
        </div>
        <div className="mobile-nav-links">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            Inicio
          </Link>
          <Link to="/productos" onClick={() => setMobileMenuOpen(false)}>
            Productos
          </Link>
          <Link to="/promociones" onClick={() => setMobileMenuOpen(false)}>
            Promociones
          </Link>
          <Link to="/nosotros" onClick={() => setMobileMenuOpen(false)}>
            Nosotros
          </Link>
          <Link to="/contacto" onClick={() => setMobileMenuOpen(false)}>
            Contacto
          </Link>
        </div>
        {!isLoggedIn ? (
          <div className="mobile-auth-buttons">
            <Link to="/login" className="login-btn" onClick={() => setMobileMenuOpen(false)}>
              Iniciar Sesión
            </Link>
            <Link to="/registrar" className="register-btn" onClick={() => setMobileMenuOpen(false)}>
              Registrarse
            </Link>
          </div>
        ) : (
          <div className="user-menu">
            <span className="user-name">{nombre}</span>
            <button onClick={handleLogout} className="logout-btn">
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

      <main>{children}</main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Pañalería Claudia</h3>
              <p>Todo lo que necesitas para el cuidado de tu bebé con la mejor calidad y precio.</p>
              <div className="social-links">
                <a href="#" aria-label="Facebook">
                  📱
                </a>
                <a href="#" aria-label="Instagram">
                  📱
                </a>
                <a href="#" aria-label="WhatsApp">
                  📱
                </a>
              </div>
            </div>
            <div className="footer-section">
              <h3>Enlaces</h3>
              <Link to="/">Inicio</Link>
              <Link to="/productos">Productos</Link>
              <Link to="/promociones">Promociones</Link>
              <Link to="/nosotros">Nosotros</Link>
              <Link to="/contacto">Contacto</Link>
            </div>
            <div className="footer-section">
              <h3>Contacto</h3>
              <p>📍 Av. Principal 123, Lima, Perú</p>
              <p>📞 +51 987 654 321</p>
              <p>✉️ contacto@panaleriaclaudia.com</p>
            </div>
            <div className="footer-section">
              <h3>Información</h3>
              <Link to="/terminos">Términos y condiciones</Link>
              <Link to="/privacidad">Política de privacidad</Link>
              <Link to="/envios">Política de envíos</Link>
              <Link to="/devoluciones">Devoluciones</Link>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} Pañalería Claudia. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
