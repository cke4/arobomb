"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var phinclude = require("posthtml-include");
var cheerio = require('gulp-cheerio');
var rigger = require('gulp-rigger');


gulp.task("css", function () {
    return gulp.src("source/sass/style.sass")
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest("dist/css"))
        .pipe(server.stream());
});

gulp.task("html", function() {
    return gulp.src("source/*.html")
        .pipe(rigger())
        .pipe(posthtml([
            phinclude()
        ]))
        .pipe(gulp.dest("dist/"));
});

gulp.task("js", function() {
    return gulp.src("source/js/*.js")
        .pipe(concat("app.js"))
        .pipe(gulp.dest("dist/js/"))
});

gulp.task("js-vendor", function() {
    return gulp.src("source/js/vendor/*.js")
        .pipe(concat("vendors.js"))
        .pipe(gulp.dest("dist/js/"));
});

gulp.task("sprite", function() {
    return gulp.src("source/img/*.svg")
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("dist/img"));
});

gulp.task("img", function() {
    return gulp.src("source/img/*.{png, jpg, jpeg}")
        .pipe(gulp.dest("dist/img/"));
});

gulp.task("server", function () {
    server.init({
        server: "dist/",
        notify: false,
        open: false,
        cors: true,
        ui: false
    });

    gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
    gulp.watch("source/**/*.html", gulp.series("html"));
    gulp.watch("source/img/*.svg", gulp.series("html"));
    gulp.watch("source/js/*.js", gulp.series("js"));
    gulp.watch("source/img/*.svg", gulp.series("sprite"));
    gulp.watch("source/img/*.{png, jpg, jpeg}", gulp.series("img"));
    gulp.watch("source/js/vendor/*.js", gulp.series("js-vendor"));
    gulp.watch("source/**/*.html").on("change", server.reload);
    gulp.watch("source/js/**/*.js").on("change", server.reload);
});

gulp.task("start",
    gulp.series(
        "css",
        "html",
        "js",
        "js-vendor",
        "img",
        "sprite",
        "server"
    ));
