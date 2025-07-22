
import express from "express";
import http from "http";
import { Server as SocketIoServer} from "socket.io";
import cors from "cors";
import morgan from "morgan"; // Import Morgan
import axios from "axios";
import { coordonne } from "./data/coordonne";



const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
const server = http.createServer(app);


const io = new SocketIoServer(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT'] // Inclure PUT si nécessaire
  }
});


// Envoie des coordonnées toutes les 1 seconde
io.on('connection', (socket: any) => {
  console.log('✅ Client connecté');

  let index = 0;
  let direction = 1; // 1 pour avancer, -1 pour reculer

  const interval = setInterval(() => {
    socket.emit('location', coordonne[index]);
    console.log(`📍 Envoi des coordonnées : ${JSON.stringify(coordonne[index])}`);

    if (direction === 1 && index === coordonne.length - 1) {
      direction = -1;
    } else if (direction === -1 && index === 0) {
      direction = 1;
    }

    index += direction;
  }, 1000); 

  socket.on('disconnect', () => {
    console.log('❌ Client déconnecté');
    clearInterval(interval);
  });
});




let lastData: any = null;

app.post('/api/gps', (req: any, res: any) => {
  lastData = { ...req.body, timestamp: new Date().toISOString() };
  console.log("📥 Donnée reçue :", lastData);
  res.json({ success: true });
});

app.get('/api/gps', (req: any, res: any) => {
  if (!lastData) return res.status(404).json({ message: 'Aucune donnée' });
  res.json({ success: true, data: lastData });
});



app.post('/proxy-gps', async (req: any, res: any) => {
  try {
    const response = await axios.post('https://mc-back.onrender.com/api/gps', req.body, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log("response : ",response.data);
    
    res.status(200).json({ success: true });
  } catch (error : any) {
    console.error("Erreur proxy:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});




const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`✅ API Motosecure MG by mickael démarrée sur http://localhost:${PORT}`);
});
