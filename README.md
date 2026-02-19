# Wheather Crypto Widget

Wheather Crypto Widget es un Web Component desarrollado con lit que entrega los datos del clima y el precio del bitcoin actuales.

## Entorno local

Primero es necesaria la instalacion de dependencias

`npm install`

Para ejecutar todo el proyecto y ver la version live corriendo ejecuta en el root del proyecto:

`npm run dev`

El comando anterior ejecuta los 3 proyectos involucrados y presenta el widget en una interfaz de prueba en http://localhost:3000 por defecto

## Arquitectura de la solucion

API (fastify) -> Web Component (lit) -> consumidor del web component

## Errores comunes

- Puertos no disponibles: en caso de tener otro proyecto que utilice los puertos 3000, 3001 o 3002 es posible que el comando `npm run dev` no sea capaz de resolver las rutas, en caso de tener este problema detiene las otras aplicaciones que esten utilizando dichos puertos
