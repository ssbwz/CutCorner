import { MongoClient, Db } from 'mongodb';

class MongoDBConnection {
  private client: MongoClient;
  private db: Db | undefined;

  constructor() {
    this.client = new MongoClient('mongodb://localhost:27017');
    this.db = undefined;
  }

   connect() {
    try {
     this.client.connect();
      this.db = this.client.db('CutCorner');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }

  getDatabase(): Db {
    
    if (!this.db) {
      throw new Error('MongoDB connection is not established');
    }
    return this.db;
  }

  async close() {
    await this.client.close();
    console.log('MongoDB connection closed');
  }
}

export default MongoDBConnection;
