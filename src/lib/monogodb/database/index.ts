import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
	if (cached.conn) return cached.conn;

	if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');

	console.log(MONGODB_URI);

	cached.promise =
		cached.promise ||
		mongoose.connect(MONGODB_URI, {
			dbName: 'evently',
			bufferCommands: false,
		});

	cached.conn = await cached.promise;

	return cached.conn;
};

// The cached variable in the code you provided implements a simple caching mechanism to optimize the connection process to the MongoDB database. Here's a detailed explanation:

// 1. Purpose:

// The cached variable serves as a storage for the connection details to the MongoDB database. It helps avoid redundant connection attempts and improves the overall performance of the application.

// 2. Structure:

// Type: The cached variable is declared using a type assertion ((global as any).mongoose). This is because the global object (which represents the global scope in JavaScript) might not have a property named mongoose by default.

// Object Structure: It's an object with two properties:

// conn: null: This property is initially set to null and will eventually hold the actual mongoose connection object once a successful connection is established.
// promise: null: This property is also initially null and will store a promise object returned by the mongoose.connect function during the connection attempt.
// 3. Usage in connectToDatabase function:

// The connectToDatabase function utilizes the cached object to achieve caching:

// Checking for Existing Connection:

// if (cached.conn) return cached.conn;: This line checks if a connection already exists in the cached.conn property. If a connection is found, it directly returns the existing connection object, preventing unnecessary re-connection attempts.
// Handling Missing URI:

// if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');: This ensures a valid connection string is provided. If the MONGODB_URI environment variable is not set, it throws an error to alert the developer.
// Connection Logic with Caching:

// cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {...});: This line handles the actual connection logic. It checks if a connection promise (cached.promise) already exists.
// If no promise exists (!cached.promise), it creates a new one by calling mongoose.connect with the MONGODB_URI and options for the connection.
// cached.conn = await cached.promise: This line waits for the connection promise (cached.promise) to resolve (meaning the connection attempt is complete). Once resolved, it assigns the actual mongoose connection object to the cached.conn property.
// In summary, the cached variable acts as a central location to store and manage the MongoDB connection details, promoting efficiency by preventing redundant connection attempts and leveraging caching for a smoother user experience.
