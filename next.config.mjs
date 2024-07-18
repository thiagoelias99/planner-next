/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['pt-BR'],
    defaultLocale: 'pt-BR',
  },
  generateBuildId: async () => {
    // This could be anything, using the latest git hash
    return process.env.AUTH_SECRET
  }
}

export default nextConfig
