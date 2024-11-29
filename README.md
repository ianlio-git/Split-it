# React + Vite

This project is built using React and Vite, providing a minimal and fast setup for modern web development. It includes support for Hot Module Replacement (HMR) and ESLint for code quality.

## Features

- 🚀 Built with React and Vite for optimal performance.
- 🔄 Hot Module Replacement (HMR) for a seamless development experience.
- ✅ Pre-configured ESLint rules for consistent coding standards.
- 🛠️ Modular and maintainable project structure.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.18+ or 16+)
- [npm](https://www.npmjs.com/) (or [yarn](https://yarnpkg.com/))

### Installation

1. Clone the repository:
   ```bash
   git clone <https://github.com/ianlio-git/Split-it.git>

   
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura el archivo `.env`:
   Crea un archivo `.env` en la raíz del proyecto y añade la siguiente variable:

   ```env
   JWT_SECRET=tu_clave_secreta
   ```

4. Inicia el servidor:
   ```bash
   npm start
   ```

### IMPORTACIONES
TIPOGRAFÍA -> import {Typography} from '@mui/material';
BOTÓN -> import {Button} from '@mui/material';
ÍCONOS -> import {NombreIcono} from '@mui/icons-material';
ICON-BUTTON -> import {IconButton} from '@mui/material';
TEMA -> import {createTheme, ThemeProvider} from "@mui/material/styles";
APPBAR -> import { AppBar } from '@mui/material';
TOOLBAR -> import { Toolbar } from '@mui/material';
CARD -> import {Card, CardContent, CardActions} from '@mui/material';
NAVBAR -> import NavBar from './components/NavBar';
LISTA -> import {List,ListItem,ListItemIcon,ListItemText,Divider} from '@mui/material';

### COMPONENTES PUROS DE MATERIAL UI
BOTÓN <Button/>
color = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | string
href = "google.com"
size = 'small' | 'medium' | 'large' | string
variant = 'contained' | 'outlined' | 'text' | string
startIcon = {</>}
endIcon = {</>}

### ÍCONOS
color = 'inherit' | 'action' | 'disabled' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | string
fontSize = 'inherit' | 'large' | 'medium' | 'small' | string
NOTA: cada ícono se maneja como componente único, es decir, si para botón tenemos <Button/>, para icono tenemos <CreditCardt/>, <DoNotDisturb/>, y así con cada uno.


### ICON-BUTTON
Siguen la estructura:

<IconButton>
    <CreditCardt/>
</IconButton>
No tiene props útiles.


### TIPOGRAFÍA <Typography/>
align = 'center' | 'justify' | 'left' | 'right'
variant = 'body1' | 'body2' | 'button' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'inherit' | 'overline' | 'subtitle1' | 'subtitle2' | string
color = 'primary' | 'secondary' | 'success'

### TEMA <ThemeProvider/>
Sirve para agregar estilos CSS a cualquier componente React. Consta de dos partes:

CreateTheme (va entre los imports y App()):
const theme = createTheme({
  palette: {
    primary: {
      main: "#000e35",
    },
    secondary: {
      main: "#97b59d",
    },
  },
});
ThemeProvider:
    <ThemeProvider theme={theme}>
     <Button color = "secondary">
        BOTÓN DE PRUEBA
     </Button>
    </ThemeProvider>

### APPBAR (atómico) <AppBar/>
position = 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky'
color = 'default' | 'inherit' | 'primary' | 'secondary' | 'transparent' | string

### TOOLBAR <ToolBar/>
variant = 'dense' | 'regular' | string


### COMPONENTES COMPUESTOS
Los componentes compuestos van en una carpeta aparte dentro del src llamada components.

La estructura básica es:

import React from 'react';
const Componente = () => {
    return (
        <div>
        </div>
    )
}
export default Componente;

### NAVBAR - AppBar Compuesto
Estructura básica del NavBar:

    <AppBar position="static">
        <Toolbar>

        </Toolbar>
      </AppBar>

### CARD (compuesto) <Card/> <CardContent/> <CardActions/>
Estructura básica de la carta:

<Card>
  <CardActionArea> 
        <CardMedia/>

        <CardContent>

        </CardContent>
  </CardActionArea>

  <CardActions>
      
  </CardActions>
</Card>