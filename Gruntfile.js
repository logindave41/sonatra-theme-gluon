/*
 * This file is part of the Sonatra package.
 *
 * (c) François Pluchino <francois.pluchino@sonatra.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/*  global module */
/*  global grunt */

module.exports = function (grunt) {
    'use strict';

    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            options: {
                nospawn: true
            },
            default: {
                files: [
                    '/*.html',
                    '/*.css',
                    '**/*.less'
                ],
                tasks: ['less']
            }
        },
        browserSync: {
            options: {
                notify: false,
                port: 9000,
                open: true,
                startPath: "/"
            },
            seed: {
                options: {
                    watchTask: true,
                    injectChanges: false,
                    server: {
                        baseDir: ['examples'],
                        routes: {
                            "/bower_components": "bower_components",
                            "/js": "js",
                            "/css": "css"
                        }
                    }
                },
                bsFiles: {
                    src: [
                        './**/*.{css,html,js}'
                    ]
                }
            }
        },
        less: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    "css/font-awesome.css": "bower_components/font-awesome/less/font-awesome.less",
                    "css/bootstrap.css": "less/bootstrap/bootstrap.less",
                    "css/bootstrap-theme.css": "less/bootstrap-theme/bootstrap-theme.less",
                    "css/footable.css": "less/footable/footable.less",
                    "css/footable-striped.css": "less/footable-striped/footable-striped.less",
                    "css/select2-bootstrap-theme.css": "less/select2-bootstrap-theme/select2-bootstrap-theme.less",
                    "css/sonatra-bootstrap-panel-collapse.css": "less/bootstrap-panel-collapse/bootstrap-panel-collapse.less",
                    "css/sonatra-bootstrap-dropdown-position.css": "less/bootstrap-dropdown-position/bootstrap-dropdown-position.less",
                    "css/sonatra-bootstrap-nav-scroll.css": "less/bootstrap-nav-scroll/bootstrap-nav-scroll.less",
                    "css/sonatra-jquery-datetime-picker.css": "less/jquery-datetime-picker/jquery-datetime-picker.less",
                    "css/sonatra-jquery-scroller.css": "less/jquery-scroller/jquery-scroller.less",
                    "css/sonatra-jquery-sidebar.css": "less/jquery-sidebar/jquery-sidebar.less",
                    "css/sonatra-select2-responsive.css": "less/select2-responsive/select2-responsive.less",
                    "css/sonatra-jquery-table-select.css": "less/jquery-table-select/jquery-table-select.less",
                    "css/sonatra-jquery-table-pager.css": "less/jquery-table-pager/jquery-table-pager.less",
                    "css/sonatra-jquery-table-sort.css": "less/jquery-table-pager/jquery-table-sort.less",
                    "css/gluon.css": "less/gluon/gluon.less"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('serve', function () {
        grunt.task.run([
            'less',
            'browserSync:seed',
            'watch'
        ]);
    });

    grunt.registerTask('default', [
        'serve'
    ]);
};
