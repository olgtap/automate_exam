"use strict";
const gulp = require('gulp'),
    rimraf = require('rimraf'),
    sass = require('gulp-sass'),
    prefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    rigger = require('gulp-rigger'),
    terser = require('gulp-terser'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload();

const path = {
    build: {
        all: 'build/',
        html: 'build/',
        scss: 'build/css/',
        js: 'build/js/',
        img: 'build/img/'
    },
    src: {
        img: 'img/**/*.{jpg,svg}',
        css: 'src/css/**/*.css',
        html: 'src/**/*.{html,htm}',
        scss: 'src/scss/*.scss',
        js: 'src/js/*.js'
    },
    watch: {}
};

// tasks

gulp.task('default', function (done){
   console.log(path);
   done();
});

gulp.task('js', function(done) {
    gulp.src(path.src.js)
        .pipe(terser())
        .pipe(gulp.dest(path.build.js));
    done();
});

gulp.task('img', function(done) {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img));
    done();
});

gulp.task('clean', function(done){
    rimraf(path.build.all, done);
});


gulp.task('html',function(done){
    gulp.src(path.src.html)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(path.build.html));
    done();
});

gulp.task('css', function(done) {
    gulp.src(path.src.css)
        .pipe(gulp.dest(path.build.scss));
    done();
});

gulp.task('sass',function(done){
    gulp.src(path.src.scss)
        .pipe(sass({
            outputStyle:"compressed",
            sourcemaps:false
        }))
        .pipe(gulp.dest(path.build.scss));
    done();
});

gulp.task('build', gulp.series('clean','html','css','sass','js','img'));

// webserver

var config = {
    server: {
        baseDir: "./build/", // base directory
        index:"index.html", // start page
    },
    tunnel: true, // tunnel
    //proxy: 'donate.local', // for php and xampp vhosts
    host: 'localhost',
    port: 7787,
    logPrefix: "WebDev"
};

gulp.task('webserver', function (done) {
    browserSync(config);
    done();
});

