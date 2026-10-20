// This folder contains options for both the bridge and networking adapter.
// Environment files and .env files are available here. Set the value of any config option to process.env.<ENV name>

import { Config } from "./launcher_types.js";

export const config: Config = {
  adapter: {
    name: "EaglerProxy",
    bindHost: "0.0.0.0",
    // Railway automatically injects the PORT environment variable. This ensures it hooks up correctly.
    bindPort: parseInt(process.env.PORT || "8080"),
    maxConcurrentClients: 20,
    // Set to false if native module building fails during Railway deployment
    useNatives: true,
    skinServer: {
      // Allows proxy connections to fetch custom skins across external domains securely
      skinUrlWhitelist: [
        "https://minecraft.net",
        "https://ashcon.app",
        "https://minotar.net"
      ],
      cache: {
        useCache: true,
        folderName: "skinCache",
        skinCacheLifetime: 60 * 60 * 1000,
        skinCachePruneInterval: 10 * 60 * 1000,
      },
    },
    motd: "FORWARD", // This will fetch your active Play.Hosting Fabric server MOTD automatically
    ratelimits: {
      lockout: 10,
      limits: {
        http: 100,
        ws: 100,
        motd: 100,
        skins: 1000, 
        skinsIp: 10000,
        connect: 100,
      },
    },
    origins: {
      allowOfflineDownloads: true,
      originWhitelist: null,
      originBlacklist: null,
    },
    server: {
      // Connects directly to your Play.Hosting Fabric Server coordinates
      host: "eaglerx.play.hosting",
      port: 25838,
    },
    tls: undefined,
  },
};
