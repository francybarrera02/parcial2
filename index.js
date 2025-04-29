import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { obras } from './routes/obras.js';

const app = express();

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para registrar cada visita
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Visitando: ${req.originalUrl}`);
  next();
});


// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Motor de plantillas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.get('/', (req, res) => res.render('index'));
app.get('/galeria', (req, res) => res.render('galeria', { obras }));
app.get('/obra/:id', (req, res) => {
  const obra = obras.find(o => o.id === parseInt(req.params.id));
  if (obra) res.render('obra', { obra });
  else res.status(404).send('Obra no encontrada');
});
app.get('/acerca', (req, res) => res.render('acerca'));
app.get('/inicio', (req, res) => res.redirect('/'));



// Servidor
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));

