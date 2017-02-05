var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var ts = require("gulp-typescript");
var cached = require("gulp-cached");
var typedoc = require("gulp-typedoc");

var tsProject = ts.createProject('tsconfig.json');

gulp.task('build', function () {
    var tsResult = tsProject.src()
        .pipe(cached('ts'))
        .pipe(sourcemaps.init())
        .pipe(tsProject());
        
    return tsResult.js
        .pipe(sourcemaps.write({includeContent: false, sourceRoot: 'src/'}))
        .pipe(gulp.dest('build/'));
    
})

gulp.task('watch', function() {
    gulp.watch('src/**/*.ts', ['build']);
});

gulp.task("typedoc", function() {
    return gulp
        .src(["src/**/*.ts"])
        .pipe(typedoc({
            module: "commonjs",
            target: "es6",
            out: "doc",
            name: "MDE"
        }))
    ;
});
