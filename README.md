# LVM Web Pública

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
npm test
npm run test:e2e
```

El código de fixtures está aislado en `src/data/preview.ts`. Al importar un PublicContent 0.1, Inicio, Eventos, Prédicas y Sedes leen el documento local importado en lugar de esos fixtures. Se puede restaurar el estado de ejemplo desde `/preview/import`; no se publica nada en Internet. El contrato está documentado en `docs/m79c-public-preview.md`.

Los tests de navegador arrancan una preview local del build y comprueban navegación, interacciones y ausencia de overflow a 390, 768, 1024 y 1440 px. Las capturas de referencia están en `docs/screenshots/`.

La referencia de producto es V0, documentada en `LVM Service/docs/v0/public-screens.md`. No se importaron Expo, NativeBase, Firebase/Firestore ni componentes V0. El contenido definitivo tendrá como fuente de verdad LVM Service/Contenido y Operación cuando existan API, permisos y flujo de publicación. Esta preview no tiene CMS, Auth ni backend.

Consulta `docs/m79a-v0-decisions.md` para la decisión de migración de cada página y los límites de los fixtures.
