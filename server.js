const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('.'));

app.post('/guardar-usuario', (req, res) => {
    const { nombre, apellidos } = req.body;

    if (!nombre || !apellidos) {
        return res.json({ mensaje: 'Datos incompletos' });
    }

    let usuarios = [];
    const archivo = 'usuarios.json';

    if (fs.existsSync(archivo)) {
        usuarios = JSON.parse(fs.readFileSync(archivo));
    }

    usuarios.push({
        nombre,
        apellidos,
        fecha: new Date()
    });

    fs.writeFileSync(archivo, JSON.stringify(usuarios, null, 2));

    res.json({ mensaje: 'Usuario guardado correctamente' });
});

app.listen(PORT, () => {
    console.log("Servidor en http://localhost:3000");
});
