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
import NotificationRoutes from "./presentation/routes/NotificationRoute";
import { distanceMeters } from "./utils/calculDistance";
import { loadBDToMemory } from "./utils/loadBDToMemory";
import { dataEtatMoto, dataVirabtionMoto, deviceState } from "./data/dataStocked";
import type { RequestWithIO } from "./domain/entities/RequestWithIO";
import moment from 'moment'
import { redisClient } from "./lib/redis";

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
const server = http.createServer(app);

const API_KEY = process.env.API_KEY || "supersecret";
const port_redis = process.env.DATABASE_REDIS;
console.log("port_redis : ",port_redis);

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
    origin: 'http://localhost:5173',
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

  socket.on('disconnect', () => {
    console.log('❌ Client déconnecté');
    // clearInterval(interval);
  });
});


// routes
app.use("/user", UserRoutes);
app.use("/moto", MotoRoutes);
app.use("/coordinate", CoordinateRoutes);
app.use("/notification", NotificationRoutes);




export let lastData : any = null;
export let dataNew : any = null;


app.post('/api/gps', async (req, res) => {
  const { deviceId, vibrationEnabled, moteurOn, latitude, longitude, cap, speed } = req.body;
  console.log("GPS : ",req.body);
  
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

  const isoString = new Date().toISOString();
  const today = moment(isoString).format('DD-MM-YYYY');
  

  const data = {
    "motoId": parseInt(deviceId),
    "long": parseFloat(longitude),
    "lat": parseFloat(latitude),
    "speed": parseFloat(speed),
    "cap":"north"
  }
  
  // save redis
  let vibrationEnabledData = vibrationEnabled ? "on":"off"
  let moteurOnData = moteurOn ? "on":"off"
  await redisClient.set(`long${deviceId}`, longitude);
  await redisClient.set(`lat${deviceId}`, latitude);
  await redisClient.set(`vibrationEnabled${deviceId}`, vibrationEnabledData );
  await redisClient.set(`moteurOn${deviceId}`, moteurOnData);

  console.log("valeur dans redis bien à jour");

  // save data
  // const rep =await axios.post('https://mc-back.onrender.com/coordinate/create', data, {
  //   headers: { 'Content-Type': 'application/json' }
  // });

  const dateEmit = {
    id: 0,
    motoId: 1,
    long: parseFloat(longitude),
    lat:parseFloat(latitude),
    speed: parseFloat(speed),
    cap: "North",
    date: "2025-08-25T07:57:39.865Z",
    createdAt: "2025-08-25T04:57:39.884Z",
    updatedAt: "2025-08-25T04:57:39.884Z",
    Moto: {
      id: 1,
      num_serie: "0001MG",
      pseudo: "megafi kcc",
      status: moteurOn,
      isVibration: vibrationEnabled,
      userId: 1,
      long: parseFloat(longitude),
      lat: parseFloat(latitude),
      createdAt: "2025-07-29T11:55:40.983Z",
      updatedAt: "2025-08-24T14:38:03.928Z"
    }
  }
  io.emit('gps', {
    data: dateEmit,
    status: "move"
  });

  console.log("✅ Nouvelle donnée enregistrée aujourd'hui :", dataNew);

  res.json({ success: true });
});



// app.post('/api/gps', async (req, res) => {
//   const { deviceId, vibrationEnabled, moteurOn, latitude, longitude, cap, speed } = req.body;
//   console.log("GPS : ",req.body);
  
//   // Vérification si latitude ou longitude invalides
//   if (
//     latitude == null ||
//     longitude == null ||
//     latitude === 0 ||
//     longitude === 0
//   ) {
//     console.log("⚠️ Données invalides, aucune mise à jour.");
//     return res.json({ success: false, message: "Invalid coordinates" });
//   }

//   // Arrondir à 2 chiffres après la virgule
//   const lat2 = Number(latitude).toFixed(2);
//   const lon2 = Number(longitude).toFixed(2);


//   const isoString = new Date().toISOString();
//   const today = moment(isoString).format('DD-MM-YYYY');
  

//   if(lastData){
//     if(moment(lastData.timestamp).format('DD-MM-YYYY') !== today){
//       dataNew = { latitude, longitude, cap, speed, timestamp: new Date().toISOString() };
//       const data = {
//         "motoId": parseInt(deviceId),
//         "long": parseFloat(longitude),
//         "lat": parseFloat(latitude),
//         "speed": parseFloat(cap),
//         "cap":"north"
//       }
      
//       // save redis
//       let vibrationEnabledData = vibrationEnabled ? "on":"off"
//       let moteurOnData = moteurOn ? "on":"off"
//       await redisClient.set(`long${deviceId}`, longitude);
//       await redisClient.set(`lat${deviceId}`, latitude);
//       await redisClient.set(`vibrationEnabled${deviceId}`, vibrationEnabledData );
//       await redisClient.set(`moteurOn${deviceId}`, moteurOnData);

//       console.log("valeur dans redis bien à jour");

