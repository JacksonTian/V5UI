/*global $, _ */
/**
 * @fileOverview This file is used define the Tabview widget for V5UI library.
 * @author Jackson Tian<shyvo1987@gmail.com>
 */

(function (UI) {
    /**
     * Tab UI widget.
     * @name V5UI.Tab
     * @class
     */
    var Tab = function (tabNode, panelNode, module) {
        _.extend(this, EventProxy.prototype);
        this.tab = tabNode;
        this.panel = panelNode;
        if (typeof module === "function") {
            module.apply(this, []);
        }
    };
    UI.Tab = Tab;
}(V5UI));
/**
 * TabView definition.
 */
(function (UI) {
    /**
     * TabView UI widget.
     * @name V5UI.TabView
     * @class
     */
    var TabView = function (node, modules) {
        this.node = node;
        this._tabs = [];
        if (modules) {
            var tabNodes = node.find(".tabs li");
            var panelNodes = node.find(".panels .panel");
            this._tabs = _.map(modules, function (module, index) {
                return new V5UI.Tab($(tabNodes[index]), $(panelNodes[index]), module);
            });
        }
        this.activeTab(0);
        this.delegateEvents();
    };

    TabView.prototype.activeTab = function (index) {
        var node = this.node;
        node.find(".tabs li.active").removeClass("active");
        node.find(".tabs li:nth-child(" + (index + 1) + ")").addClass("active");
        node.find(".panels .panel.active").removeClass("active");
        node.find(".panels .panel:nth-child(" + (index + 1) + ")").addClass("active");
        var tab = this._tabs[index];
        if (tab) {
            if (typeof tab.activeCount !== "undefined") {
                tab.activeCount++;
                tab.trigger("active");
            } else {
                tab.activeCount = 0;
                tab.trigger("initialize");
            }
        }
    };
    TabView.prototype.delegateEvents = function () {
        var that = this;
        var node = that.node;
        node.delegate(".tabs li", "click", function (event) {
            var index = $(this).index();
            that.activeTab(index);
        });
    };
    UI.TabView = TabView;
}(V5UI));
