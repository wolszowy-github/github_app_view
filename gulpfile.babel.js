import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import fileinclude from 'gulp-file-include';
import clean from 'gulp-clean';
import uglifycss from 'gulp-uglifycss';
import { create as bsCreate } from 'browser-sync';
const browserSync = bsCreate();


gulp.task('style', () => {
    return gulp.src('./src/sass/main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(uglifycss())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
})


gulp.task('icons',() => {
    return gulp.src('./src/icons/**')
        .pipe(gulp.dest('./dist/icons'));
});

gulp.task('img', () => {
    return gulp.src('./src/img/**')
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('fonts', () => {
    return gulp.src('./src/fonts/**')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('clean', () => {
    return gulp.src(['dist/'],
        { read: false })
         .pipe(clean());
});


gulp.task('fileinclude', () => {
    gulp.src(['src/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@root'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});


gulp.task('default', ['browser-sync', 'style', 'icons','img','fonts', 'fileinclude'] , () => {
    gulp.watch('./src/sass/**/*.scss', ['style']);
    gulp.watch('./src/*.html', ['fileinclude']).on('change', browserSync.reload);
    gulp.watch('./src/html/**/*.html', ['fileinclude']).on('change', browserSync.reload);
});