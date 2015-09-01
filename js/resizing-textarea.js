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
/*global window*/

/**
 * @param {jQuery} $
 */
(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    /**
     * Resize the text area.
     *
     * @param {jQuery} $target
     *
     * @private
     */
    function resize($target) {
        var minRow = $target.attr('data-resizing-rows') || 2,
            scrollHeight,
            lineHeight;

        $target.attr('rows', minRow);
        $target.scrollTop(0);

        scrollHeight = $target.get(0).scrollHeight;
        lineHeight = parseInt($target.css('line-height'), 10);

        $target.attr('rows', Math.max(minRow, Math.floor(scrollHeight / lineHeight)));
    }

    /**
     * On resize event.
     *
     * @param {jQuery.Event|Event} event
     *
     * @private
     */
    function onResize(event) {
        resize($(event.currentTarget));
    }

    // RIPPLE CLASS DEFINITION
    // =======================

    /**
     * @constructor
     *
     * @param {string|elements|object|jQuery} element
     * @param {object}                        options
     *
     * @this ResizingTextarea
     */
    var ResizingTextarea = function (element, options) {
        this.guid     = $.guid;
        this.options  = $.extend(true, {}, ResizingTextarea.DEFAULTS, options);
        this.$element = $(element);

        if ('' === this.options.resizingTextareaSelector) {
            this.options.resizingTextareaSelector = null;
        }

        this.$element.on('change.st.resizing-textarea, keydown.st.resizing-textarea, keyup.st.resizing-textarea' + this.guid, this.options.resizingTextareaSelector, this, onResize);

        var $targets = null !== this.options.resizingTextareaSelector ? $(this.options.resizingTextareaSelector, this.$element)
            : this.$element;

        $targets.each(function (index) {
            var $target = $targets.eq(index);
            $target.css('overflow', 'hidden');

            if (undefined === $target.attr('data-resizing-rows')) {
                $target.attr('data-resizing-rows', $target.attr('rows') || 2);
            }

            resize($target);
        });
    },
        old;

    /**
     * Defaults options.
     *
     * @type Array
     */
    ResizingTextarea.DEFAULTS = {
        resizingTextareaSelector: null
    };

    /**
     * Destroy instance.
     *
     * @this ResizingTextarea
     */
    ResizingTextarea.prototype.destroy = function () {
        var $targets = null !== this.options.resizingTextareaSelector ? $(this.options.resizingTextareaSelector, this.$element)
            : this.$element;

        this.$element.off('change.st.resizing-textarea, keydown.st.resizing-textarea, keyup.st.resizing-textarea' + this.guid, this.options.resizingTextareaSelector, onResize);

        $targets.each(function (index) {
            var $target = $targets.eq(index);

            $target.removeAttr('data-resizing-rows');
        });
    };


    // RIPPLE PLUGIN DEFINITION
    // ========================

    function Plugin(option, value) {
        return this.each(function () {
            var $this   = $(this),
                data    = $this.data('st.resizing-textarea'),
                options = typeof option === 'object' && option;

            if (!data && option === 'destroy') {
                return;
            }

            if (!data) {
                data = new ResizingTextarea(this, options);
                $this.data('st.resizing-textarea', data);
            }

            if (typeof option === 'string') {
                data[option](value);
            }
        });
    }

    old = $.fn.resizingTextarea;

    $.fn.resizingTextarea             = Plugin;
    $.fn.resizingTextarea.Constructor = ResizingTextarea;


    // RIPPLE NO CONFLICT
    // ==================

    $.fn.resizingTextarea.noConflict = function () {
        $.fn.resizingTextarea = old;

        return this;
    };


    // RIPPLE DATA-API
    // ===============

    $(window).on('load', function () {
        $('[data-resizing-textarea]').each(function () {
            var $this = $(this);
            Plugin.call($this, $this.data());
        });
    });

}));
