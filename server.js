#!/usr/bin/env node

import dotenv from "dotenv";
dotenv.config({ override: true }); // Make sure env is injected globally
import { initStatsig } from "../src/services/statsigService.js";
await initStatsig();
import "./start.js"; // Start the app after env is loaded
