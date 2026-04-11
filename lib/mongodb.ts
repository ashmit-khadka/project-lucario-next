import { MongoClient, Db } from 'mongodb';

const URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGODB_DB ?? (process.env.NODE_ENV === 'development' ? 'lucario-dev' : 'lucario');

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(URI);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(URI);
    clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
    const c = await clientPromise;
    return c.db(DB_NAME);
}

export default clientPromise;
