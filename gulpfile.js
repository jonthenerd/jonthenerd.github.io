var gulp = require('gulp')
    , child = require('child_process')
    , util = require('gulp-util')
    , fs = require('fs')
    , yamlFront= require('yaml-front-matter')
    , template = require('es6-template-strings')
    , templateCompile = require('es6-template-strings/compile')
    , templateResolve = require('es6-template-strings/resolve-to-string');

gulp.task('categories', [], function(cb) {
    var posts = fs.readdirSync('_posts');
    var siteCategories = {};

    var getCategoryPageName = function(categoryName) {
        return categoryName.replace(/\./g, 'Dot').replace(/ /g, '') + '.md'
    };

    // Gather category details into json
    for(var i = 0; i < posts.length; i++) {
        var post = '_posts/' + posts[i];
        var doc = yamlFront.loadFront(fs.readFileSync(post, 'utf8'));
        var categories = doc.categories;
        var processedCategories = {};
        if (typeof categories !== 'undefined' && categories !== null) {
            for(var j = 0; j < categories.length; j++) {
                var category = categories[j];
                if (typeof processedCategories[category] === 'undefined') {
                    processedCategories[category] = true;
                    if (typeof siteCategories[category] === 'undefined') {
                        siteCategories[category] = { count: 0 };
                    }
                    siteCategories[category].count++;
                }
            }
        }
    }

    // Remove category pages no longer needed
    var existingCategoryPages = fs.readdirSync('_cats');
    for(var i = 0; i < existingCategoryPages.length; i++) {
        var categoryPage = '_cats/' + existingCategoryPages[i];
        var doc = yamlFront.loadFront(fs.readFileSync(categoryPage, 'utf8'));
        var needsDelete = false;

        if (typeof doc.title === 'undefined') {
            needsDelete = true;
        } else {
            var category = doc.title;
            var expectedCategoryPageName = getCategoryPageName(category);
            
            if (expectedCategoryPageName !== existingCategoryPages[i]) {
                // delete as the name of the page has changed
                needsDelete = true;
            } else if (typeof siteCategories[category] === 'undefined') {
                // category no longer exists
                needsDelete = true;
            }
        }

        if (needsDelete) {
            util.log('deleting category page [' + categoryPage + ']');
            fs.unlinkSync(categoryPage);
        }
    }

    // Write category pages
    var catPageTemplate = templateCompile('---\ntitle: "${title}"\ntitle-lower: "${title.toLowerCase()}"\ntitle-upper: "${title.toUpperCase()}"\npost-count: ${count}\n---');

    for (var category in siteCategories) {
        if (siteCategories.hasOwnProperty(category)) {
            var filename = '_cats/' + getCategoryPageName(category);
            var filecontents = templateResolve(catPageTemplate, 
                { title: category, count: siteCategories[category].count});
            
            var needsWrite = false;

            try {
                var existingFileContents = fs.readFileSync(filename, 'utf8');
                if (filecontents !== existingFileContents)
                    needsWrite = true;
            } catch (e) {
                // it doesn't exist
                needsWrite = true;
            }

            if (needsWrite) {
                util.log('writing category page [' + filename + ']');
                fs.writeFileSync(filename, filecontents);
            }
            
        }
    }

    cb();

});

gulp.task('jekyll', () => {
    const jekyll = child.spawn('bundle', ['exec', 'jekyll', 'serve', '--watch']);

    const jekyllLogger = (buffer) => {
        buffer.toString()
        .split(/\n/)
        .forEach((message) => {
            if (message !== '') {
                util.log('Jekyll: ' + message)
            }
        });
    };

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
});


gulp.task('default', ['categories', 'jekyll'], function() {
    
    gulp.watch('_posts/*.*', ['categories'], function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

});