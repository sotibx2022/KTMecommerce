module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Matches any API request
        destination: "https://ecommercektm.netlify.app/:path*", // Replace with your actual live API URL
      },
    ];
  },
};
