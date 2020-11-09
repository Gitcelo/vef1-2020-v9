module.exports = {
    input: './src/index.js',
    output: {
        file: './dist/bundle.js',
        format: 'iife',
        sourcemap: true,
    },
    plugins: [
        babel({
            sourcemaps: true,
            presets: [['@babel/preset-env',
               { targets: '> 0.25%, not dead' }]],
        }),
    ]};
