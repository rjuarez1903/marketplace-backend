# EduHub - README

EduHub es una plataforma de servicios en línea que permite a los usuarios ofrecer y buscar servicios. Los usuarios que ofrecen sus servicios pueden registrarse, autenticarse y gestionar servicios y contrataciones.

## Funcionalidades Básicas

- **Autenticación y Autorización:** Los usuarios pueden registrarse y autenticarse. 

- **Gestión de Perfiles:** Los usuarios autenticados pueden ver y actualizar su perfil, incluyendo título y experiencia.

- **Servicios:** Los usuarios autenticados pueden crear, actualizar y eliminar servicios. Los servicios tienen atributos tales como nombre, descripción, categoría, costo, tipo, etc. 

- **Contratos de Servicio:** Los usuarios pueden crear, actualizar y listar contrataciones de servicio para servicios específicos. Los contratos incluyen información de contacto de quien desea contratar el servicio y el estado del mismo.
Los usuarios autenticados son quienes pueden transicionar dicho estado.

- **Comentarios:** Los usuarios pueden ver y crear comentarios en servicios específicos. 

## Aspectos Técnicos

- **Tecnologías Utilizadas:** Node.js, Express.js, MongoDB.
  
- **Autenticación y Seguridad:** Se utilizan JSON Web Tokens para gestionar la autenticación y autorización. Las contraseñas se almacenan en forma hash.

- **Validación de Datos:** Se implementan validaciones en los datos proporcionados por los usuarios en las rutas utilizando Express Validator.

- **Manejo de Errores:** Existe una función `handleErrorResponse` para manejar respuestas de error coherentes. Los errores son registrados en la consola.

- **Middlewares:** Se utilizan middlewares para verificar los tokens de acceso y actualizar, y para validar datos en las rutas.

- **Modelos y Esquemas:** Se definen modelos y esquemas de Mongoose para usuarios, servicios, contratos de servicio y comentarios.

- **Rutas, Controladores y Servicios:** Las rutas están organizadas en diferentes archivos y corresponden a las funcionalidades específicas del sistema.

- **Configuración del Entorno:** Se utiliza un archivo `.env` para almacenar variables de entorno, como claves secretas y configuraciones de la base de datos.

## Variables de Entorno

Además de las variables de entorno previamente mencionadas, asegúrate de configurar las siguientes:

- `CLOUDINARY_CLOUD_NAME`: Nombre de tu cuenta en Cloudinary, utilizado para almacenar imágenes.
- `CLOUDINARY_API_KEY`: Clave API de Cloudinary para autenticar tus solicitudes.
- `CLOUDINARY_API_SECRET`: Clave API Secret de Cloudinary para garantizar la seguridad en tus solicitudes.
- `SENDGRID_API_KEY`: Clave API de SendGrid utilizada para enviar correos electrónicos.
- `USER_EMAIL`: Dirección de correo electrónico utilizada como remitente en los correos electrónicos enviados a través de SendGrid.
- `URI_MONGO`: URI de conexión a tu base de datos MongoDB. Asegurate de incluir tus credenciales y el nombre de la base de datos.
- `JWT_SECRET`: Clave secreta utilizada para firmar los tokens JWT de autenticación.
- `MODE`: Modo de ejecución de la aplicación, puede ser `"dev"` o `"production"`.
- `ORIGIN1`: URL del origen permitido para las solicitudes CORS, útil en desarrollo para permitir solicitudes desde tu frontend local.

Recuerda que estas variables deben mantenerse seguras y no deben ser compartidas públicamente.

## Instalación y Ejecución

1. Cloná este repositorio: `git clone <URL_DEL_REPOSITORIO>`
2. Instalá las dependencias: `npm install`
3. Creá un archivo `.env` con las variables de entorno necesarias.
4. Ejecutá la aplicación: `npm run dev`