Aplicación Full stack Node React: Lee archivo CSV y filtra resultados con una barra de búsqueda
Tomado de streamer MIDUDEV, "prueba tecnica de React Junior" (falta filtrado de datos)
https://www.youtube.com/watch?v=MmfoLqiu1A0&t=4060s

Backend:
instalar paquete plug'n'Play package manager (permite centralizar los modulos y referenciar desde cada proyecto):

> npm install -g pnpm

iniciar paquete JSON

> pnpm init

instalar paquete ts-node (permite el uso de node en typescript)

> pnpm install ts-node

instalar express cors (frameworkde node para apps web):

> pnpm install express cors

instalar definiciones de tipos de Node como dependencia del proyecto:

> pnpm i --save-dev @types/node
> pnpm i --save-dev @types/express
> pnpm i @types/multer -D

instalar multer para manejar la apertura de archivo

> pnpm i multer

conversor de formacto de archivo:

> pnpm i convert-csv-to-json

Frontend:

iniciar proyecto vite:

> pnpm create vite@latest

React, TypeScript + SWC.

> pnpm i
