# LVM Web Pública

La publicación actual en el VPS reutiliza las 18 pantallas públicas de `C:/la-voz-misionera-v0`, copiadas en [`legacy-v0/`](legacy-v0/README.md). Conserva el diseño y contenido editorial existente, con navegación por URL y acceso a Worship en `/app`. Las colecciones dinámicas usan la API PostgreSQL de la suite; no Firebase. Contacto, oración, visitas y boletín se guardan en un inbox privado que se administra desde **LVM Service** (`/service/admin`). OAuth, email transaccional y pagos aún no están configurados. El modo preview descrito a continuación permanece como herramienta local de revisión, separado de la publicación.

Sitio público de La Voz Misionera. La preview M7.9A reconstruye la jerarquía de Inicio, Eventos, Prédicas y Sedes de V0 con implementación propia en React, TypeScript y Vite. Usa tokens LVM y datos de demostración. Ningún horario, dirección, mensaje o enlace externo del fixture debe interpretarse como contenido publicado.

## Navegación

| Ruta | Estado | Fuente actual |
| --- | --- | --- |
| `/` Inicio | Preview implementada | `src/data/preview.ts` |
| `/eventos` Eventos | Preview implementada | `src/data/preview.ts` |
| `/predicas` Prédicas | Preview implementada | `src/data/preview.ts` |
| `/sedes` Sedes | Preview implementada | `src/data/preview.ts` |
| `/preview/import` Cargar contenido | Preview implementada | Archivo PublicContent 0.1 de LVM Service |
| Nosotros | Planificada | LVM Service / Contenido |
| Ministerios | Planificada | LVM Service / Organización |
| Contacto | Planificada | LVM Service / Organización |

Las rutas planificadas no aparecen como enlaces funcionales hasta que exista contenido aprobado y una implementación real.

## Desarrollo local

```bash
npm ci
npm run dev
npm run build
npm run build:preview
npm test
npm run test:e2e
```

El código de fixtures está aislado en `src/data/preview.ts`. Al importar un PublicContent 0.1, Inicio, Eventos, Prédicas y Sedes leen el documento local importado en lugar de esos fixtures. Se puede restaurar el estado de ejemplo desde `/preview/import`; no se publica nada en Internet. El contrato está documentado en `docs/m79c-public-preview.md`.

`npm run build:preview` habilita las pantallas y herramientas de demostración para el gate M7.9. El build normal (`npm run build`) publica las 18 pantallas V0 mediante `src/legacy/LegacySite.jsx`; no publica los fixtures ni el cargador M7.9. Sus colecciones dinámicas leen solo documentos publicados, sin cookies de administrador.

Los tests de navegador usan `npm run build:preview` y comprueban navegación, interacciones y ausencia de overflow a 390, 768, 1024 y 1440 px. Las capturas de referencia están en `docs/screenshots/`.

La referencia de producto es V0, documentada en `LVM Service/docs/v0/public-screens.md`. La preview M7.9 es una implementación propia; el sitio de producción reutiliza una copia de los componentes V0 con React Native Web y adaptadores de PostgreSQL, sin runtime Firebase. LVM Service administra seis colecciones desde `/service/content`, separando borradores y publicaciones. El calendario muestra fechas reales del contenido publicado y las prédicas abren sus enlaces publicados. El resto del CMS y las acciones heredadas aún requieren revisión.

Consulta `docs/m79a-v0-decisions.md` para la decisión de migración de cada página y los límites de los fixtures.
