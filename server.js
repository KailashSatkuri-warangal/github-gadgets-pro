#!/usr/bin/env node

import dotenv from "dotenv";
dotenv.config({ override: true }); // Make sure env is injected globally

import "./start.js"; // Start the app after env is loaded
