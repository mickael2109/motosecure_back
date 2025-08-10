export interface isVibrationInterface {
  id: number;
  isVibration: boolean;
}



export interface etatInterface {
  id: number;
  status: boolean;
}



export const dataVirabtionMoto: isVibrationInterface[] = [];
export const dataEtatMoto: etatInterface[] = [];
export const deviceState: any = {}; // { [id]: { moteur: "on"/"off", bip: false, updatedAt: 0, version: 0 } }

