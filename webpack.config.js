module.exports={
    entry: './scr/app/index.js',
    output:{
        path: __dirname + '/scr/public',
        filename: 'bundle.js'
    },
    module: {
        rules:[
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
              }
        
    
    ]

    }
}
