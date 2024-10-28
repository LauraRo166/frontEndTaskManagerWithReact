# LABORATORIO - REACT

## Migración del Frontend a React
Esta documentacion describe el proceso de migración del frontend original a un entorno moderno utilizando React. 
### Objetivos de la Migración

1. **Modularización:** Dividir el frontend en componentes reutilizables.
2. **Facilidad de Actualización:** Implementar una estructura de carpetas organizada que permita modificar o actualizar cada componente sin afectar el resto de la aplicación.
3. **Interactividad Mejorada:** Permitir una mejor experiencia de usuario con una interfaz reactiva, mejorando la experiencia de usuario sin recargar la página.
4. **Compatibilidad con Backend:** Asegurar la comunicación con el backend existente (Azure) y gestionar las llamadas a la API de forma eficiente.

## Pasos del Proceso de Migración   

El laboratorio se venia trabajando desde rama `react` en el repositorio correspondiente a frontEnd con javascript y html.
El primer commit de este repositorio corresponde a estos cambios registrados en el anterior repositorio:
![image](https://github.com/user-attachments/assets/6d76c0fd-48f6-4c3c-a0f7-20c3a5dc0185)

### Creacion del Proyecto

Para la migracion del FrontEnd a React, primeramente debemos crear un nuevo proyecto de React utilizando Create React App, ejecutando el siguiente comando

```sh
npx create-react-app frontEndTaskManagerWithReact
cd frontEndTaskManagerWithReact
```

### Estructura

Una vez creado el proyecto tendremos la siguiente estructura de carpetas

![image](https://github.com/user-attachments/assets/c1a3aba2-413e-4904-b49a-0007c97658dc)

### Creacion de Componentes y Importacion CSS

Se dividió el proyecto en varios componentes para modularizar el código. La estructura principal incluye:

- `TaskManager`: Componente principal de la aplicación que gestiona el flujo de tareas y modales.
- `Sidebar`: Menú lateral con opciones de navegación y acceso al perfil de usuario.
- `TaskList` y `Task`: Lista de tareas y cada tarea individual.
- `InsightsPage` y `Chart`: Componente de estadisticas que gestiona la creacion de las graficas en la biblioteca Chart.
- `Modal`, `AuthModal` y `UserModal`: Ventanas modales para añadir tareas y visualizar el perfil de usuario.
- `taskService` y `authService`: Archivos que centraliza las llamadas a la API.

Se mantuvo la mayoría de los estilos en CSS, adaptándolos a la estructura de React. Se utilizó un enfoque modular en `taskManager.css` y otros archivos de estilos específicos para cada componente, mejorando la consistencia visual de la aplicación.

![image](https://github.com/user-attachments/assets/71a63820-caef-4f1b-a66e-2666deef67ff)

### Gráficos con Chart.js

Para utilizar Chart.js en React, debemos instalar la libreria a través de npm:
```sh
npm install react-chartjs-2 chart.js
```
Por consiguiente, implementariamos la logica del componente asoaciado a las graficas, el cual es `Chart.js`

### Interfaz de Informacion Task Manager

Para realizar la implementacion del modulo de Usuarios en frontend, decidimos agregar una interfaz principal de informacion donde se nos indica una breve descripcion de la pagina y creamos 2 botones 'Log in' y 'Sign Up' para el acceso al Portal de Task Manager

![image](https://github.com/user-attachments/assets/4abb1aa0-2775-4380-8d6d-da14b8f30052)

### Formularios Log In y Sign Up

![image](https://github.com/user-attachments/assets/42a81001-05bf-43e1-94b4-122035314a1a)
![image](https://github.com/user-attachments/assets/d7d5a57b-2957-4c28-a1b8-e2a3d0e10bfc)

### Interfaz Principal Task Manager

Esta interfaz abarca las principales funcionalidades de nuestro sistema, estas estan clasificadas por el rol de usuario que se registre:
 - **Administrador**: Se le permite generar tareas automaticas y acceder a la pestaña de estadisticas para obetener informacion detallada de las tareas
 - **Usuario**: Se le permite agregar, marcar como completado y borrar sus tareas individuales independientes de cualquier otro usuario

#### Vista Administrador

![image](https://github.com/user-attachments/assets/8f617b88-a524-46ec-a0ed-402513f30257)
![image](https://github.com/user-attachments/assets/f5d68d54-fd21-4437-8388-3fcc4478452c)

#### Vista Usuario

![image](https://github.com/user-attachments/assets/55a1ee46-3a80-439e-92ee-def5685ece66)
![image](https://github.com/user-attachments/assets/6a1539e2-6778-43c1-a29c-758f9e082e3e)


### Ventana de Informacion del Usuario

En el menu lateral se agrego un boton de usuario, donde se consultara la informacion general del usuario, como su username y su rol asignado ademas de tener un boton para deslogearse

![image](https://github.com/user-attachments/assets/b9ee8db8-24ee-4947-8791-010efe6b8b61)
