module.exports = {
  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
  },
  webpack: (config, { isServer, dev }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }

    if (isServer && !dev) {
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = { ...(await originalEntry()) };
        entries['./scripts/postbuild.js'] = './script/postbuild.js';
        return entries;
      };
    }

    return config;
  },
};
