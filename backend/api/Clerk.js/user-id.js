import clerk from '@clerk/clerk-sdk-node';

const userId = 'my-user-id';
 
const user = await clerkClient.users.getUser(userId);