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

    grunt.initConfig({
        less: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    "css/bootstrap.css": "less/bootstrap/bootstrap.less",
                    "css/bootstrap-theme.css": "less/bootstrap-theme/bootstrap-theme.less",
                    "css/footable.css": "less/footable/footable.less",
                    "css/sonatra-bootstrap-panel-collapse.css": "less/bootstrap-panel-collapse/bootstrap-panel-collapse.less",
                    "css/sonatra-bootstrap-nav-scroll.css": "less/bootstrap-nav-scroll/bootstrap-nav-scroll.less",
                    "css/sonatra-jquery-datetime-picker.css": "less/jquery-datetime-picker/jquery-datetime-picker.less",
                    "css/sonatra-hammer-scroll.css": "less/hammer-scroll/hammer-scroll.less",
                    "css/sonatra-jquery-sidebar.css": "less/jquery-sidebar/jquery-sidebar.less",
                    "css/sonatra-select2-hammer-scroll.css": "less/select2-hammer-scroll/select2-hammer-scroll.less",
                    "css/sonatra-select2-responsive.css": "less/select2-responsive/select2-responsive.less",
                    "css/sonatra-jquery-table-select.css": "less/jquery-table-select/jquery-table-select.less",
                    "css/gluon.css": "less/gluon/gluon.less",
                    "css/components.css": "less/components.less"
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('default', ['less']);
};
