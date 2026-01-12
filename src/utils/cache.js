import NodeCache from "node-cache";

// stdTTL: time to live in seconds for every new entry
const cache = new NodeCache({ stdTTL: 60 * 60 });

export const getCache = (key) => {
    try {
        const value = cache.get(key);
        if (value) {
            console.log(`Cache hit for key: ${key}`);
            return value;
        }
        console.log(`Cache miss for key: ${key}`);
        return null;
    } catch (error) {
        console.error(`Error getting cache for key: ${key}`, error);
        return null;
    }
};

export const setCache = (key, value) => {
    try {
        console.log(`Setting cache for key: ${key}`);
        cache.set(key, value);
    } catch (error) {
        console.error(`Error setting cache for key: ${key}`, error);
    }
};
