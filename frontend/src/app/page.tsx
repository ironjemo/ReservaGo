import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* ============================================================
          NAVBAR
          ============================================================ */}
      <header className="border-b border-reservago-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="ReservaGo - Inicio"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-reservago-primary text-lg font-bold text-white">
              R
            </div>

            <span className="text-2xl font-bold tracking-tight text-slate-900">
              Reserva<span className="text-reservago-primary">Go</span>
            </span>
          </Link>

          {/* Navegación */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#alojamientos"
              className="text-sm font-medium text-slate-600 transition hover:text-reservago-primary"
            >
              Alojamientos
            </a>

            <a
              href="#como-funciona"
              className="text-sm font-medium text-slate-600 transition hover:text-reservago-primary"
            >
              Cómo funciona
            </a>

            <a
              href="#propietarios"
              className="text-sm font-medium text-slate-600 transition hover:text-reservago-primary"
            >
              Soy propietario
            </a>
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:block"
            >
              Ingresar
            </a>

            <a
              href="/register"
              className="rounded-lg bg-reservago-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-reservago-primary-dark"
            >
              Registrarse
            </a>
          </div>
        </div>
      </header>

      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="relative overflow-hidden bg-reservago-secondary">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-reservago-primary shadow-sm ring-1 ring-reservago-border">
              Descubre Antioquia
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Encuentra el lugar perfecto para tu próxima escapada
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Descubre fincas, casas campestres y apartamentos en los destinos
              más atractivos de Antioquia.
            </p>
          </div>

          {/* Buscador */}
          <div className="mt-10 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-200">
            <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
              {/* Destino */}
              <div className="rounded-xl border border-slate-200 px-4 py-3">
                <label
                  htmlFor="destino"
                  className="block text-xs font-bold uppercase tracking-wide text-slate-500"
                >
                  Destino
                </label>

                <input
                  id="destino"
                  type="text"
                  placeholder="¿A dónde quieres ir?"
                  className="mt-1 w-full border-none bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>

              {/* Entrada */}
              <div className="rounded-xl border border-slate-200 px-4 py-3">
                <label
                  htmlFor="entrada"
                  className="block text-xs font-bold uppercase tracking-wide text-slate-500"
                >
                  Entrada
                </label>

                <input
                  id="entrada"
                  type="date"
                  className="mt-1 w-full border-none bg-transparent text-sm text-slate-900 outline-none"
                />
              </div>

              {/* Salida */}
              <div className="rounded-xl border border-slate-200 px-4 py-3">
                <label
                  htmlFor="salida"
                  className="block text-xs font-bold uppercase tracking-wide text-slate-500"
                >
                  Salida
                </label>

                <input
                  id="salida"
                  type="date"
                  className="mt-1 w-full border-none bg-transparent text-sm text-slate-900 outline-none"
                />
              </div>

              {/* Huéspedes */}
              <div className="rounded-xl border border-slate-200 px-4 py-3">
                <label
                  htmlFor="huespedes"
                  className="block text-xs font-bold uppercase tracking-wide text-slate-500"
                >
                  Huéspedes
                </label>

                <select
                  id="huespedes"
                  className="mt-1 w-full border-none bg-transparent text-sm text-slate-900 outline-none"
                  defaultValue="2"
                >
                  <option value="1">1 huésped</option>
                  <option value="2">2 huéspedes</option>
                  <option value="3">3 huéspedes</option>
                  <option value="4">4 huéspedes</option>
                  <option value="5">5 huéspedes</option>
                  <option value="6">6 huéspedes</option>
                </select>
              </div>

              {/* Botón buscar */}
              <button
                type="button"
                className="rounded-xl bg-reservago-primary px-6 py-3 font-semibold text-white transition hover:bg-reservago-primary-dark"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ALOJAMIENTOS
          ============================================================ */}
      <section id="alojamientos">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-reservago-primary">
                Explora
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Alojamientos destacados
              </h2>

              <p className="mt-3 max-w-2xl text-slate-600">
                Encuentra espacios pensados para descansar, compartir y
                disfrutar de Antioquia.
              </p>
            </div>

            <button
              type="button"
              className="self-start text-sm font-semibold text-reservago-primary transition hover:text-reservago-primary-dark sm:self-auto"
            >
              Ver todos →
            </button>
          </div>

          {/* Tarjetas temporales */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <PropertyPlaceholder
              title="Fincas campestres"
              description="Espacios ideales para descansar y disfrutar de la naturaleza."
            />

            <PropertyPlaceholder
              title="Casas de descanso"
              description="Alojamientos para compartir momentos especiales con familia y amigos."
            />

            <PropertyPlaceholder
              title="Apartamentos"
              description="Opciones cómodas para tus viajes y escapadas."
            />
          </div>
        </div>
      </section>

      {/* ============================================================
          CÓMO FUNCIONA
          ============================================================ */}
      <section id="como-funciona" className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-reservago-primary">
              Reserva fácilmente
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              ¿Cómo funciona ReservaGo?
            </h2>

            <p className="mt-4 text-slate-600">
              Encuentra tu alojamiento, revisa la disponibilidad y realiza tu
              reserva de manera sencilla.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Step
              number="01"
              title="Busca"
              description="Explora propiedades según destino, fechas, capacidad y características."
            />

            <Step
              number="02"
              title="Elige"
              description="Consulta los detalles de cada propiedad y encuentra la opción que mejor se adapte a ti."
            />

            <Step
              number="03"
              title="Reserva"
              description="Selecciona tus fechas y solicita tu reserva de forma segura."
            />
          </div>
        </div>
      </section>

      {/* ============================================================
          PROPIETARIOS
          ============================================================ */}
      <section id="propietarios">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-reservago-primary px-8 py-12 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wider text-teal-100">
                Para propietarios
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Publica tu alojamiento en ReservaGo
              </h2>

              <p className="mt-4 text-base leading-7 text-teal-50">
                Administra tus propiedades, disponibilidad y reservas desde
                una plataforma pensada para facilitar la gestión de tus
                alojamientos.
              </p>
            </div>

            <a
              href="/register"
              className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-reservago-primary transition hover:bg-teal-50 lg:mt-0"
            >
              Comenzar ahora
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="border-t border-reservago-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} ReservaGo. Todos los derechos
            reservados.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="transition hover:text-reservago-primary"
            >
              Términos
            </a>

            <a
              href="#"
              className="transition hover:text-reservago-primary"
            >
              Privacidad
            </a>

            <a
              href="#"
              className="transition hover:text-reservago-primary"
            >
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ================================================================
   COMPONENTES AUXILIARES
   ================================================================ */

function PropertyPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-reservago-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-52 items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-reservago-secondary text-2xl text-reservago-primary">
            🏡
          </div>

          <p className="mt-3 text-sm font-medium text-slate-500">
            Próximamente
          </p>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {description}
        </p>

        <button
          type="button"
          className="mt-4 text-sm font-semibold text-reservago-primary hover:text-reservago-primary-dark"
        >
          Explorar →
        </button>
      </div>
    </article>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-reservago-border bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-reservago-secondary font-bold text-reservago-primary">
        {number}
      </div>

      <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>

      <p className="mt-3 leading-7 text-slate-600">{description}</p>
    </article>
  );
}