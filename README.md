# LVM Web Pública

Sitio público nuevo de La Voz Misionera. Esta primera versión reconstruye la jerarquía de Inicio, Calendario/Eventos, Prédicas y Sedes de V0 con implementación propia, tokens LVM y datos de demostración. No publica horarios, direcciones, mensajes ni enlaces externos como datos reales.

```bash
npm ci
npm run dev
npm run build
```

La referencia de producto es `C:\la-voz-misionera-v0`, documentada en `LVM Service/docs/v0/public-screens.md`. No se importaron Expo, NativeBase, Firebase/Firestore ni componentes V0. El contenido definitivo tendrá como fuente de verdad LVM Service/Contenido y Operación cuando existan API, permisos y flujo de publicación. Esta preview no tiene CMS, Auth ni backend.

Consulta `docs/m79a-v0-decisions.md` para la decisión de migración de cada página y los límites de los fixtures.
