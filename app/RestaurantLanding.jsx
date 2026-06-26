"use client";

import { useEffect, useMemo, useState } from "react";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Carta", href: "#carta" },
  { label: "Reservas", href: "#reservas" },
  { label: "Eventos", href: "#eventos" },
  { label: "Galería", href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
];

const categories = [
  { id: "principales", label: "Principales" },
  { id: "pastas", label: "Pastas" },
  { id: "entradas", label: "Entradas" },
  { id: "postres", label: "Postres" },
];

const dishes = [
  {
    category: "principales",
    title: "Ojo de bife al Malbec",
    detail: "Corte madurado, reducción de Malbec y papas rotas.",
    price: "$24.900",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "pastas",
    title: "Raviolones de osobuco",
    detail: "Pasta casera, fondo oscuro, gremolata y queso curado.",
    price: "$16.900",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "principales",
    title: "Milanesa Uspallata",
    detail: "Ternera, pomodoro, mozzarella y papas españolas.",
    price: "$18.500",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "entradas",
    title: "Provoleta al hierro",
    detail: "Tomates confitados, orégano fresco y pan de campo.",
    price: "$8.900",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "entradas",
    title: "Empanadas cortadas a cuchillo",
    detail: "Carne braseada, huevo, aceitunas y salsa criolla.",
    price: "$6.400",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "postres",
    title: "Flan mixto de vainilla",
    detail: "Huevos de campo, crema y dulce de leche familiar.",
    price: "$6.900",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85",
  },
];

const gallery = [
  {
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
    alt: "Salón cálido de bodegón elegante",
  },
  {
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=900&q=85",
    alt: "Cocina profesional emplatando",
  },
  {
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=85",
    alt: "Copas de vino argentino",
  },
];

const quotes = [
  {
    text: "El lugar tiene alma, la comida es excelente y el servicio impecable.",
    author: "Martín P. - Barracas",
  },
  {
    text: "Volver a Uspallata es como volver a casa. Siempre una experiencia única.",
    author: "Carolina M. - San Telmo",
  },
  {
    text: "Los mejores raviolones que probé en Buenos Aires. Inolvidables.",
    author: "Juan V. - La Boca",
  },
];

const times = ["20:00", "20:30", "21:00", "21:30", "22:00", "22:30"];

function whatsappUrl(message) {
  return `https://wa.me/5491123456789?text=${encodeURIComponent(message)}`;
}

