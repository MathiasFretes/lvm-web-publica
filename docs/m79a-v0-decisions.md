# M7.9A — decisiones de migración V0

Esta preview toma la UX/UI de V0 como referencia principal. Es una implementación nueva en React, TypeScript y Vite; no importa código, Expo, NativeBase, Firebase/Firestore ni imágenes de V0. La foto hero fue generada para LVM y guardada en `public/images/hero-comunidad.webp`. El contenido de `src/data/preview.ts` es demostrativo y visible como tal en todas las páginas.

| Página | Ficha V0 | Decisión | Se conserva | Cambia y motivo | Dueño / fuente futura |
| --- | --- | --- | --- | --- | --- |
| Inicio | `LVM Service/docs/v0/public-screens.md#inicio-inicio--adaptar` | ADAPTAR | Hero de bienvenida, navy/dorado, CTA, accesos a agenda, enseñanzas y sedes | Hero original; CTA sólo a rutas implementadas; sin carrusel, transmisión o donaciones simuladas | Web Pública presenta; LVM Service/Contenido publica el material editorial |
| Eventos | `LVM Service/docs/v0/public-screens.md#calendario-calendario--adaptar` | ADAPTAR | Cabecera, calendario mensual, indicadores y próximos encuentros | Fechas de ejemplo, mes navegable y días seleccionables; no conexión a Firestore | LVM Service/Operación será fuente de eventos y horarios |
| Prédicas | `LVM Service/docs/v0/public-screens.md#prédicas-predicas--adaptar` | ADAPTAR | Cabecera, series, tarjetas y descubrimiento | Búsqueda y filtros funcionales; resumen local; se omite CTA de biblioteca con callback vacío y video sin URL publicada | LVM Service/Contenido será fuente de prédicas publicadas |
| Sedes | `LVM Service/docs/v0/public-screens.md#sedes-sedes--adaptar` | ADAPTAR | Lista/selector de sedes y detalle en panel | Dirección, horarios y mapa no se inventan; se indica publicación pendiente | LVM Service/Organización será fuente de sedes y horarios |

## Gate de esta preview

- Rutas reales: `/`, `/eventos`, `/predicas`, `/sedes` y 404.
- Shell común: header, menú móvil, navegación inferior y footer; foco visible y enlace para saltar al contenido.
- 1440, 1024, 768 y 390 px sin overflow horizontal, comprobados por Playwright.
- Calendario, filtros, búsqueda, selección de sede y navegación móvil son interacciones reales.
- `npm run build`, `npm test` y `npm run test:e2e` pasan en Windows.
- Capturas [Inicio desktop](screenshots/inicio-desktop.jpg) / [móvil](screenshots/inicio-mobile.jpg), [Eventos desktop](screenshots/eventos-desktop.jpg) / [móvil](screenshots/eventos-mobile.jpg), [Prédicas desktop](screenshots/predicas-desktop.jpg) / [móvil](screenshots/predicas-mobile.jpg), [Sedes desktop](screenshots/sedes-desktop.jpg) / [móvil](screenshots/sedes-mobile.jpg).

La preview aún no cumple el gate de **migración productiva** del mapa V0: no hay API/repository de LVM Service, publicación editorial, datos aprobados ni estados de loading/error remoto. Esos estados pertenecen al slice posterior Service → Web Pública. No se considera contenido público listo para deployment.
