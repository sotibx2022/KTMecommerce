import { config } from '@/config/configuration';
import Typesense from 'typesense';
export const clientTypesense = new Typesense.Client({
  nodes: [
    {
      host: config.typesence.host,
      port: 443,
      protocol: "https",
    },
  ],
  apiKey: config.typesence.clientKey,  // search-only key
  connectionTimeoutSeconds: 2,
});
