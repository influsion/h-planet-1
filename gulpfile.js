'use strict';

const gulp = require('gulp');
const twig = require('gulp-twig');
const htmlbeautify = require('gulp-html-beautify');
const merge = require('merge-stream');
const del = require('del');
const fs = require('fs');
const less = require('gulp-less');
const concat = require('gulp-concat');
const rev = require('gulp-rev');
const combiner = require('stream-combiner2').obj;
const autoprefix = require('gulp-autoprefixer');
const minimist = require('minimist');
const gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
let cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');

const server = browserSync.create();

function reload(done) {
    server.reload();
    done();
}

function serve(done) {
    server.init({
        server: {
            baseDir: manifest.paths.dist + "/",
            index: 'index.html',
            routes: {
                "/css": manifest.paths.dist + "/css",
                "/fonts": manifest.paths.dist + "/fonts",
                "/images": manifest.paths.dist + "/images",
                "/js": manifest.paths.dist + "/js",
            }
        }
    });
    done();
}

let manifestPath = null;

if (fs.existsSync('./manifest.dist.json')) {
    manifestPath = './manifest.dist.json';
}

if (fs.existsSync('./manifest.json')) {
    manifestPath = './manifest.json';
}

if (manifestPath === null) {
    throw 'Manifest file is missing';
}

const manifest = JSON.parse(fs.readFileSync(manifestPath));

const knownOptions = {
    string: 'env',
    default: {env: process.env.NODE_ENV || 'prod'}
};

const options = minimist(process.argv.slice(2), knownOptions);

const enabled = {
    compression: options.env === 'prod',
    sourcemaps: options.env === 'prod',
    revision: options.env === 'prod',
};

let revManifestPath = manifest.paths.dist + '/rev-manifest.json';

let writeToManifest = function (directory) {
    return combiner(
        gulp.dest(manifest.paths.dist + '/' + directory),
        rev.manifest(revManifestPath, {
            base: manifest.paths.dist,
            merge: true
        }),
        gulp.dest(manifest.paths.dist)
    );
};

gulp.task('templates', function () {
    let pages = gulp.src(manifest.paths.src + '/html/pages/*.twig')
        .pipe(twig())
        .pipe(htmlbeautify())
        .pipe(gulp.dest(manifest.paths.dist + '/'));

    // let partials = gulp.src(manifest.paths.src + '/html/partials/*.twig')
    //     .pipe(twig())
    //     .pipe(htmlbeautify())
    //     .pipe(gulp.dest(manifest.paths.dist + '/html/partials'));

    return merge(pages /*, partials*/)
});

gulp.task('styles', function () {

    let lessFiles = [
        manifest.paths.src + '/less/_style.less'
    ];

    let lessStream = gulp.src(lessFiles)
        .pipe(less())
        .pipe(autoprefix("last 20 version", "> 1%", "ie 8", "ie 7"));

    return merge(lessStream)
        .pipe(gulpif(enabled.sourcemaps, sourcemaps.init()))
        .pipe(concat('styles.css'))
        .pipe(gulpif(enabled.compression, cleanCSS({compatibility: 'ie8'})))
        .pipe(gulp.dest(manifest.paths.dist + '/css'))
        .pipe(gulpif(enabled.sourcemaps, sourcemaps.write()))
        .pipe(gulpif(enabled.revision, rev()))
        .pipe(gulpif(enabled.revision, gulp.dest(manifest.paths.dist + '/css')))
        .pipe(writeToManifest('css'));
});

gulp.task('images', function () {
    let images = [
        manifest.paths.src + '/images/**/*.jpeg',
        manifest.paths.src + '/images/**/*.jpg',
        manifest.paths.src + '/images/**/*.png',
        manifest.paths.src + '/images/**/*.ico',
    ];

    let imagesNoCompress = [
        manifest.paths.src + '/images/**/*.svg',
    ];

    let imagesStream = gulp.src(images)
        .pipe(gulpif(enabled.compression, imagemin()));

    let imagesNoCompressStream = gulp.src(imagesNoCompress);

    return merge(imagesStream, imagesNoCompressStream)
        .pipe(gulp.dest(manifest.paths.dist + '/images'))
});

gulp.task('fonts', function () {
    return gulp.src(manifest.paths.src + '/fonts/**/*{ttf,woff,woff2,svg,eot}')
        .pipe(gulp.dest(manifest.paths.dist + '/fonts'))
});

gulp.task('scripts', function () {
    let files = [
        // manifest.paths.src + '/js/_jquery.js',
        manifest.paths.node_modules + '/svg4everybody/dist/svg4everybody.js',
        manifest.paths.node_modules + '/lightgallery/dist/js/lightgallery.min.js',
        manifest.paths.node_modules + '/lg-thumbnail/dist/lg-thumbnail.min.js',
        manifest.paths.node_modules + '/lg-fullscreen/dist/lg-fullscreen.min.js',
        manifest.paths.src + '/js/slick.min.js',
        manifest.paths.src + '/js/script.js',
    ];

    return gulp.src(files)
        .pipe(babel({
            presets: ['env'],
            ignore: '*node_modules*'
        }))
        .pipe(gulpif(enabled.sourcemaps, sourcemaps.init()))
        .pipe(gulpif(enabled.compression, uglify({nameCache: {}})))
        .pipe(concat('script.js'))
        .pipe(gulp.dest(manifest.paths.dist + '/js'))
        .pipe(gulpif(enabled.revision, rev()))
        .pipe(gulpif(enabled.sourcemaps, sourcemaps.write()))
        .pipe(gulp.dest(manifest.paths.dist + '/js'))
        .pipe(writeToManifest('js'));
});

gulp.task('clean', function () {
    return del(manifest.paths.dist, {force: true});
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel(
        'templates',
        'styles',
        'fonts',
        'images',
        'scripts',
    )
));

gulp.task('default', gulp.series('build'));

gulp.task('watch:styles', function () {
    gulp.watch([manifest.paths.src + '/less/**/*.less'], gulp.series('styles', reload));
});

gulp.task('watch:scripts', function () {
    gulp.watch([manifest.paths.src + '/js/**/*.js'], gulp.series('scripts', reload));
});

gulp.task('watch:images', function () {
    gulp.watch([manifest.paths.src + '/images/**/*.png'], gulp.series('images', reload));
});

gulp.task('watch:images', function () {
    gulp.watch([manifest.paths.src + '/images/**/*.jpeg'], gulp.series('images', reload));
});

gulp.task('watch:images', function () {
    gulp.watch([manifest.paths.src + '/images/**/*.jpg'], gulp.series('images', reload));
});

gulp.task('watch:templates', function () {
    gulp.watch([manifest.paths.src + '/html/**/*.twig'], gulp.series('templates', reload));
});

gulp.task('watch',
    gulp.series(
        'default', serve, gulp.parallel('watch:styles', 'watch:scripts', 'watch:images', 'watch:templates')
    )
);
