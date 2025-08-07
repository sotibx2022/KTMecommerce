import { config } from '@/config/configuration';
import Typesense from 'typesense';
export const adminClient = new Typesense.Client({
    nodes: [
        {
            host: config.typesence.host,
            port: 443,
            protocol: "https",
        },
    ],
    apiKey: config.typesence.adminKey,  // admin key
    connectionTimeoutSeconds: 2,
});
