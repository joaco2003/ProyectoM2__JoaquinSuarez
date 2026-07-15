# 🚀 MiniBlog API - DevSpark Backend

Una API REST robusta y documentada construida para el servicio de contenidos de **DevSpark**. Este backend permite gestionar autores, publicaciones y comentarios, sirviendo como base sólida para futuras integraciones del frontend.

**URL en producción:** [https://proyectom2joaquinsuarez-production.up.railway.app/](https://proyectom2joaquinsuarez-production.up.railway.app/)
**Swagger UI:** [https://proyectom2joaquinsuarez-production.up.railway.app/api-docs/](https://proyectom2joaquinsuarez-production.up.railway.app/api-docs/)

---

## 🛠️ Tecnologías Utilizadas

* **Entorno de ejecución:** Node.js
* **Framework:** Express.js
* **Base de Datos:** PostgreSQL (paquete `pg` nativo)
* **Documentación:** Swagger (OpenAPI 3.0)
* **Testing:** Jest & Supertest
* **Despliegue:** Railway

---

## ⚙️ Requisitos Previos

Antes de ejecutar este proyecto localmente, asegúrate de tener instalado:
* [Node.js](https://nodejs.org/) (v18 o superior recomendado)
* [PostgreSQL](https://www.postgresql.org/) (Corriendo localmente)

---

## 🚀 Instalación y Uso Local

**1. Clonar el repositorio e instalar dependencias:**
```bash
git clone [https://github.com/joaco2003/ProyectoM2__JoaquinSuarez](https://github.com/joaco2003/ProyectoM2__JoaquinSuarez)
cd miniblog-api
npm install
```

---

## 📡 Endpoints Principales

* **Autores:** `GET`, `POST`, `PUT`, `DELETE` en `/authors`
* **Publicaciones:** `GET`, `POST`, `PUT`, `DELETE` en `/posts`
* **Publicaciones por Autor:** `GET` en `/posts/author/:authorId`
* **Comentarios (Extra Credit):** `GET`, `POST`, `DELETE` en `/comments`

---

## 🧪 Pruebas (Testing)

El proyecto cuenta con pruebas de integración utilizando Jest y Supertest para validar la creación de entidades, manejo de errores y borrado en cascada.

Para ejecutar los tests, utiliza:
```bash
npm test
```

---

## ☁️ Pasos de Configuración en Railway

**Base de Datos:** Se provisionó un servicio de PostgreSQL dentro de Railway. Esto genera una *Internal URL* que se utiliza para que el backend se conecte de forma segura a la base de datos sin exponerla a internet.

**Servicio Web:** Se conectó el repositorio de GitHub para despliegue automático.

**Variables de Entorno (Env Variables):** En la configuración del servicio web de Railway se establecieron las siguientes variables:
* `DATABASE_URL`: Vinculada automáticamente a la base de datos PostgreSQL de Railway (`${{Postgres.DATABASE_URL}}`).
* `NODE_ENV`: `production`
* `PORT`: `3000` (Manejado internamente por Railway).

---

## 🤖 Registro del uso de AI en el proyecto

Durante el desarrollo de esta API, se utilizó Gemini (Google) como asistente de programación y debugging. Sus principales aportes fueron:

* **Arquitectura y Boilerplate:** Generación de la estructura inicial de carpetas y código base para Express y el manejo de consultas SQL nativas con el paquete `pg`.
* **Debugging de Base de Datos:** Asistencia fundamental para resolver errores de autenticación local (`password authentication failed for user 'postgres'`), diagnosticando y guiando en la modificación de los archivos `pg_hba.conf` (configuración de IPv4 e IPv6 a `trust`) para restaurar el acceso.