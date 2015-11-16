var gulp=require("gulp"),
	gulputil=require("gulp-util"),
	cssmin=require("gulp-cssmin"),
	//rename=require("gulp-rename"),
	uglify=require('gulp-uglify');


gulp.task('uglify',function(){
	gulp.src(['builds/development/aliascss/alias.js','builds/development/aliascss/aliascss-extend-clone.js'])
	.pipe(uglify())
	.pipe(gulp.dest('builds/production/aliascss-min'));
});
gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');
 
    return gulp.src('builds/development/aliascss/alias.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(cssmin())
        //.pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('builds/production/aliascss-min'));
});