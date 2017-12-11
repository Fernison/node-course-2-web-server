## Setup SSH Keys para GitHub

- Se necesita un Git Bash ya que es lo que tiene acceso a las utilidades de creación de claves (+ info: google "github ssh keys")
- Desde la propia página de Git Hub se puede ver el proceso de creación y configuración de claves.
- Para ver el directorio de claves: `ls -al ~/.shh`
- Para generar la clave: `ssh-keygen -t rsa -b 4096 -C 'fernando.javadeveloper@gmail.com'`
- En las opciones seleccionar todo por defecto
- Se graba el direcotio de claves en el directorio por defecto del usuario
- Dentro del directorio de claves hay dos ficheros:
  - id_rsa: Clave privada que no hay que compartir con nadie.
  - id_rsa.pub: Clave  pública para compartir con otras aplicaciones
- Ejecutamos: `eval "$(ssh-agent -s)"`. Esto arranca el agente de SSH. Hay que tener cuidado con este proceso ya que si se arranca desde Git Bash,
  cuando se cierra la consola no se mata el proceso y no se puede volver a arrancar un Git Bash. O se hace desde una consola MS-DOS o se mata desde el Admin de tareas.
  Este comando ademas devuelve el PID.
- Ejecutar: `ssh-add ~/.shh/id_rsa`. Para decirle al agente donde esta la clave que acabamos de añadir. Así la utilizara cuando se intere conectar con otros sistemas usando la clave.
- Una vez creada la cuenta de GitHub hay que añadir la clave. Para ello:
  - En GitHub/settings/SSH and GPG Keys añadir la clave.
  - Hay que copiar el contenido de la clave publica.
  - La clave empieza por ssh-rsa y termina por el email.
  - Credenciales: *fernando.javadeveloper@gmail.com/J0rg32506*
- Una vez añadida la clave en GitHub, se testea la conexión. Para ello se ejecuta: `ssh -T git@github.com`
  - Hay que buscar el msg: *"You've successfully authenticated"*

## Añadir a GitHub el proyecto creado

- Se crea un repositorio en GitHub
- Para añadir un proyecto ya creado:
  - `git remote add origin https://github.com/Fernison/node-course-2-web-server.git` (añade el repositorio remoto a nuestro Git local)
  - `git push -u origin master`  (se sube al repositorio remoto)

## Despliegue en Heroku

- https://dashboard.heroku.com/apps
- Credenciales: *fernando.javadeveloper@gmail.com/J0rg32506*
- Es necesario instalar *"heroku toolbelt"* de *"toolbelt.heroku.com (redirige a  https://devcenter.heroku.com/articles/heroku-cli)"*
- En esa página se baja la versión del SO correpondiente.
- En una consola ejecutar: `heroku --help` para ver la ayuda.
- Si estamos en Windows, en una consola de MS-DOS ya que con una que simula Linux (git bash, cygwin, etc) no funcionará, ejecutar: `heroku login` y logarse con las credenciales dela cuenta de Heroku. Tiene que aparecer un mensaje tipo: *"logged as email"*
- Ejecutar: `heroku keys:add` para añadir la clave pública a Heroku. - Si se quiere eliminar la clave, ejecutar: `heroku keys_remove [email de la cuenta de Heroku]`
- Tiene que aparecer el mensaje *"Authentication succeded"*
- Ejecutar: `heroku create` dentro del directorio de la aplicación que queremos desplegar:
  - Se crea una nueva aplicación en el repositorio remoto de Heroku.
  - Se crea un nuevo repositorio remoto ennuestro Git local
- Ejecutar: `git push heroku` para subir el código al repositorio remoto de Heroku
- Este comando geenra muchas trazas. Tienen que aparecer mensajes de éxito y al final tiene que aparecer una URL, por ejemplo: https://arcane-falls-66145.herokuapp.com/
- También se puede abrir directamente desde consola ejecutando `heroku open`