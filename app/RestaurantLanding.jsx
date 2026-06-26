"use client";

import { useEffect, useMemo, useState } from "react";

const navItems = ["Inicio", "Carta", "Reservas", "Eventos", "Galería", "Contacto"];

const menuItems = [
  {
    category: "entradas",
    label: "Entrada",
    title: "Provoleta de la casa",
    description: "Queso dorado al hierro, tomates confitados, orégano fresco y pan de campo.",
    price: "$8.900",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=80",
    alt: "Provoleta dorada con hierbas",
  },
  {
    category: "entradas",
    label: "Entrada",
    title: "Empanadas cortadas a cuchillo",
    description: "Masa hojaldrada, carne braseada, huevo, aceitunas y salsa criolla ahumada.",
    price: "$6.400",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80",
    alt: "Empanadas criollas en plato de cerámica",
  },
  {
    category: "entradas",
    label: "Entrada",
    title: "Picada Uspallata",
    description: "Selección de fiambres, quesos estacionados, berenjenas y focaccia tibia.",
    price: "$14.200",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80",
    alt: "Tabla de fiambres y quesos",
  },
  {
    category: "principales",
    label: "Principal",
    title: "Ojo de bife al Malbec",
    description: "Corte madurado, reducción de Malbec, papas rotas y vegetales de estación.",
    price: "$24.900",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80",
    alt: "Bife servido con papas doradas",
  },
  {
    category: "principales",
    label: "Principal",
    title: "Milanesa porteña premium",
    description: "Ternera apanada, pomodoro, mozzarella fior di latte, jamón natural y papas.",
    price: "$18.500",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    alt: "Milanesa napolitana con guarnición",
  },
  {
    category: "principales",
    label: "Principal",
    title: "Surubí dorado a la plancha",
    description: "Manteca avellanada, limón quemado, puré de coliflor y hojas amargas.",
    price: "$21.300",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    alt: "Pescado de río con vegetales",
  },
  {
    category: "pastas",
    label: "Pasta",
    title: "Ravioles de osobuco",
    description: "Pasta casera, fondo oscuro, gremolata y queso curado rallado en mesa.",
    price: "$16.900",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=900&q=80",
    alt: "Pasta casera con salsa",
  },
  {
    category: "pastas",
    label: "Pasta",
    title: "Ñoquis de papa quemada",
    description: "Crema de hongos, salvia crocante, nuez moscada y aceite de oliva mendocino.",
    price: "$14.800",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80",
    alt: "Ñoquis con salsa cremosa",
  },
  {
    category: "pastas",
    label: "Pasta",
    title: "Tallarines de bodegón",
    description: "Salsa fileto larga cocción, albóndigas de ternera y albahaca fresca.",
    price: "$13.900",
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=80",
    alt: "Spaghetti con tomate",
  },
  {
    category: "postres",
    label: "Postre",
    title: "Flan mixto de vainilla",
    description: "Huevos de campo, crema batida a mano y dulce de leche familiar.",
    price: "$6.900",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
    alt: "Flan con dulce de leche",
  },
  {
    category: "postres",
    label: "Postre",
    title: "Panqueque quemado",
    description: "Dulce de leche, azúcar caramelizada, helado de crema y nuez tostada.",
    price: "$7.400",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80",
    alt: "Panqueque con dulce de leche",
  },
  {
    category: "postres",
    label: "Postre",
    title: "Tarta tibia de manzana",
    description: "Masa quebrada, manzanas especiadas, crema inglesa y almendras.",
    price: "$7.100",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=80",
    alt: "Tarta tibia de manzana",
  },
];

const categories = [
  { id: "entradas", label: "Entradas" },
  { id: "principales", label: "Principales" },
  { id: "pastas", label: "Pastas" },
  { id: "postres", label: "Postres" },
];

const times = ["20:00", "20:30", "21:00", "21:30", "22:00", "22:30"];

const specialties = [
  {
    className: "feature-card large reveal",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    alt: "Mesa elegante con platos y vino",
    label: "Casa llena",
    title: "Menú bodegón de pasos",
    description: "Una experiencia para grupos con entrada compartida, principales al centro y vinos sugeridos.",
  },
  {
    className: "feature-card reveal",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=80",
    alt: "Chef terminando un plato",
    label: "Fuego y oficio",
    title: "Cortes seleccionados",
    description: "Maduración controlada y puntos exactos para carnes con carácter.",
  },
  {
    className: "feature-card reveal",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80",
    alt: "Copas de vino en cava",
    label: "Cava argentina",
    title: "Maridajes de autor",
    description: "Etiquetas de pequeños productores y clásicos mendocinos.",
  },
];

const timeline = [
  {
    year: "1984",
    title: "La primera mesa familiar",
    description: "La receta de la abuela Uspallata empieza a servirse en reuniones de barrio.",
  },
  {
    year: "2006",
    title: "El bodegón toma forma",
    description: "La cocina crece con pastas caseras, carnes al hierro y una carta de vinos porteña.",
  },
  {
    year: "2026",
    title: "Tradición contemporánea",
    description: "Un nuevo salón honra lo clásico con diseño refinado y servicio preciso.",
  },
];

