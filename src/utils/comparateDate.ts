export function comparateDate() {
  const today = new Date();

 // Extraction des composants (heures, minutes, secondes)
 const utcHours = today.getUTCHours();
 const utcMinutes = today.getUTCMinutes();
 const utcSeconds = today.getUTCSeconds();

 const localHours = today.getHours();
 const localMinutes = today.getMinutes();
 const localSeconds = today.getSeconds();

 // Comparaison des composants
 const isSameTime =
   utcHours === localHours &&
   utcMinutes === localMinutes &&
   utcSeconds === localSeconds;

  return isSameTime;
}
