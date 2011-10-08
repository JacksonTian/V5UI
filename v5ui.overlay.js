/*global $, document, _ */
/**
 * @fileOverview This file is used define the Overlay widget for V5UI library.
 * @author Jackson Tian<shyvo1987@gmail.com>
 */

(function (UI) {

    /**
     * Overlay UI widget. It's a single node in DOM tree.
     * Note: You must defined the .overlay in CSS for the Overlay widget.
     * The .overlay was defined in v5ui.overlay.css.
     * @class
     * @constructor
     * @namespace Overlay.
     * @name V5UI.Overlay
     * @example
     *  .overlay {
     *      position: absolute;
     *      top: 0;
     *      left: 0;
     *      width: 100%;
     *      height: 100%;
     *      z-index: 99;
     *      background-color: rgba(120,120,120, 0.5);
     *  }
     */
    var Overlay = {};
    Overlay.node = null;
    /**
     * Creates the Overlay single node in DOM tree.
     * @name create
     * @methodOf V5UI.Overlay
     */
    Overlay.create = function () {
        if (!Overlay.node) {
            var node = $("<div class='overlay hidden'></div>");
            $(document.body).append(node);
            Overlay.node = node;
        }

        return Overlay.node;
    };

    /**
     * Hides the Overlay single node in DOM tree.
     * @name hide
     * @methodOf V5UI.Overlay
     */
    Overlay.hide = function () {
        if (Overlay.node) {
            Overlay.node.addClass("hidden");
        }
    };

    /**
     * Displays the Overlay single node in DOM tree.
     * @name show
     * @methodOf V5UI.Overlay
     */
    Overlay.show = function () {
        if (Overlay.node) {
            Overlay.node.removeClass("hidden");
        }
    };

    UI.Overlay = Overlay;
}(V5UI));
