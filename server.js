const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware para procesar JSON en las peticiones
app.use(bodyParser.json());

// Endpoint de la API
app.post('/api/check-value', (req, res) => {
    // Definir las palabras clave (ejemplo: 'Hola', 'Saludos')
    const keywords = ['hola', 'saludos', 'jeje']; // Todas en minúsculas para una comparación sin distinción de mayúsculas

    // Obtener el valor enviado por Bubble
    const multilineValue = req.body.value || '';

    // Convertir el valor a minúsculas y dividirlo en líneas para una mejor comparación
    const lines = multilineValue.toLowerCase().split('\n');

    let elementVisible = false;

    // Verificar si alguna de las líneas contiene una palabra clave
    for (const line of lines) {
        // Limpiar espacios extra
        const cleanedLine = line.trim().replace(/\s+/g, '');

        for (const keyword of keywords) {
            // Comparación de la línea limpia con la palabra clave limpia
            if (cleanedLine === keyword) {
                elementVisible = true;
                break; // Salir del bucle si se encuentra una coincidencia
            }
        }
        if (elementVisible) {
            break; // Salir del bucle de líneas si se encuentra una coincidencia
        }
    }

    // Enviar la respuesta a Bubble
    res.json({
        visible: elementVisible
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});