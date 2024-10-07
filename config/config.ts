export default {
    db: {
        uri: process.env.DB_URL ?? "",
        name: process.env.DB_NAME ?? ""
    }
}
