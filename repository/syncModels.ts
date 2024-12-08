import User from './models/User';
import Query from './models/Query';

export const syncModels = async (): Promise<void> => {
    try {
        await User.sync({ alter: true }); 
        console.log('Users table synchronized.');

        await Query.sync({ alter: true });
        console.log('Queries table synchronized.');
    } catch (error) {
        console.error('Error synchronizing models:', error);
    }
};
