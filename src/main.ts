import express from 'express';
import bodyParser from 'body-parser';

import { ExampleService } from './domain/services/example.service';
import { StatService } from './domain/services/stat.service';
import { IVisa } from './domain/entities/interfaces';

const PORT = 3000;

async function main() {
  const app = express();
  const visaController = express.Router();

  const exampleService = new ExampleService();
  const statService = new StatService();

  visaController.get('/examples', (req, res) => {
    let quantity = parseInt(req.query.quantity as string);
    if (isNaN(quantity) || quantity < 0 || 10e3 < quantity) {
      quantity = 5e2;
    }
    quantity = Math.min(quantity, 10e7);
    res.json(exampleService.generate(quantity));
  });

  visaController.post('/stats', bodyParser.json({limit: '50mb'}), (req, res) => {
    let date = new Date(req.query.date as string);
    if (isNaN(date.getTime())) {
      date = new Date();
    }
    res.json(statService.compute(req.body as IVisa[], date));
  });

  app.use('/api/visas', visaController);

  app.listen(PORT, () => console.log(`listening on port ${PORT}, good luck !`));
}

main();