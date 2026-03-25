import heroMeat from "@/assets/hero-meat.jpg";
import cattleFarm from "@/assets/cattle-farm.jpg";
import logoRed from "@/assets/jb-carnes-logo-red.jpeg";
import logoDark from "@/assets/jb-carnes-logo-dark.jpeg";
import slideSelecao from "@/assets/slide-selecao.jpg";
import slideRelacionamentos from "@/assets/slide-relacionamentos.jpg";
import slideDistribuicao from "@/assets/slide-distribuicao.jpg";
import slideExpertise from "@/assets/slide-expertise.jpg";
import slideExpertiseMobile from "@/assets/slide-expertise-mobile.jpg";
import slideQualidade from "@/assets/slide-qualidade.jpg";
import { useEffect, useRef, useState } from "react";

/* ────────────────────────────────────────────────
   Intersection Observer hook for scroll animations
──────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ────────────────────────────────────────────────
   NAVBAR
──────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { label: "Início", id: "hero" },
    { label: "Sobre", id: "sobre" },
    { label: "Serviços", id: "servicos" },
    { label: "Contato", id: "contato" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? "bg-brand-dark-brown/95 backdrop-blur-sm shadow-lg py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <img
          src={logoDark}
          alt="JB Carnes Atacadista"
          className="h-16 md:h-20 w-auto object-contain rounded"
        />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="font-body text-brand-beige hover:text-brand-red transition-colors text-sm font-semibold tracking-wide uppercase"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="https://wa.me/5565999978325"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-brand-red hover:bg-brand-red/90 text-primary-foreground font-body font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-hero"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Fale Conosco
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-brand-beige transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-brand-beige transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-brand-beige transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-brand-dark-brown/98 border-t border-brand-red/20 py-4">
          <div className="container mx-auto flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-body text-brand-beige hover:text-brand-red hover:bg-brand-red/10 transition-colors text-sm font-semibold tracking-wide uppercase text-left px-2 py-3 rounded-lg"
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://wa.me/5565999978325"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 bg-brand-red text-primary-foreground font-body font-bold text-sm px-5 py-3 rounded-full"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Fale Conosco
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ────────────────────────────────────────────────
   HERO
──────────────────────────────────────────────── */
function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroMeat}
          alt="Carnes premium JB Carnes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Decorative line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red opacity-60" />

      <div className="container mx-auto relative z-10 pt-28 pb-32 px-4">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-brand-red/20 border border-brand-red/40 px-3 py-1.5 rounded-full mb-5 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-brand-red block" />
            <span className="text-brand-beige font-body text-xs font-semibold uppercase tracking-widest">
              Atacadista — Cuiabá, MT
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-brand-beige leading-tight mb-4 animate-fade-up">
            Tradição e{" "}
            <span className="text-brand-red">Qualidade</span>
            <br />
            em Carnes
          </h1>
          <p className="font-body text-brand-beige/80 text-base md:text-xl leading-relaxed mb-8 max-w-xl animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Há mais de <strong className="text-brand-beige">13 anos</strong> no mercado, a JB Carnes conecta os melhores bovinos ao seu negócio — com expertise, confiança e distribuição para todo o Brasil.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <button
              onClick={() => scrollTo("servicos")}
              className="bg-brand-red hover:bg-brand-red/90 text-primary-foreground font-body font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-hero hover:-translate-y-0.5 text-center"
            >
              Nossos Serviços
            </button>
            <button
              onClick={() => scrollTo("sobre")}
              className="border-2 border-brand-beige/60 hover:border-brand-beige text-brand-beige font-body font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-brand-beige/10 text-center"
            >
              Conheça a Empresa
            </button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-brand-dark-brown/90 backdrop-blur-sm border-t border-brand-red/30">
        <div className="container mx-auto py-4 grid grid-cols-3 divide-x divide-brand-red/30">
          {[
            { value: "+13", label: "Anos de Mercado" },
            { value: "+50", label: "Anos de Experiência" },
            { value: "MT+", label: "Atend. Nacional" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center px-2 sm:px-4">
              <span className="font-display text-2xl sm:text-3xl font-bold text-brand-red">{stat.value}</span>
              <span className="font-body text-brand-beige/70 text-[10px] sm:text-xs uppercase tracking-wide mt-0.5 text-center">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   ABOUT
──────────────────────────────────────────────── */
function About() {
  const { ref, inView } = useInView();
  const { ref: imgRef, inView: imgInView } = useInView();

  return (
    <section id="sobre" className="py-16 md:py-24 bg-brand-light-beige overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image side */}
          <div
            ref={imgRef}
            className={`relative transition-all duration-700 ${imgInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              <img
                src={cattleFarm}
                alt="Rebanho bovino JB Carnes"
                className="w-full h-[280px] sm:h-[360px] md:h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-brown/60 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-3 md:-bottom-6 md:-right-6 bg-brand-red rounded-2xl p-4 md:p-6 shadow-hero">
              <p className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">+13</p>
              <p className="font-body text-primary-foreground/80 text-xs md:text-sm">anos no<br />mercado</p>
            </div>
            {/* Decorative */}
            <div className="absolute -top-4 -left-4 w-16 h-16 md:w-24 md:h-24 border-2 border-brand-red/30 rounded-2xl -z-10" />
          </div>

          {/* Text side */}
          <div
            ref={ref}
            className={`transition-all duration-700 delay-200 mt-6 md:mt-0 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <span className="section-divider mb-6" />
            <p className="font-body text-brand-red font-bold text-sm uppercase tracking-widest mb-3">
              Nossa História
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-brand-brown leading-tight mb-6">
              Mais de meio século de <span className="text-brand-red">paixão</span> pelo setor
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-5">
              Fundada pelo Sr. <strong className="text-brand-brown">João Batista</strong>, profissional com mais de <strong className="text-brand-brown">50 anos de experiência</strong> no setor de bovinocultura e comercialização de carnes, a JB Carnes Atacadista possui sólida atuação há mais de 13 anos no mercado.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Ao longo de sua trajetória, o fundador consolidou amplo conhecimento técnico e operacional, construindo uma reputação baseada na <strong className="text-brand-brown">confiança</strong>, na qualidade dos produtos e no relacionamento duradouro com clientes e fornecedores de todo o Brasil.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { icon: "Award", title: "Qualidade", desc: "Seleção rigorosa dos melhores bovinos" },
                { icon: "Handshake", title: "Confiança", desc: "Relacionamentos sólidos e duradouros" },
                { icon: "MapPin", title: "Alcance", desc: "Distribuição para múltiplos estados" },
                { icon: "Briefcase", title: "Experiência", desc: "+50 anos de expertise no segmento" },
              ].map((v) => (
                <div key={v.title} className="flex items-start gap-3 p-3 md:p-4 bg-card rounded-xl shadow-card">
                  <span className="text-xl md:text-2xl mt-0.5">{v.icon}</span>
                  <div>
                    <p className="font-body font-bold text-brand-brown text-sm">{v.title}</p>
                    <p className="font-body text-muted-foreground text-xs mt-0.5">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   MISSION / VISION / VALUES
──────────────────────────────────────────────── */
function MissionVisionValues() {
  const { ref, inView } = useInView();

  const cards = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="7" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="11" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Nossa Missão",
      text: "Conectar os melhores bovinos aos nossos clientes com qualidade, transparência e agilidade, superando expectativas e entregando produtos que fazem a diferença no dia a dia de cada negócio.",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Nossa Visão",
      text: "Ser reconhecida como a principal referência em comercialização e distribuição de bovinos no Centro-Oeste e no Brasil, gerando valor para clientes, parceiros e para a cadeia produtiva da carne.",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
      title: "Nossos Valores",
      values: ["Determinação", "Honestidade", "Qualidade", "Confiança", "Foco no Cliente"],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-10 md:mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="section-divider mx-auto mb-6" />
          <p className="font-body text-brand-red font-bold text-sm uppercase tracking-widest mb-3">
            Quem Somos
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-brand-brown leading-tight">
            Missão, Visão e <span className="text-brand-red">Valores</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className={`bg-card rounded-2xl p-8 flex flex-col items-center text-center shadow-card transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
              {/* Icon circle */}
              <div className="w-16 h-16 rounded-full bg-brand-red/10 flex items-center justify-center mb-5 text-brand-red">
                {card.icon}
              </div>

              <h3 className="font-display text-xl text-brand-red font-bold mb-4">{card.title}</h3>

              {card.text && (
                <p className="font-body text-foreground/70 leading-relaxed text-sm md:text-base">{card.text}</p>
              )}

              {card.values && (
                <ul className="w-full text-left space-y-3 mt-1">
                  {card.values.map((v) => (
                    <li key={v} className="flex items-center gap-3 font-body text-foreground/80 text-sm md:text-base">
                      <span className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </span>
                      {v}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   SERVICES
──────────────────────────────────────────────── */
function Services() {
  const { ref, inView } = useInView();

  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Compra de Bovinos",
      desc: "Realizamos a compra estratégica de bovinos com criteriosa seleção de fornecedores, garantindo qualidade e rastreabilidade.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      ),
      title: "Distribuição de Carnes",
      desc: "Distribuição de carnes bovinas para Cuiabá e diversos outros estados, com logística eficiente e entregas pontuais.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
        </svg>
      ),
      title: "Atendimento a Açougues",
      desc: "Fornecimento para açougues e mercados com produtos de alta qualidade e condições comerciais diferenciadas.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
        </svg>
      ),
      title: "Clientes Institucionais",
      desc: "Atendemos distribuidores e clientes institucionais com volume e regularidade, garantindo abastecimento contínuo.",
    },
  ];

  return (
    <section id="servicos" className="py-16 md:py-24 bg-brand-dark-brown relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-red blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-brand-beige blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 px-4">
        {/* Header */}
        <div ref={ref} className={`text-center mb-10 md:mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-divider mx-auto mb-6" />
          <p className="font-body text-brand-red font-bold text-sm uppercase tracking-widest mb-3">
            O Que Fazemos
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-brand-beige leading-tight">
            Produtos e <span className="text-brand-red">Serviços</span>
          </h2>
          <p className="font-body text-brand-beige/60 mt-4 max-w-xl mx-auto text-sm md:text-base">
            Da compra criteriosa do bovino à entrega no seu estabelecimento — todo o processo com qualidade e eficiência.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`group p-5 md:p-6 rounded-2xl border border-brand-red/20 bg-brand-brown/30 hover:bg-brand-red/10 hover:border-brand-red/50 transition-all duration-400 cursor-default ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className="text-brand-red mb-4 group-hover:scale-110 transition-transform duration-300">
                {s.icon}
              </div>
              <h3 className="font-display text-lg text-brand-beige mb-2">{s.title}</h3>
              <p className="font-body text-brand-beige/60 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Coverage banner */}
        <div className="mt-10 md:mt-16 p-6 md:p-8 rounded-2xl bg-brand-red/10 border border-brand-red/30 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-center md:text-left">
            <h3 className="font-display text-xl md:text-2xl text-brand-beige mb-1">Atendemos todo o Brasil</h3>
            <p className="font-body text-brand-beige/60 text-sm">
              Cuiabá e outros estados — distribuidores, mercados, açougues e clientes institucionais.
            </p>
          </div>
          <a
            href="https://wa.me/5565999978325"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto text-center shrink-0 bg-brand-red hover:bg-brand-red/90 text-primary-foreground font-body font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-hero"
          >
            Solicitar Orçamento
          </a>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   DIFFERENTIALS — fullscreen slide carousel
──────────────────────────────────────────────── */
function Differentials() {
  const [active, setActive] = useState(0);

  const slides = [
    {
      overlayColor: "bg-brand-red/75",
      numberBg: "bg-brand-dark-brown",
      img: slideSelecao,
      title: "Seleção Criteriosa de Bovinos",
      desc: "Cada compra começa com uma análise técnica rigorosa. Selecionamos fornecedores e animais com base em critérios de qualidade, rastreabilidade e sanidade, garantindo um produto final superior para nossos clientes.",
    },
    {
      overlayColor: "bg-brand-dark-brown/80",
      numberBg: "bg-brand-red",
      img: slideRelacionamentos,
      title: "Relacionamentos de Longo Prazo",
      desc: "Construímos parcerias sólidas e duradouras com produtores e frigoríficos de confiança em todo o território nacional, sustentadas por mais de 50 anos de atuação no setor.",
    },
    {
      overlayColor: "bg-brand-red/75",
      numberBg: "bg-brand-dark-brown",
      img: slideDistribuicao,
      title: "Distribuição para Todo o Brasil",
      desc: "Atendemos Cuiabá e diversos estados com logística eficiente e entregas pontuais, abastecendo açougues, mercados, distribuidores e clientes institucionais com regularidade e confiança.",
    },
    {
      overlayColor: "bg-brand-dark-brown/80",
      numberBg: "bg-brand-red",
      img: slideExpertise,
      imgMobile: slideExpertiseMobile,
      title: "Expertise de Meio Século",
      desc: "Fundada pelo Sr. João Batista, com mais de 50 anos de experiência no setor de bovinocultura, a JB Carnes transforma conhecimento acumulado em decisões assertivas e resultados para os clientes.",
    },
    {
      overlayColor: "bg-brand-red/75",
      numberBg: "bg-brand-dark-brown",
      img: slideQualidade,
      title: "Compromisso com Qualidade",
      desc: "Da compra do bovino até a entrega do produto, cada etapa é conduzida com responsabilidade e foco total na qualidade — porque reputação é o ativo mais valioso que construímos em mais de 13 anos de mercado.",
    },
  ];

  // No auto-advance — only user interaction changes the slide

  const goTo = (i: number) => setActive(i);
  const goPrev = () => setActive((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setActive((prev) => (prev + 1) % slides.length);

  const current = slides[active];
  // Display number always reflects the real slide index (starts at 1)
  const displayNumber = String(active + 1).padStart(2, "0");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background photo with transition */}
      <picture key={`bg-${active}`} className="absolute inset-0 w-full h-full">
        {current.imgMobile && (
          <source media="(max-width: 767px)" srcSet={current.imgMobile} />
        )}
        <img
          src={current.img}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-full h-full object-cover animate-fade-in"
        />
      </picture>
      {/* Color overlay — keeps brand identity */}
      <div className={`absolute inset-0 transition-colors duration-700 ${current.overlayColor}`} />
      {/* Vignette for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 sm:px-10 max-w-2xl mx-auto py-28 md:py-32">
        {/* Number badge */}
        <div
          key={`badge-${active}`}
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${current.numberBg} flex items-center justify-center mb-7 shadow-hero animate-fade-in`}
        >
          <span className="font-display text-2xl sm:text-3xl font-bold text-primary-foreground">{displayNumber}</span>
        </div>

        {/* Title */}
        <h2
          key={`title-${active}`}
          className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-primary-foreground leading-tight mb-5 animate-fade-up"
        >
          {current.title}
        </h2>

        {/* Description */}
        <p
          key={`desc-${active}`}
          className="font-body text-primary-foreground/85 text-sm sm:text-base md:text-lg leading-relaxed animate-fade-up max-w-xl"
          style={{ animationDelay: "0.1s" }}
        >
          {current.desc}
        </p>

        {/* Slide counter */}
        <p className="font-body text-primary-foreground/50 text-xs mt-6 tracking-widest uppercase">
          {active + 1} / {slides.length}
        </p>

        {/* Prev / Next arrows */}
        <div className="flex items-center gap-5 mt-6">
          <button
            onClick={goPrev}
            className="w-11 h-11 rounded-full border-2 border-primary-foreground/40 hover:border-primary-foreground flex items-center justify-center text-primary-foreground transition-all duration-200 hover:bg-primary-foreground/10 active:scale-95"
            aria-label="Anterior"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="w-11 h-11 rounded-full border-2 border-primary-foreground/40 hover:border-primary-foreground flex items-center justify-center text-primary-foreground transition-all duration-200 hover:bg-primary-foreground/10 active:scale-95"
            aria-label="Próximo"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dot navigation — right side (desktop) */}
      <div className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`rounded-full border-2 transition-all duration-300 ${
              i === active
                ? "w-3 h-3 bg-primary-foreground border-primary-foreground scale-125"
                : "w-2.5 h-2.5 bg-transparent border-primary-foreground/50 hover:border-primary-foreground hover:scale-110"
            }`}
          />
        ))}
      </div>

      {/* Dots bottom — mobile */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 md:hidden">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`rounded-full border-2 transition-all duration-300 ${
              i === active
                ? "w-3 h-3 bg-primary-foreground border-primary-foreground"
                : "w-2.5 h-2.5 bg-transparent border-primary-foreground/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   COMMITMENT — Socio-environmental section
──────────────────────────────────────────────── */
function Commitment() {
  const { ref, inView } = useInView();

  const items = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12c0 .778.099 1.533.284 2.253" />
        </svg>
      ),
      title: "Desmatamento Zero",
      desc: "Não adquirimos gado de áreas com desmatamento ilegal, conforme monitoramento na Amazônia Legal e Maranhão.",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
      ),
      title: "Proteção de Terras Indígenas",
      desc: "Respeito integral aos limites de Terras Indígenas e Unidades de Conservação.",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
        </svg>
      ),
      title: "Rastreabilidade",
      desc: "Monitoramento constante da cadeia produtiva para assegurar que cada animal esteja livre de embargos ambientais.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-brand-light-beige overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-10 md:mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="section-divider mx-auto mb-6" />
          <p className="font-body text-brand-red font-bold text-sm uppercase tracking-widest mb-3">
            Responsabilidade
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-brand-brown leading-tight">
            Compromisso <span className="text-brand-red">Socioambiental</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto text-sm md:text-base">
            Operamos com rigor ético e ambiental em toda a cadeia produtiva, cumprindo exigências legais e contribuindo para um agronegócio mais sustentável.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`bg-card rounded-2xl p-6 md:p-7 flex flex-col shadow-card border border-border transition-all duration-700 hover:-translate-y-1 hover:shadow-hero ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 120 + 200}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-brand-red/10 flex items-center justify-center mb-5 text-brand-red shrink-0">
                {item.icon}
              </div>
              <h3 className="font-display text-lg text-brand-brown font-bold mb-2">{item.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   CONTACT / FOOTER
──────────────────────────────────────────────── */
function Contact() {
  const { ref, inView } = useInView();

  return (
    <section id="contato" className="gradient-section py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`max-w-2xl mx-auto text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="section-divider mx-auto mb-6" />
          <p className="font-body text-brand-red font-bold text-sm uppercase tracking-widest mb-3">Contato</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-brand-beige mb-4">
            Vamos <span className="text-brand-red">Conversar</span>?
          </h2>
          <p className="font-body text-brand-beige/60 mb-10 text-sm md:text-base">
            Entre em contato e saiba como a JB Carnes pode ser o parceiro ideal para o seu negócio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="https://wa.me/5565999978325"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20b858] text-primary-foreground font-body font-bold text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-hero"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar pelo WhatsApp
            </a>
            <a
              href="mailto:contato@jbcarnesmt.com.br"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-red hover:bg-brand-red/90 text-primary-foreground font-body font-bold text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-hero"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Enviar E-mail
            </a>
          </div>

          <div className="border-t border-brand-red/20 pt-8 mt-4">
            <img
              src={logoDark}
              alt="JB Carnes Atacadista"
              className="h-14 md:h-16 w-auto object-contain mx-auto rounded mb-4"
            />
            <p className="font-body text-brand-beige/40 text-xs">
              © {new Date().getFullYear()} JB Carnes Atacadista. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   PAGE
──────────────────────────────────────────────── */
const Index = () => (
  <div className="min-h-screen font-body">
    <Navbar />
    <Hero />
    <About />
    <MissionVisionValues />
    <Services />
    <Commitment />
    <Differentials />
    <Contact />
  </div>
);

export default Index;