const gallery = [
  {
    className: "reveal",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    alt: "Salón de restaurante cálido",
  },
  {
    className: "reveal tall",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80",
    alt: "Mesas servidas en restaurante elegante",
  },
  {
    className: "reveal",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1200&q=80",
    alt: "Chef emplatando en cocina",
  },
  {
    className: "reveal wide",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1400&q=80",
    alt: "Brindis en mesa de restaurante",
  },
];

const testimonials = [
  {
    quote: "Tiene alma de bodegón y servicio de restaurante premium. La milanesa es impecable.",
    author: "Lucía R. · San Telmo",
  },
  {
    quote: "Reservamos para un cumpleaños y todo estuvo cuidado: vinos, tiempos y ambiente.",
    author: "Martín P. · Barracas",
  },
  {
    quote: "El ojo de bife y los ravioles justifican volver. Elegante sin perder calidez.",
    author: "Carolina M. · Palermo",
  },
];

function slugForNav(label) {
  return label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("entradas");
  const [selectedTime, setSelectedTime] = useState("20:30");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dateMin, setDateMin] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2 personas");

  const visibleMenuItems = useMemo(
    () => menuItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 20);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    setDateMin(new Date().toISOString().split("T")[0]);

    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    return () => {
      window.removeEventListener("scroll", updateHeader);
      revealObserver.disconnect();
    };
  }, []);

  function requestReservation() {
    const text = encodeURIComponent(
      `Hola Uspallata Bodegón, quiero reservar una mesa para ${guests} el ${
        date || "la fecha elegida"
      } a las ${selectedTime}.`
    );

    window.open(`https://wa.me/5491123456789?text=${text}`, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <header className={`site-header ${isScrolled ? "scrolled" : ""}`} aria-label="Navegación principal">
        <a className="brand" href="#inicio" aria-label="Uspallata Bodegón inicio">
          <span className="brand-mark">UB</span>
          <span>Uspallata Bodegón</span>
        </a>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={isNavOpen}
          aria-controls="site-nav"
          onClick={() => setIsNavOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
          <span className="sr-only">Abrir menú</span>
        </button>
        <nav className={`site-nav ${isNavOpen ? "open" : ""}`} id="site-nav">
          {navItems.map((item) => (
            <a key={item} href={`#${slugForNav(item)}`} onClick={() => setIsNavOpen(false)}>
              {item}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio" aria-label="Presentación Uspallata Bodegón">
          <div
            className="hero-media"
            role="img"
            aria-label="Salón elegante de bodegón porteño iluminado cálidamente"
          ></div>
          <div className="hero-overlay"></div>
          <div className="hero-content reveal">
            <span className="eyebrow">Bodegón porteño contemporáneo</span>
            <h1>Uspallata Bodegón. Tradición porteña. Sabores que invitan a volver.</h1>
            <p>
              Cocina honesta, fuego lento y una sala cálida donde cada detalle honra los clásicos de
              Buenos Aires con una mirada actual.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary shimmer" href="#reservas">
                Reservar mesa
              </a>
              <a className="btn btn-secondary" href="#carta">
                Ver carta
              </a>
            </div>
          </div>
          <div className="hero-card reveal" aria-label="Información destacada">
            <span>Hoy</span>
            <strong>Ojo de bife al Malbec</strong>
            <small>Servicio de cena desde las 20:00</small>
          </div>
        </section>

        <section className="section intro-section">
          <div className="intro-grid">
            <article className="intro-copy reveal">
              <span className="eyebrow">Calidez, tradición y oficio</span>
              <h2>La mesa porteña elevada a una experiencia de categoría.</h2>
              <p>
                En Uspallata Bodegón conviven los manteles crema, el brillo del dorado envejecido y
                el aroma de una cocina que respeta el producto. Cada plato nace de recetas conocidas,
                ejecutadas con precisión y presentadas con sobriedad.
              </p>
            </article>
            <div className="stats reveal">
              <div>
                <strong>28</strong>
                <span>cubiertos íntimos</span>
              </div>
              <div>
                <strong>12</strong>
                <span>cortes y fuegos</span>
              </div>
              <div>
                <strong>90</strong>
                <span>etiquetas argentinas</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section menu-section" id="carta">
          <div className="section-heading reveal">
            <span className="eyebrow">Carta sin PDF</span>
            <h2>Platos clásicos, servidos con elegancia.</h2>
            <p>
              Una selección curada por categorías, pensada para recorrer la cocina de bodegón desde
              las entradas hasta los postres de sobremesa larga.
            </p>
          </div>

          <div className="menu-tabs reveal" role="tablist" aria-label="Categorías de carta">
            {categories.map((category) => (
              <button
                key={category.id}
                className={activeCategory === category.id ? "active" : ""}
                type="button"
                role="tab"
                aria-selected={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="menu-grid" aria-live="polite">
            {visibleMenuItems.map((item) => (
              <article className="menu-card reveal visible" key={item.title}>
                <img src={item.image} alt={item.alt} />
                <div>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <strong>{item.price}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section specialties" id="eventos">
          <div className="section-heading reveal">
            <span className="eyebrow">Especialidades y encuentros</span>
            <h2>Para cenas memorables, eventos íntimos y celebraciones porteñas.</h2>
          </div>
          <div className="specialty-grid">
            {specialties.map((item) => (
              <article className={item.className} key={item.title}>
                <img src={item.image} alt={item.alt} />
                <div>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section timeline-section">
          <div className="section-heading reveal">
            <span className="eyebrow">Nuestra historia</span>
            <h2>Una línea de tiempo hecha de barrio, cocina y hospitalidad.</h2>
          </div>
          <div className="timeline">
            {timeline.map((item) => (
              <article className="timeline-item reveal" key={item.year}>
                <span>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section gallery-section" id="galeria">
          <div className="section-heading reveal">
            <span className="eyebrow">Galería editorial</span>
            <h2>Postales de una noche en Uspallata.</h2>
          </div>
          <div className="gallery-grid">
            {gallery.map((item) => (
              <img className={item.className} src={item.image} alt={item.alt} key={item.alt} />
            ))}
          </div>
        </section>

        <section className="section testimonials">
          <div className="section-heading reveal">
            <span className="eyebrow">Voces de la mesa</span>
            <h2>Clientes que vuelven por el sabor y se quedan por el trato.</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <blockquote className="reveal" key={testimonial.author}>
                <p>"{testimonial.quote}"</p>
                <cite>{testimonial.author}</cite>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="section reservations" id="reservas">
          <div className="reservation-panel reveal">
            <div className="reservation-copy">
              <span className="eyebrow">Reservas</span>
              <h2>Elegí día, horario y asegurá tu mesa.</h2>
              <p>
                Nuestro equipo confirma cada reserva para garantizar una experiencia fluida desde la
                llegada hasta la sobremesa.
              </p>
              <a
                className="btn btn-primary shimmer"
                href="https://wa.me/5491123456789?text=Hola%20Uspallata%20Bodeg%C3%B3n%2C%20quiero%20reservar%20una%20mesa"
                target="_blank"
                rel="noreferrer"
              >
                Confirmar por WhatsApp
              </a>
            </div>
            <form className="booking-card" aria-label="Sistema visual de reservas">
              <label>
                Fecha
                <input
                  type="date"
                  name="date"
                  min={dateMin}
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </label>
              <label>
                Personas
                <select name="guests" value={guests} onChange={(event) => setGuests(event.target.value)}>
                  <option>2 personas</option>
                  <option>3 personas</option>
                  <option>4 personas</option>
                  <option>5 personas</option>
                  <option>6+ personas</option>
                </select>
              </label>
              <div className="time-picker" aria-label="Selección de horario">
                {times.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={selectedTime === time ? "selected" : ""}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <button className="btn btn-secondary full" type="button" onClick={requestReservation}>
                Solicitar reserva
              </button>
            </form>
          </div>
        </section>

        <section className="section delivery">
          <div className="delivery-grid">
            <div className="map-card reveal" aria-label="Mapa de cobertura de delivery">
              <div className="map-core">Uspallata</div>
              <span className="map-ring ring-one"></span>
              <span className="map-ring ring-two"></span>
              <span className="map-pin pin-one">San Telmo</span>
              <span className="map-pin pin-two">Barracas</span>
              <span className="map-pin pin-three">La Boca</span>
            </div>
            <article className="delivery-copy reveal">
              <span className="eyebrow">Delivery cuidado</span>
              <h2>El bodegón también llega a casa.</h2>
              <p>
                Cobertura en San Telmo, Barracas, La Boca y alrededores. Enviamos platos preparados
                para conservar temperatura, textura y presentación.
              </p>
              <a
                className="btn btn-primary shimmer"
                href="https://wa.me/5491123456789?text=Hola%20Uspallata%20Bodeg%C3%B3n%2C%20quiero%20hacer%20un%20pedido"
                target="_blank"
                rel="noreferrer"
              >
                Pedir por WhatsApp
              </a>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer" id="contacto">
        <div>
          <a className="brand" href="#inicio">
            <span className="brand-mark">UB</span>
            <span>Uspallata Bodegón</span>
          </a>
          <p>Tradición porteña, vinos argentinos y servicio cálido en un salón de estética contemporánea.</p>
        </div>
        <address>
          <strong>Ubicación</strong>
          Av. Uspallata 1842, Buenos Aires
          <br />
          Lun a sáb · 12:00 a 00:30
          <br />
          <a href="tel:+541123456789">+54 11 2345-6789</a>
          <br />
          <a href="mailto:reservas@uspallatabodegon.com">reservas@uspallatabodegon.com</a>
        </address>
        <div>
          <strong>Convertí la visita en reserva</strong>
          <p>Mesas limitadas, atención personalizada y confirmación directa por WhatsApp.</p>
          <a className="btn btn-primary shimmer" href="#reservas">
            Reservar ahora
          </a>
        </div>
      </footer>
    </>
  );
}
