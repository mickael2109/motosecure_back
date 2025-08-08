import { config } from 'dotenv';
import axios from 'axios';
import dns from "dns";
import https from "https";
import moment from "moment"; 
import { dataEtatMoto, dataVirabtionMoto, etatInterface, isVibrationInterface } from '../data/dataStocked';

config();
dns.setDefaultResultOrder("ipv4first");
const agent = new https.Agent({ family: 4 }); 

const port_render = process.env.PORT_RENDER;



export const loadBDToMemory = async () => {

  try {

      const response = await axios.post(`${port_render}/moto/get`, {"motoId": 1},{ 
        httpsAgent: agent
      });

      const motoVibration : isVibrationInterface = response.data.data
      const motoStatus : etatInterface = response.data.data
      
      dataVirabtionMoto.push({ 
        id: motoVibration.id,
        isVibration: motoVibration.isVibration
      });

      dataEtatMoto.push({ 
        id: motoStatus.id,
        status: motoStatus.status
      });
      
  
    } catch (error) {
      console.error("Erreur lors du chargment de l'état du moto, ",error);
   }
};

