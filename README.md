# Weather Crypto Widget

Weather Crypto Widget es un Web Component desarrollado con lit que entrega los datos del clima y el precio del bitcoin actuales.

## Entorno local

Primero es necesaria la instalación de dependencias

`npm install`

En el proyecto 'apps/api' existe el archivo .env.example, renombrarlo a .env y actualizar el valor de la variable 'WEATHERAPI_KEY'

`WEATHERAPI_KEY=api_key_enviada_por_email`

Para ejecutar todo el proyecto y ver la versión live corriendo ejecuta en el root del proyecto:

`npm run dev`

El comando anterior ejecuta los 3 proyectos involucrados y presenta el widget en una interfaz de prueba en http://localhost:3000 por defecto, en caso de no estar el puerto disponible la consola entregará otro punto de entrada alternativo.

## Arquitectura de la solución

API (fastify) -> Web Component (lit).

**API (fastify)**: se decidió fastify como framework para el desarrollo de la API por ser una alternativa más eficiente y con mejor experiencia para el desarrollador que Express, se documenta que fastify es 2x más rápido que Express.

**Web Component**: se decidió usar Web Component por sobre Module Federation principalmente porque al hablar de Web Component hablamos de un estándar versus Module Federation que si bien no hay problemas prácticos en una implementación, a largo plazo el mercado se ve más prometedor para Web Component al ser un estándar.

**Lit**: lit es un marco de trabajo muy liviano pero que encapsula mucho del código repetitivo del trabajo con Web Components y además facilita la programación reactiva lo cual permite hacer componentes dinámicos sin usar librerías más pesadas como react o angular.

**npm workspaces**: es una manera simple pero poderosa de versionar distintos proyectos relacionados entre sí

**Vitest**: es una alternativa mas rapida que su competidor mas cercano "Jest" y opera con ESM de manera nativa por lo que se integra mejor con Vite que es nuestra herramienta de desarrollo principal.

Otras alternativas exploradas:

- React + Vite + MF
- TanStack Query
- RTK Query
- Vanilla JS + Web Component
- Express
- Nx
- Java Spring boot
- Jest

## Registro de prompts de IA

**Prompt 1**: Dado este problema técnico ¿Qué arquitectura me recomiendas?

**Cómo me ayudó**: fue un gran punto de partida que me ayudó a no partir de cero o a usar las tecnologías que uso en mi día a día, la respuesta me permitió encontrar mucha documentación interesante y pude hacer una pequeña investigación antes de decidirme por la arquitectura

**Prompt 2**: Si Web Components es un estándar y Module Federation no, ¿por qué debería usar Module Federation?

**Cómo me ayudó**: este prompt me ayudó a resolver un cuestionamiento que tenía a la primera respuesta, quería entender por qué la IA estaba recomendando una tecnología por sobre otra y que me generaba dudas, luego de esto pude tomar mi propia decisión de arquitectura

**Prompt 3**: ¿Qué arquitectura me recomiendas para hacer mi API en Fastify considerando los requerimientos indicados? Considera headers con caché para que el cliente guarde el caché en sus llamadas

**Cómo me ayudó**: dado que no estaba al tanto de cómo trabajar en detalle con fastify, mi mayor experiencia es con Nestjs y Express, necesitaba entender cómo se estructura un proyecto en fastify, para orientarme en mi posterior documentación del framework

**Prompt 4**: Genera en ASCII distintas versiones del widget solicitado, necesito tener inspiración para el layout y la información que mostrará

**Cómo me ayudó**: antes de escribir código y generar plantillas, quería decidirme por un layout que me convenciera, y más allá de los estilos, quería ver rápidamente distintas configuraciones de widget que me avivaran la creatividad

**Prompt 5**: ¿Qué servicios de consulta de datos de Bitcoin y de clima me recomiendas dados estos requerimientos?

**Cómo me ayudó**: quería apoyarme del contexto de la IA e investigar directamente 3 o 4 servicios ya recomendados, así evitar navegar por google calificando yo esas primeras alternativas.

## Errores comunes

- Puertos no disponibles: en caso de tener otro proyecto que utilice los puertos 3000, 3001 o 3002 es posible que el comando `npm run dev` no sea capaz de resolver las rutas, en caso de tener este problema detiene las otras aplicaciones que estén utilizando dichos puertos
