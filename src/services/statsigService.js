import { Statsig } from "@statsig/statsig-node-core";

const statsig = new Statsig(process.env.STATSIG_SERVER_KEY);

export const initStatsig = async () => {
    await statsig.initialize();
    console.log("Statsig initialized");
};

export const logEvent = (user, eventName, value = null, metadata = {}) => {
    statsig.logEvent(user, eventName, value, metadata);
};
