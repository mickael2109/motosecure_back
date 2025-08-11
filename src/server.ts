import express from "express";
import http from "http";
import { Server as SocketIoServer} from "socket.io";
import cors from "cors";
import morgan from "morgan"; // Import Morgan
import axios from "axios";
import { coordonne } from "./data/coordonne";
import UserRoutes from "./presentation/routes/UserRoute";
import MotoRoutes from "./presentation/routes/MotoRoute";
import CoordinateRoutes from "./presentation/routes/CoordinateRoute";
import { distanceMeters } from "./utils/calculDistance";
import { loadBDToMemory } from "./utils/loadBDToMemory";
import { dataEtatMoto, dataVirabtionMoto, deviceState } from "./data/dataStocked";
import type { RequestWithIO } from "./domain/entities/RequestWithIO";

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
const server = http.createServer(app);

const API_KEY = process.env.API_KEY || "supersecret";


// Etat en mémoire (prod: Redis/DB)

function auth(req: any, res: any, next: any) {
  if (req.headers["x-api-key"] !== API_KEY) return res.status(401).json({error:"unauthorized"});
  next();
}



// Lecture de l'état courant (l’ESP32 va lire ça)
app.get("/api/device/:id/state", auth, (req, res) => {
  const id = req.params.id;
  const s = deviceState[id] || { moteur: "on", bip: false, version: 0, updatedAt: 0 };
  res.json(s);
});

// (optionnel) ACK depuis l’ESP32 si tu veux marquer consommé
app.post("/api/device/:id/ack", auth, (req, res) => {
  const id = req.params.id;
  const { version } = req.body || {};
  // Ici tu pourrais enregistrer le dernier version traité par l'ESP32
  res.json({ ok: true, version });
});














const io = new SocketIoServer(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT'] // Inclure PUT si nécessaire
  }
});

app.use((req, res, next) => {
  (req as RequestWithIO).io = io;
  next();
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


// routes
app.use("/user", UserRoutes);
app.use("/moto", MotoRoutes);
app.use("/coordinate", CoordinateRoutes);




export let lastData : any = null;
export let dataNew : any = null;

app.post('/api/gps', async (req, res) => {
  const { latitude, longitude, cap, speed } = req.body;
  // console.log("GPS : ",req.body);
  
  // Vérification si latitude ou longitude invalides
  if (
    latitude == null ||
    longitude == null ||
    latitude === 0 ||
    longitude === 0
  ) {
    console.log("⚠️ Données invalides, aucune mise à jour.");
    return res.json({ success: false, message: "Invalid coordinates" });
  }

  // Arrondir à 2 chiffres après la virgule
  const lat2 = Number(latitude).toFixed(2);
  const lon2 = Number(longitude).toFixed(2);

  // Si dataNew est null ou les coordonnées ont changé
  if (
    !dataNew ||
    lat2 !== Number(dataNew.latitude).toFixed(2) ||
    lon2 !== Number(dataNew.longitude).toFixed(2)
  ) {
    dataNew = { latitude, longitude, cap, speed, timestamp: new Date().toISOString() };
    const data = {
      "motoId": 1,
      "long": parseFloat(longitude),
      "lat": parseFloat(longitude),
      "speed": parseFloat(cap),
      "cap":"north"
    }
    await axios.post('https://mc-back.onrender.com/coordinate/create', data, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log("✅ Nouvelle donnée enregistrée :", dataNew);
  } else {
    console.log("ℹ️ Coordonnées inchangées, pas de mise à jour. (",dataNew,")");
  }

  // Toujours mettre à jour lastData pour garder la trace du dernier reçu
  lastData = { latitude, longitude, cap, timestamp: new Date().toISOString() };

  res.json({ success: true });
});




// app.get('/api/gps', (req: any, res: any) => {
//   if (!lastData) return res.status(404).json({ message: 'Aucune donnée' });
//   res.json({ success: true, data: lastData });
// });


app.get('/api/vibration', (req: any, res: any) => {
  console.log("Vibration détectée");
  io.emit('alerte', {
    message: "Vibration détécté sur votre moto",
    userId : 1
  });
  res.json({ success: true, data: lastData });
});



app.post('/proxy-gps', async (req: any, res: any) => {
  try {

    console.log("data esp32 : ",req.body);
    await axios.post('https://mc-back.onrender.com/api/gps', req.body, {
      headers: { 'Content-Type': 'application/json' }
    });
    
    res.status(200).json({ success: true, data: req.body });
  } catch (error : any) {
    console.error("Erreur proxy:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});


async function addCoord () {
  try {

    for (let index = 0; index < coordonne.length; index++) {
      const data = {
        "motoId": 1,
        "long": coordonne[index].long,
        "lat": coordonne[index].lat,
        "speed": 120,
        "cap":"north"
      }
      await axios.post('https://mc-back.onrender.com/coordinate/create', data, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(index," : long=",coordonne[index].long,", lat=",coordonne[index].lat);
      
    }
    console.log("Les coordonnées sont bien ajouté dans la db");
  } catch (error : any) {
    console.error("Erreur lors de l'ajout des coordonnées:", error);
  }  
}
// addCoord()


if (distanceMeters < 1000) {
  console.log(`Distance entre le départ et la fin : ${distanceMeters.toFixed(2)} mètres`);
} else {
  const distanceKm = distanceMeters / 1000;
  console.log(`Distance entre le départ et la fin : ${distanceKm.toFixed(2)} km`);
}



async function initializeAfterStart() {
  try {
    await loadBDToMemory();
    console.log("📦 dataVirabtionMoto :", dataVirabtionMoto);
    console.log("📦 dataEtatMoto :", dataEtatMoto);
  } catch (err) {
    console.error("❌ Erreur lors du chargement des données");
  }
}


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`✅ API Motosecure MG by mickael démarrée sur http://localhost:${PORT}`);
  initializeAfterStart(); 
});
