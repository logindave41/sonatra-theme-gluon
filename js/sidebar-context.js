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
        define(['jquery', 'sonatra-jquery-sidebar'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    /**
     * On switch event.
     *
     * @param {jQuery.Event|Event} event
     *
     * @private
     */
    function onSwitch(event) {
        event.data.toggle();
    }

    // SIDEBAR CONTEXT CLASS DEFINITION
    // ================================

    /**
     * @constructor
     *
     * @param {string|elements|object|jQuery} element
     * @param {object}                        options
     *
     * @this SidebarContext
     */
    var SidebarContext = function (element, options) {
        this.guid     = $.guid;
        this.options  = $.extend(true, {}, SidebarContext.DEFAULTS, options);
        this.$element = $(element);
        this.$context = $(this.options.sidebarContextSelector, this.$element);

        this.$context.on('click.st.sidebar-context', null, this, onSwitch);
    },
        old;

    /**
     * Defaults options.
     *
     * @type Array
     */
    SidebarContext.DEFAULTS = {
        sidebarContextSelector: '.sidebar-header .sidebar-menu-toggle'
    };

    /**
     * Open the secondary menu.
     *
     * @this SidebarContext
     */
    SidebarContext.prototype.open = function () {
        if (this.$element.hasClass('sidebar-menu-switched')) {
            return;
        }

        this.$element.addClass('sidebar-menu-switched');
        this.$element.sidebar('refresh');
    };

    /**
     * Close the secondary menu.
     *
     * @this SidebarContext
     */
    SidebarContext.prototype.close = function () {
        if (!this.$element.hasClass('sidebar-menu-switched')) {
            return;
        }

        this.$element.removeClass('sidebar-menu-switched');
        this.$element.sidebar('refresh');
    };

    /**
     * Open or close the secondary menu.
     *
     * @this SidebarContext
     */
    SidebarContext.prototype.toggle = function () {
        if (this.$element.hasClass('sidebar-menu-switched')) {
            this.close();
        } else {
            this.open();
        }
    };

    /**
     * Destroy instance.
     *
     * @this SidebarContext
     */
    SidebarContext.prototype.destroy = function () {
        this.$context.off('click.st.sidebar-context', onSwitch);

        delete this.$element;
        delete this.$context;

        this.$element.removeData('st.sidebar-context');
    };


    // SIDEBAR CONTEXT PLUGIN DEFINITION
    // =================================

    function Plugin(option, value) {
        return this.each(function () {
            var $this   = $(this),
                data    = $this.data('st.sidebar-context'),
                options = typeof option === 'object' && option;

            if (!data && option === 'destroy') {
                return;
            }

            if (!data) {
                data = new SidebarContext(this, options);
                $this.data('st.sidebar-context', data);
            }

            if (typeof option === 'string') {
                data[option](value);
            }
        });
    }

    old = $.fn.sidebarContext;

    $.fn.sidebarContext             = Plugin;
    $.fn.sidebarContext.Constructor = SidebarContext;


    // SIDEBAR CONTEXT NO CONFLICT
    // ===========================

    $.fn.sidebarContext.noConflict = function () {
        $.fn.sidebarContext = old;

        return this;
    };


    // SIDEBAR CONTEXT DATA-API
    // ========================

    $(window).on('load', function () {
        $('[data-sidebar-context="true"]').each(function () {
            var $this = $(this);
            Plugin.call($this, $this.data());
        });
    });

}));
