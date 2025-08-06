import { Client, Account } from 'appwrite';

// Appwrite configuration
const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || '67df0861002d50a5d086',
};

// Initialize Appwrite client
export const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

// Initialize Appwrite services
export const account = new Account(client);

// Export configuration for use in other files
export { appwriteConfig }; 