export default function RestaurantLanding() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [category, setCategory] = useState("principales");
  const [selectedTime, setSelectedTime] = useState("20:30");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2 personas");
  const [dateMin, setDateMin] = useState("");

  const visibleDishes = useMemo(() => dishes.filter((dish) => dish.category === category), [category]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);

    onScroll();
    setDateMin(new Date().toISOString().split("T")[0]);
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function reserveMessage() {
    return `Hola Uspallata Bodegón, quiero reservar una mesa para ${guests} el ${
      date || "día elegido"
    } a las ${selectedTime}.`;
  }

  return (
    <div className="site-shell">
      <header className={`topbar ${scrolled ? "is-scrolled" : ""}`}>
        <a className="wordmark" href="#inicio" aria-label="Inicio Uspallata Bodegón">
          <span>Uspallata</span>
          <small>Bodegón</small>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-expanded={navOpen}
          aria-controls="main-navigation"
          onClick={() => setNavOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span className="sr-only">Abrir navegación</span>
        </button>

        <nav className={`main-nav ${navOpen ? "is-open" : ""}`} id="main-navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setNavOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="nav-cta shimmer" href="#reservas">
          Reservar mesa
        </a>
      </header>

      <main className="page-frame">
        <section className="hero-board" id="inicio">
          <div className="hero-copy reveal">
            <span className="kicker">Cocina porteña, vinos argentinos</span>
            <h1>Hay lugares donde uno va a comer. Y otros donde vuelve a encontrarse.</h1>
            <p>Cocina porteña. Vinos argentinos. Mesas que guardan historias.</p>
            <div className="hero-actions">
              <a className="button button-gold shimmer" href="#reservas">
                Reservar mesa
              </a>
              <a className="button button-ghost" href="#carta">
                Ver carta
              </a>
            </div>
          </div>

          <div className="hero-ornament" aria-hidden="true"></div>
        </section>

        <section className="story-strip" id="galeria">
          <article className="paper-panel story-copy reveal">
            <span className="section-label">Nuestra historia</span>
            <h2>Las mejores recetas nunca empiezan en una cocina. Empiezan en una familia.</h2>
            <p>
              Desde hace más de cuatro décadas, mantenemos viva la esencia del bodegón porteño:
              buenos vinos, cocina argentina y la calidez de un salón que se siente como un punto de
              encuentro del barrio.
            </p>
            <a href="#eventos">Conocé nuestra historia</a>
          </article>

          <div className="archive-photo reveal">
            <img
              src="https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=80"
              alt="Fotografía antigua del frente de un restaurante"
            />
            <span>Uspallata - 1984</span>
          </div>
        </section>

        <section className="specials-section" id="eventos">
          <div className="section-title reveal">
            <span>Especialidades de la casa</span>
          </div>
          <div className="specials-grid">
            {dishes.slice(0, 4).map((dish) => (
              <article className="special-card reveal" key={dish.title}>
                <img src={dish.image} alt={dish.title} />
                <div>
                  <h3>{dish.title}</h3>
                  <p>{dish.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="conversion-grid">
          <article className="menu-preview reveal" id="carta">
            <span className="section-label">Carta</span>
            <h2>Una carta para disfrutar sin apuros.</h2>
            <p>Platos clásicos, ingredientes de calidad y recetas que honran la tradición.</p>
            <div className="category-pills" role="tablist" aria-label="Categorías de carta">
              {categories.map((item) => (
                <button
                  className={category === item.id ? "active" : ""}
                  key={item.id}
                  type="button"
                  aria-selected={category === item.id}
                  onClick={() => setCategory(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="dish-list" aria-live="polite">
              {visibleDishes.map((dish) => (
                <div className="dish-row" key={dish.title}>
                  <span>{dish.title}</span>
                  <strong>{dish.price}</strong>
                </div>
              ))}
            </div>
            <a className="button button-ghost" href="#reservas">
              Reservar y pedir sugerencia
            </a>
          </article>

          <article className="booking-panel reveal" id="reservas">
            <span className="section-label">Reservas</span>
            <h2>Tu mesa te espera.</h2>
            <p>Elegí el día, horario y cantidad de personas. Confirmamos por WhatsApp.</p>
            <div className="booking-form">
              <label>
                Fecha
                <input type="date" min={dateMin} value={date} onChange={(event) => setDate(event.target.value)} />
              </label>
              <label>
                Personas
                <select value={guests} onChange={(event) => setGuests(event.target.value)}>
                  <option>2 personas</option>
                  <option>3 personas</option>
                  <option>4 personas</option>
                  <option>5 personas</option>
                  <option>6+ personas</option>
                </select>
              </label>
              <div className="hours">
                {times.map((time) => (
                  <button
                    className={selectedTime === time ? "selected" : ""}
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <a className="button button-gold shimmer" href={whatsappUrl(reserveMessage())} target="_blank" rel="noreferrer">
                Reservar ahora
              </a>
            </div>
          </article>

          <article className="delivery-panel reveal">
            <span className="section-label">Delivery</span>
            <h2>Llevamos el bodegón a tu casa.</h2>
            <p>Zonas de cobertura: San Telmo, Barracas, La Boca y alrededores.</p>
            <div className="coverage-map" aria-label="Mapa visual de cobertura de delivery">
              <span className="zone san-telmo">San Telmo</span>
              <span className="zone barracas">Barracas</span>
              <span className="zone la-boca">La Boca</span>
              <strong>Uspallata</strong>
            </div>
            <a
              className="button button-gold shimmer"
              href={whatsappUrl("Hola Uspallata Bodegón, quiero hacer un pedido.")}
              target="_blank"
              rel="noreferrer"
            >
              Pedir por WhatsApp
            </a>
          </article>
        </section>

        <section className="editorial-gallery">
          {gallery.map((item) => (
            <img className="reveal" src={item.image} alt={item.alt} key={item.alt} />
          ))}
        </section>

        <section className="quotes-band">
          {quotes.map((quote) => (
            <blockquote className="reveal" key={quote.author}>
              <p>{quote.text}</p>
              <cite>{quote.author}</cite>
            </blockquote>
          ))}
        </section>
      </main>

      <footer className="footer-board" id="contacto">
        <div>
          <a className="footer-brand" href="#inicio">
            <span>UB</span>
            Uspallata Bodegón
          </a>
          <p>Tradición porteña, vinos argentinos y servicio cálido en un salón contemporáneo.</p>
        </div>
        <div>
          <strong>Ubicación</strong>
          <p>Av. Uspallata 1842, Buenos Aires</p>
          <p>Lun a sáb 12:00 a 00:30</p>
          <p>+54 11 2345-6789</p>
        </div>
        <div>
          <strong>Contacto</strong>
          <p>reservas@uspallatabodegon.com</p>
          <p>@uspallatabodegon</p>
        </div>
        <div>
          <strong>Convertí la visita en reserva</strong>
          <a className="button button-gold shimmer" href="#reservas">
            Reservar ahora
          </a>
        </div>
      </footer>
    </div>
  );
}
