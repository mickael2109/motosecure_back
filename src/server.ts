
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

let lastData: any = null;

app.post('/api/energie', (req: any, res: any) => {
  lastData = { ...req.body, timestamp: new Date().toISOString() };
  console.log("📥 Donnée reçue :", lastData);
  res.json({ success: true });
});

app.get('/api/energie', (req: any, res: any) => {
  if (!lastData) return res.status(404).json({ message: 'Aucune donnée' });
  res.json({ success: true, data: lastData });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ API énergie démarrée sur http://localhost:${PORT}`);
});
