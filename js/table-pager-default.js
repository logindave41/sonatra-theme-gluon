/*
 * This file is part of the Sonatra package.
 *
 * (c) François Pluchino <francois.pluchino@sonatra.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/*global define*/
/*global jQuery*/

/**
 * @param {jQuery} $
 *
 * @typedef {object} define.amd
 */
(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'sonatra-jquery-table-pager'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    // TABLE PAGER CLASS DEFINITION
    // ============================

    $.fn.tablePager.Constructor.DEFAULTS = $.extend(true, {}, $.fn.tablePager.Constructor.DEFAULTS, {
        affixTarget:      '.container-main',
        loadingTemplate: '<caption><div class="spinner-floating spinner-mini"><svg class="spinner spinner-accent"><circle class="spinner-path" cx="22" cy="22" r="20"></circle></svg></div></caption>'
    });

}));
