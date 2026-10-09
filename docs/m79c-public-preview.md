# M7.9C — Service → Web Pública

La página `/preview/import` acepta exclusivamente PublicContent 0.1 exportado desde **Contenido público** en LVM Service. Muestra el nombre del archivo, los conteos y las entidades antes de aplicarlo. El documento se guarda en `localStorage` del navegador de preview. Inicio, Eventos, Prédicas y Sedes leen el mismo documento; la opción **Restaurar fixtures** vuelve a los datos de demostración.

El contrato canónico está en `LVM Service/contracts/public-content-0.1.md`. Este sitio conserva una copia idéntica del parser en `src/data/publicContent.ts` porque los productos son repositorios independientes. El E2E en Service comprueba esa igualdad y el recorrido por archivos sin API ni Internet.

La preview no publica contenido, no conecta con PostgreSQL y no incluye Auth, CMS ni media transferida. El paso de contenido aprobado y alojado queda para M12/M13.
