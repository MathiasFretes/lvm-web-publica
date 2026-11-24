# Pantallas públicas reutilizadas de V0

Copia de las pantallas y sus componentes desde `C:/la-voz-misionera-v0/src`, realizada el 20 de noviembre de 2026 por instrucción del usuario. Se conservaron también los cambios locales existentes en esa carpeta, que no fue modificada. No se copiaron `.env`, credenciales, Firebase, el panel de administración ni paquetes instalados.

`src/legacy/LegacySite.jsx` integra las pantallas con rutas web y navegación móvil; Vite transforma React Native a React Native Web. El adaptador de gradientes usa CSS y el servicio de contenido consulta PostgreSQL mediante la API de la suite. No se carga el SDK de Firebase ni se inicia su autenticación.

Contacto, oración, visitas y boletín guardan solicitudes en el inbox privado del VPS. Se retiraron números bancarios de ejemplo y confirmaciones de pago ficticias. No hay procesamiento de donaciones ni correos automáticos configurados. El contenido editorial anterior que está escrito dentro de las pantallas se conserva; las colecciones dinámicas parten vacías, según la elección del usuario. El panel administrativo vive en LVM Service, no en estas pantallas ni en Worship.
