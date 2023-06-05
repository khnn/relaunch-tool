/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/path-checker',
                permanent: false,
            },
        ]
    }
}

module.exports = nextConfig
