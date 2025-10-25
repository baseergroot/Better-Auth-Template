import { connect, connection, connections } from "mongoose"


export default async function ConnectDB() {

    // check if mongodb uri is defined
    const MongodbURI = process.env.MONGODB_URI as string;
    if (!MongodbURI) {
        throw new Error("MONGODB_URI is not defined in .env file");
    }

    if(connections[0].readyState === 1) {
    console.log("db, already connected")
    return
  }
    try {
        await connect(MongodbURI)
        console.log("mongodb connected")
    } catch (error) {
        console.log("mongodb connection error: ", error)
    }

}
export async function getClient() {
  await ConnectDB();
  if (!connection.db) {
    throw new Error('MongoDB Db instance not available');
  }
  // console.log("MongoDB Db instance acquired", connection.db);
  return connection.db;
}
