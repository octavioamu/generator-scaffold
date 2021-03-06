module.exports = function (grunt) {
    grunt.registerTask('build', [
        'clean:build',<% if (isSinglePage) { %>
        'copy:buildHtml',<% } %>
        'less:build',
        'cmq',
        'autoprefixer:build',
        'svgmin',
        'json-minify',<% if (!isSinglePage) { %>
        'assemble:build',<% } %><% if (addModernizr) { %>
        'modernizr',<% } %>
        'wiredep:build',
        'useminPrepare',
        'concat',<% if (addAngular) { %>
        'ngAnnotate',<% } %>
        'uglify',
        'csso',
        'copy:build',
        'cssmin',
        'imageoptim',
        'imageEmbed',
        'rev',
        'usemin',
        'htmlmin',
        'compress',
        'clean:tmp'
    ]);
};
