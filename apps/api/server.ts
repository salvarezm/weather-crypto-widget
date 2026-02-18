import Fastify from 'fastify';
import cors from '@fastify/cors';

interface DataItem {
  name: string;
  value: string;
}

const app = Fastify();
await app.register(cors);

app.get('/api/data', (): DataItem[] => [
  { name: 'Bitcoin', value: '$45,000' },
  { name: 'Ethereum', value: '$2,800' },
  { name: 'Temperatura', value: '22°C' }
]);

app.listen({ port: 3001 }, () => console.log('API en http://localhost:3001'));
