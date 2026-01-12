#!/usr/bin/env node

import dotenv from "dotenv";
dotenv.config({ override: true }); // Make sure env is injected globally

import "./api/index"; // Start the app after env is loaded
