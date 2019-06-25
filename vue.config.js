module.exports = {
    configureWebpack: config => {
        config.externals = {
            'AMap': 'AMap',
            'AMapUI': 'AMapUI'
        }
    }
}
