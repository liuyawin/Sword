let gulp = require('gulp');
let del = require('del');
let path = require('path');
let runSequence = require('run-sequence');
let connect = require('gulp-connect');
let webpack = require('webpack');

let webpackConfig = require('./webpack.config.js');

    //环境    
let NODE_ENV = process.env.NODE_ENV.split('::'),
    projectName = NODE_ENV[0],
    projectEnv = NODE_ENV[1],

    //输入输出路径
    entryPath = path.join(__dirname, 'src/');
    outputPath = path.join(__dirname, 'build/');

//删除build文件夹下的所有内容
gulp.task('clean', () => {
    del(entryPath + 'build/js/');
});

//webpack
gulp.task('webpack', () => {
    let webpackPlugin = webpack(webpackConfig(projectName, projectEnv));
    return webpackPlugin.run((err, status) => {
        console.log('webpack: ' + err);
        console.log('webpack status: ' + status);
    });
});

gulp.task('webpack-build',() => {
    return runSequence('webpack',reloadHtml);
});

gulp.task('reload-html',() => {
    return gulp.src('build/' + '*.html')
                .pipe(connect.reload())
});

function reloadHtml(){
    if(projectEnv == 'pro'){
         return; 
    }
    gulp.start('reload-html');
}

//webserver
gulp.task('web-server',() => {
    connect.server({
        //host:'',
        root: 'build/',
        port: 8888,
        livereload: true,
        index:false,
        middleware:(connect,opt) => {
            openBrowser('http://' + opt.host + ':' + opt.port);
            return []
        }
    });
});

function defaultBack(){
    if(projectEnv == 'pro'){ 
        return;
    }
    //watch
    gulp.watch(['src/' + '**/*.js'], ['webpack-build']);
    //webserver
    gulp.start('web-server');
}
function openBrowser(url){
    let c = require('child_process');
        c.exec('start ' + url);
}

gulp.task('default', () => {
    runSequence('clean', 'webpack-build', defaultBack);
});





