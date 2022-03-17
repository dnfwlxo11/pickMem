
console.log(process.env.NODE_ENV)
module.exports = {
    outputDir: '../docs',
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
}