//       // save data
//       const rep =await axios.post('https://mc-back.onrender.com/coordinate/create', data, {
//         headers: { 'Content-Type': 'application/json' }
//       });

//       io.emit('gps', {
//         data: rep.data,
//         status: "move"
//       });

//       console.log("✅ Nouvelle donnée enregistrée aujourd'hui :", dataNew);
//     }else{
//         if (
//           !dataNew ||
//           lat2 !== Number(dataNew.latitude).toFixed(2) ||
//           lon2 !== Number(dataNew.longitude).toFixed(2)
//         ) {
//           dataNew = { latitude, longitude, cap, speed, timestamp: new Date().toISOString() };
//           const data = {
//             "motoId": parseInt(deviceId),
//             "long": parseFloat(longitude),
//             "lat": parseFloat(latitude),
//             "speed": parseFloat(cap),
//             "cap":"north"
//           }

//           // save redis
//           let vibrationEnabledData = vibrationEnabled ? "on":"off"
//           let moteurOnData = moteurOn ? "on":"off"
//           await redisClient.set(`long${deviceId}`, longitude);
//           await redisClient.set(`lat${deviceId}`, latitude);
//           await redisClient.set(`vibrationEnabled${deviceId}`, vibrationEnabledData );
//           await redisClient.set(`moteurOn${deviceId}`, moteurOnData);

//           console.log("valeur dans redis bien à jour");

//           // save data
//           const rep = await axios.post('https://mc-back.onrender.com/coordinate/create', data, {
//             headers: { 'Content-Type': 'application/json' }
//           });

//           io.emit('gps', {
//             data: rep.data,
//             status: "move"
//           });
//           console.log("✅ Nouvelle donnée enregistrée :", dataNew);
//         } else {
//           io.emit('gps', {
//             data: {
//               longitude: longitude,
//               latitude: latitude,
//               cap: cap,
//               speed: speed,
//               userId : 1,
//             },
//             status: "stay"
//           });
//           console.log("ℹ️ Coordonnées inchangées, pas de mise à jour. (",dataNew,")");
//         }
      
//     }
//   }else{
//     dataNew = { latitude, longitude, cap, speed, timestamp: new Date().toISOString() };
//       const data = {
//         "motoId": parseInt(deviceId),
//         "long": parseFloat(longitude),
//         "lat": parseFloat(latitude),
//         "speed": parseFloat(cap),
//         "cap":"north"
//       }

//       // save redis
//       let vibrationEnabledData = vibrationEnabled ? "on":"off"
//       let moteurOnData = moteurOn ? "on":"off"
//       await redisClient.set(`long${deviceId}`, longitude);
//       await redisClient.set(`lat${deviceId}`, latitude);
//       await redisClient.set(`vibrationEnabled${deviceId}`, vibrationEnabledData );
//       await redisClient.set(`moteurOn${deviceId}`, moteurOnData);

//       console.log("valeur dans redis bien ajouté");

//       // save data
//       const rep = await axios.post('https://mc-back.onrender.com/coordinate/create', data, {
//         headers: { 'Content-Type': 'application/json' }
//       });

//       io.emit('gps', {
//         data: rep.data,
//         status: "move"
//       });

//       console.log("✅ Nouvelle donnée enregistrée aujourd'hui :", dataNew);
//   }
  


//   // Toujours mettre à jour lastData pour garder la trace du dernier reçu
//   lastData = { latitude, longitude, cap, timestamp: new Date().toISOString() };

//   res.json({ success: true });
// });


async function addCoord () {
  try {
    for (let index = 0; index < coordonne.length; index++) {
      const data = {
        motoId: 1,
        long: coordonne[index].long,
        lat: coordonne[index].lat,
        speed: 120,
        cap: "north"
      };

      await redisClient.set(`long${1}`, coordonne[index].long);
      await redisClient.set(`lat${1}`, coordonne[index].lat);

      console.log("valeur dans redis bien à jour");

      // save data
      const rep = await axios.post(
        "http://localhost:8080/coordinate/create",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      io.emit("gps", {
        data: rep.data,
        status: "move"
      });

      console.log("✅ Nouvelle donnée enregistrée :", data);

      // await(10000)
      // ⏳ attendre 10s avant la prochaine coordonnée
      await new Promise(resolve => setTimeout(resolve, 10000));
    }

    console.log("Toutes les coordonnées ont été ajoutées dans la DB");
  } catch (error: any) {
    console.error("Erreur lors de l'ajout des coordonnées:", error);
  }  
}

// addCoord()





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


async function initializeAfterStart() {
  try {
    await loadBDToMemory();
    console.log("📦 dataVirabtionMoto :", dataVirabtionMoto);
    console.log("📦 dataEtatMoto :", dataEtatMoto);
  } catch (err) {
    console.error("❌ Erreur lors du chargement des données");
  }
}


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`✅ API Motosecure MG by mickael démarrée sur http://localhost:${PORT}`);
  initializeAfterStart(); 
});












