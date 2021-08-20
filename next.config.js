const withImages = require('next-images');
// module.exports = withImages();

module.exports = {
    ...withImages(),
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_APP_ENVIRONMENT: process.env.NEXT_PUBLIC_APP_ENVIRONMENT,
        customKey: 'my-value',
    }
  }