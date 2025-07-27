# MISHITASKS - Gestor de Tareas

Una aplicación web moderna para la gestión de tareas desarrollada con Next.js 15, React 19 y TypeScript.

## 📋 Descripción

MISHITASKS es una aplicación de gestión de tareas que permite a los usuarios crear, editar, eliminar y marcar como completadas sus tareas. La aplicación cuenta con una interfaz intuitiva y moderna, con funcionalidades como modales para formularios, notificaciones en tiempo real y una API REST completa.

## ✨ Características

- **Gestión completa de tareas**: Crear, editar, eliminar y marcar como completadas
- **Interfaz moderna**: Diseño responsive con Tailwind CSS
- **Modales interactivos**: Formularios en modales para mejor UX
- **Notificaciones**: Sistema de notificaciones en tiempo real
- **API REST**: Endpoints completos para todas las operaciones CRUD
- **Validación robusta**: Validación de datos tanto en frontend como backend
- **Manejo de errores**: Sistema de errores personalizado y descriptivo
- **TypeScript**: Tipado completo para mayor seguridad y desarrollo

## 🛠️ Tecnologías Utilizadas

- **Frontend**:
  - Next.js 15 (App Router)
  - React 19
  - TypeScript
  - Tailwind CSS 4
  - Lucide React (iconos)

- **Backend**:
  - Next.js API Routes
  - TypeScript
  - Manejo de errores personalizado

- **Herramientas de Desarrollo**:
  - ESLint
  - Turbopack (para desarrollo rápido)
  - pnpm (gestor de paquetes)

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- pnpm (recomendado) o npm

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd forit-challenge
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   # o con npm
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   pnpm dev
   # o con npm
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📁 Estructura del Proyecto

```
forit-challenge/
├── src/
│   ├── app/                   # App Router de Next.js
│   │   ├── api/               # API Routes
│   │   │   └── tasks/         # Endpoints de tareas
│   │   ├── tasks/             # Páginas de tareas
│   │   ├── globals.css        # Estilos globales
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página de inicio
│   ├── components/            # Componentes React
│   │   ├── partials/          # Componentes parciales
│   │   └── tasks/             # Componentes específicos de tareas
│   ├── contexts/              # Contextos de React
│   ├── services/              # Lógica de negocio
│   └── types/                 # Definiciones de tipos TypeScript
├── public/                    # Archivos estáticos
└── package.json               # Archivo .json con la informacion del proyecto
```

## 🔧 Scripts Disponibles

- `pnpm dev` - Ejecuta el servidor de desarrollo con Turbopack
- `pnpm build` - Construye la aplicación para producción
- `pnpm start` - Ejecuta la aplicación en modo producción
- `pnpm lint` - Ejecuta el linter para verificar el código

## 📡 API Endpoints

### Tareas

- `GET /api/tasks` - Obtener todas las tareas
- `POST /api/tasks` - Crear una nueva tarea
- `PUT /api/tasks/[id]` - Actualizar una tarea
- `DELETE /api/tasks/[id]` - Eliminar una tarea

### Estructura de Datos

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}
```

## 🎯 Funcionalidades Principales

### Gestión de Tareas
- **Crear tareas**: Formulario modal para agregar nuevas tareas
- **Editar tareas**: Modificar título, descripción y estado
- **Eliminar tareas**: Confirmación antes de eliminar
- **Marcar como completada**: Toggle del estado de completado

### Interfaz de Usuario
- **Diseño responsive**: Adaptable a diferentes tamaños de pantalla
- **Modales**: Formularios en ventanas modales para mejor UX
- **Notificaciones**: Feedback visual para las acciones del usuario
- **Loading states**: Indicadores de carga durante operaciones

### Validación y Errores
- **Validación de campos**: Título y descripción obligatorios
- **Manejo de errores**: Mensajes descriptivos para el usuario
- **Validación en tiempo real**: Feedback inmediato en formularios

## 🔒 Manejo de Errores

El proyecto implementa un sistema robusto de manejo de errores:

- **TaskError**: Error base para operaciones de tareas
- **TaskNotFoundError**: Cuando no se encuentra una tarea
- **ValidationError**: Para errores de validación de datos

## 🎨 Estilos y Diseño

- **Tailwind CSS 4**: Framework de utilidades para estilos
- **Diseño moderno**: Interfaz limpia y profesional
- **Componentes reutilizables**: Arquitectura modular
- **Responsive design**: Adaptable a móviles y desktop

## Screenshots

### Inicio (/)
<img src="./public/screenshots/homepage.png" alt="Homepage" />

### Tareas (/tasks)
<img src="./public/screenshots/taskspage.png" alt="Taskspage" />

### Modal de Formulario para Crear una Tarea
<img src="./public/screenshots/create-task-modal.png" alt="Create Task Form Modal" />

### Tarea Creada
<img src="./public/screenshots/task-created.png" alt="Task Created"/>

### Detalle de Tarea
<img src="./public/screenshots/task-detail.png" alt="Task Detail"/>

### Modal de Formulario para Editar una Tarea
<img src="./public/screenshots/edit-task-modal.png" alt="Edit Task Form Modal"/>

### Tarea Actualizada
<img src="./public/screenshots/task-updated.png" alt="Task Updated"/>

### Modal de Formulario para Eliminar una Tarea
<img src="./public/screenshots/delete-task-modal.png" alt="Delete Task Form Modal"/>

### Tarea Eliminada
<img src="./public/screenshots/task-deleted.png" alt="Task Deleted"/>

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado por Matias Demian Sayago como parte del challenge de Forit Software Factory.

---

**¡Gracias por usar MISHITASKS!** 🎉
