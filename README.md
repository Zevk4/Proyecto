# Proyecto Level-UP Integración

Este proyecto consiste en una aplicación Frontend construida con React y TypeScript, y una aplicación Backend construida con Spring Boot y Java.

## Tabla de Contenidos
1.  [Prerrequisitos](#prerrequisitos)
2.  [Configuración del Frontend](#configuración-del-frontend)
    *   [Tecnologías](#tecnologías-frontend)
    *   [Instalación](#instalación-frontend)
    *   [Ejecutar la Aplicación](#ejecutar-la-aplicación-frontend)
    *   [Pruebas](#pruebas-frontend)
3.  [Configuración del Backend](#configuración-del-backend)
    *   [Tecnologías](#tecnologías-backend)
    *   [Instalación](#instalación-backend)
    *   [Configuración de Base de Datos](#configuración-de-base-de-datos)
    *   [Ejecutar la Aplicación](#ejecutar-la-aplicación-backend)
    *   [Pruebas](#pruebas-backend)
4.  [Swagger UI (Documentación de la API)](#swagger-ui-documentación-de-la-api)

## 1. Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

*   **Node.js**: [Descargar e Instalar Node.js](https://nodejs.org/) (incluye npm)
*   **Java Development Kit (JDK) 22**: [Descargar e Instalar JDK 22](https://www.oracle.com/java/technologies/downloads/)
*   **Maven**: [Descargar e Instalar Maven](https://maven.apache.org/download.cgi)
*   **MySQL Server**: [Descargar e Instalar MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

## 2. Configuración del Frontend

El frontend es una aplicación React desarrollada con TypeScript.

### Tecnologías Frontend

*   **React**: `^19.2.0`
*   **TypeScript**: `^4.9.5`
*   **React Router DOM**: `^7.9.5`
*   **Axios**: Para peticiones a la API.
*   **Bootstrap**: `^5.3.8` (para componentes de UI).
*   **TailwindCSS**: (Dependencia de desarrollo para estilos).

### Instalación Frontend

1.  Navega al directorio `Frontend`:
```bash
    cd Frontend
```
2.  Instala las dependencias del proyecto:
```bash
    npm install
```

### Ejecutar la Aplicación Frontend

1.  Desde el directorio `Frontend`, inicia el servidor de desarrollo:
```bash
    npm start
```
2.  La aplicación debería abrirse en tu navegador, generalmente en `http://localhost:3000`.

### Pruebas Frontend

1.  Desde el directorio `Frontend`, ejecuta las pruebas:
```bash
    npm test
```
2.  Para ejecutar las pruebas una sola vez:
```bash
    npm test:once
```
3.  Para obtener la cobertura de pruebas:
```bash
    npm test:coverage
```

## 3. Configuración del Backend

El backend es una aplicación Spring Boot desarrollada con Java.

### Tecnologías Backend

*   **Java**: Versión 22
*   **Spring Boot**: `3.3.12`
*   **Spring Data JPA**: Para persistencia de datos.
*   **Spring Web**: Para construir APIs RESTful.
*   **Spring Security**: Para autenticación y autorización (incluyendo JWT).
*   **Lombok**: Para reducir código repetitivo.
*   **MySQL Connector/J**: Controlador JDBC para MySQL.
*   **H2 Database**: Base de datos en memoria (principalmente para desarrollo/pruebas).
*   **Springdoc OpenAPI**: Para generar documentación de la API (Swagger UI).
*   **JJWT**: Para manejo de JSON Web Tokens.

### Instalación Backend

1.  Navega al directorio `Backend/microservicios`:
```bash
    cd Backend/microservicios
```
2.  Construye el proyecto e instala las dependencias usando Maven:
```bash
    mvn clean install
```

### Configuración de Base de Datos

El backend utiliza una base de datos MySQL.

1.  **Inicia tu servidor MySQL.**
2.  **Crea la Base de Datos**: Asegúrate de que exista una base de datos llamada `level_up`. Puedes crearla usando un cliente MySQL:
```sql
    CREATE DATABASE level_up;
```
3.  **Credenciales de Usuario**: La aplicación está configurada para conectarse como usuario `root` con contraseña vacía.
    *   Si tu usuario `root` de MySQL tiene contraseña, deberás actualizar la propiedad `spring.datasource.password` en `Backend/microservicios/src/main/resources/application.properties` en consecuencia.
    *   Alternativamente, crea un usuario dedicado con los permisos apropiados para la base de datos `level_up`.
    *   Ejemplo de fragmento de `application.properties`:
```properties
        spring.datasource.url=jdbc:mysql://localhost:3306/level_up
        spring.datasource.username=root
        spring.datasource.password=tu_contraseña_mysql_root_aqui
        spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
        spring.jpa.hibernate.ddl-auto=update
        # ... otras propiedades
```
4.  **Actualización del Esquema**: Hibernate está configurado con `spring.jpa.hibernate.ddl-auto=update`, lo que intentará actualizar el esquema de la base de datos basándose en tus entidades JPA cuando la aplicación se inicie.

### Ejecutar la Aplicación Backend

1.  Desde el directorio `Backend/microservicios`, ejecuta la aplicación Spring Boot:
```bash
    mvn spring-boot:run
```
2.  El servidor backend debería iniciarse, generalmente escuchando en `http://localhost:8080`.

### Pruebas Backend

1.  Desde el directorio `Backend/microservicios`, ejecuta las pruebas:
```bash
    mvn test
```
2.  Para generar un reporte de cobertura de código (JaCoCo):
```bash
    mvn jacoco:report
```
    El reporte se generará típicamente en `target/site/jacoco/index.html`.

## 4. Swagger UI (Documentación de la API)

Una vez que el backend esté ejecutándose, puedes acceder a la documentación de la API a través de Swagger UI:

*   Abre tu navegador web y navega a: `http://localhost:8080/swagger-ui.html`
*   Las definiciones de la API se pueden encontrar en: `http://localhost:8080/api-docs`