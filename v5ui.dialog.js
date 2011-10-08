/*global $, document, _ */
/**
 * @fileOverview This file is used define the Dialog widget for V5UI library.
 * @author Jackson Tian<shyvo1987@gmail.com>
 */

(function (UI) {
    var body = $(document.body);
    /**
     * Dialog widget.
     * @name V5UI.Dialog
     * @namespace All templates will be stored at here.
     * @class
     */
    var Dialog = function (options, l10n, okHandle, node) {
        if (typeof node === "object") {
            this.dialogNode = node;
        } else {
            node = node || UI.Dialog.defaultTemplate;
            var dialogNode = $(_.template(node, l10n));
            body.append(dialogNode);
            this.dialogNode = dialogNode;
        }
        var h = Array.prototype.slice.apply(arguments, [4]);
        this.init.apply(this, [options, okHandle, h]);
    };

    /**
     * @constructs
     * @name init
     * @private
     * @methodOf V5UI.Dialog#
     */
    Dialog.prototype.init = function (options, okHandle, h) {
        var self = this,
            node = this.dialogNode;
        if (options.className) {
            node.addClass(options.className);
        }
        if (options.refer) {
            this.refer = options.refer;
        }
        if (options.modal) {
            this.dialogOverlayNode = UI.Overlay.create();
        }
        if (okHandle) {
            node.delegate(".yes", "click", okHandle);
        }
        node.delegate(".cancel", "click", function (event) {
            event.preventDefault();
            self.close();
            self.destroy();
        });
        if (options.afterClose) {
            this.afterClose = options.afterClose;
        }
    };

    /**
     * @name open
     * @methodOf V5UI.Dialog#
     */
    Dialog.prototype.open = function () {
        var node = this.dialogNode,
            overlay = this.dialogOverlayNode,
            top,
            left;
        node.removeClass("hidden");
        top = (body.height() - node.height()) / 2;
        node.css("top", top);
        left = (body.width() - node.width()) / 2;
        node.css("left", left);
        if (overlay) {
            overlay.removeClass("hidden");
        }
        return this;
    };

    /**
     * @name close
     * @methodOf V5UI.Dialog#
     */
    Dialog.prototype.close = function () {
        var g = this.dialogNode;
        g.addClass("hidden");
        g.removeClass("fixed");
        if (this.dialogOverlayNode) {
            this.dialogOverlayNode.addClass("hidden");
        }
        return this;
    };

    /**
     * Destroy the dialog's node in DOM.
     * @name destroy
     * @methodOf V5UI.Dialog#
     */
    Dialog.prototype.destroy = function () {
        this.dialogNode.remove();
    };

    UI.Dialog = Dialog;
}(V5UI));
/**
 * Dialog UI widget and template.
 */
(function (UI) {
    var buffer = "";
    buffer += "<div class='dialog hidden'>";
    buffer +=     "<div class='inner'>";
    buffer +=         "<div class='title'><%=title%></div>";
    buffer +=         "<div class='buttons'>";
    buffer +=             "<a class='cancel' href='javascript:;'><%=cancel%></a>";
    buffer +=             "<a class='yes' href='javascript:;'><%=yes%></a>";
    buffer +=         "</div>";
    buffer +=     "</div>";
    buffer += "</div>";
    /**
     * Default template of Dialog widget.
     * @name defaultTemplate
     * @memberOf V5UI.Dialog#
     */
    UI.Dialog.defaultTemplate = buffer;
}(V5UI));
