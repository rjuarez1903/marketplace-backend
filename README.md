# Marketplace de Servicios Particulares - README

Esta es una plataforma de servicios en línea que permite a los usuarios ofrecer y buscar servicios. Los usuarios que ofrecen sus servicios pueden registrarse, autenticarse y gestionar servicios y contratos.

## Funcionalidades Básicas

- **Autenticación y Autorización:** Los usuarios pueden registrarse y autenticarse. 

- **Gestión de Perfiles:** Los usuarios autenticados pueden ver y actualizar su perfil, incluyendo título y experiencia.

- **Servicios:** Los usuarios autenticados pueden crear, actualizar y eliminar servicios. Los servicios tienen atributos tales como nombre, descripción, categoría, costo, tipo, etc. 

- **Contratos de Servicio:** Los usuarios pueden crear, actualizar y listar contratos de servicio para servicios específicos. Los contratos incluyen información de contacto de quien desea contratar el servicio y el estado del mismo.
Los usuarios autenticados son quienes pueden transicionar dicho estado.

- **Comentarios:** Los usuarios pueden ver y crear comentarios en servicios específicos. 

## Aspectos Técnicos

- **Tecnologías Utilizadas:** Node.js, Express.js, MongoDB.
  
- **Autenticación y Seguridad:** Se utilizan JSON Web Tokens para gestionar la autenticación y autorización. Las contraseñas se almacenan en forma hash.

- **Validación de Datos:** Se implementan validaciones en los datos proporcionados por los usuarios en las rutas utilizando Express Validator.

- **Manejo de Errores:** Existe una función `handleErrorResponse` para manejar respuestas de error coherentes. Los errores son registrados en la consola.

- **Middlewares:** Se utilizan middlewares para verificar los tokens de acceso y actualizar, y para validar datos en las rutas.

- **Modelos y Esquemas:** Se definen modelos y esquemas de Mongoose para usuarios, servicios, contratos de servicio y comentarios.

- **Rutas y Controladores:** Las rutas están organizadas en diferentes archivos y corresponden a las funcionalidades específicas del sistema.

- **Cookies y Seguridad:** Se utilizan cookies para almacenar tokens de actualización. Las cookies son seguras y httpOnly.

- **Configuración del Entorno:** Se utiliza un archivo `.env` para almacenar variables de entorno, como claves secretas y configuraciones de la base de datos.

- **Documentación:** El código incluye comentarios explicativos y documentación de las rutas, controladores y middlewares.

## Variables de Entorno

- `URI_MONGO`: Debe contener la URI de conexión a tu base de datos MongoDB. Por ejemplo: `mongodb://localhost:27017/mi_base_de_datos`.

- `JWT_SECRET`: Es la clave secreta utilizada para firmar los tokens JWT de autenticación. Debe ser una cadena segura y única.

- `JWT_REFRESH`: Es la clave secreta utilizada para firmar los tokens JWT de actualización. También debe ser una cadena segura y única.

- `MODE`: Puede ser un valor como `"dev"` o `"production"` y se utiliza para configurar la seguridad de las cookies. Si es `"dev"`, las cookies pueden ser enviadas a través de conexiones no seguras (HTTP) para facilitar el desarrollo local. Si es `"production"`, las cookies solo se van a enviar a través de conexiones seguras (HTTPS).


## Instalación y Ejecución

1. Cloná este repositorio: `git clone <URL_DEL_REPOSITORIO>`
2. Instalá las dependencias: `npm install`
3. Creá un archivo `.env` con las variables de entorno necesarias.
4. Ejecutá la aplicación: `npm start`