const _config={
    connectionString:process.env.CONNECTION_STRING!,
    websiteUrl:process.env.WEBSITE_URL
}
export const config = Object.freeze(_config)