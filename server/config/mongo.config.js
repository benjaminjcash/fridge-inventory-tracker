module.exports = {
    local: process.env.__TEST__ ? 'mongodb://localhost/fridge-inventory-tracker-test' : 'mongodb://localhost/fridge-inventory-tracker',
    cloud: process.env.MONGODB_ATLAS_CONNECTION
}