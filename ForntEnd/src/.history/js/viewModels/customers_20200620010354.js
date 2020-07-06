/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
/*
 * Your customer ViewModel code goes here
 */
define([
  "accUtils",
  "knockout",
  "ojs/ojbootstrap",
  "ojs/ojresponsiveutils",
  "ojs/ojresponsiveknockoututils",
  "ojs/ojmessaging",
  "ojs/ojknockout",
  "ojs/ojinputtext",
  "ojs/ojlabel",
  "ojs/ojformlayout",
], function (
  accUtils,
  ko,
  Bootstrap,
  ResponsiveUtils,
  ResponsiveKnockoutUtils,
  Message
) {
  function CustomerViewModel() {
    var self = this;
    // Below are a set of the ViewModel methods invoked by the oj-module component.
    // Please reference the oj-module jsDoc for additional information.

    /**
     * Optional ViewModel method invoked after the View is inserted into the
     * document DOM.  The application can put logic that requires the DOM being
     * attached here.
     * This method might be called multiple times - after the View is created
     * and inserted into the DOM and after the View is reconnected
     * after being disconnected.
     */
    this.isSmall = ResponsiveKnockoutUtils.createMediaQueryObservable(
      ResponsiveUtils.getFrameworkQuery(
        ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY
      )
    );

    this.columns = ko.computed(
      function () {
        return this.isSmall() ? 1 : 3;
      }.bind(this)
    );

    this.error = [
      {
        summary: "summary",
        detail: "detail",
        severity: Message.SEVERITY_LEVEL.ERROR,
      },
    ];
    this.warning = [
      {
        summary: "summary",
        detail: "detail",
        severity: Message.SEVERITY_LEVEL.WARNING,
      },
    ];
    this.info = [
      {
        summary: "summary",
        detail: "detail",
        severity: Message.SEVERITY_LEVEL.INFO,
      },
    ];
    this.confirmation = [
      {
        summary: "summary",
        detail: "detail",
        severity: Message.SEVERITY_LEVEL.CONFIRMATION,
      },
    ];
    this.multiple = [
      {
        summary: "summary",
        detail: "detail",
        severity: Message.SEVERITY_LEVEL.ERROR,
      },
      {
        summary: "summary",
        detail: "detail",
        severity: Message.SEVERITY_LEVEL.WARNING,
      },
    ];

    this.value = ko.observable("");
    this.rawValue = ko.observable("");
    self.connected = function () {
      accUtils.announce("Customers page loaded.", "assertive");
      document.title = "Customers";
      // Implement further logic if needed
    };

    /**
     * Optional ViewModel method invoked after the View is disconnected from the DOM.
     */
    self.disconnected = function () {
      // Implement if needed
    };

    /**
     * Optional ViewModel method invoked after transition to the new View is complete.
     * That includes any possible animation between the old and the new View.
     */
    self.transitionCompleted = function () {
      // Implement if needed
    };
  }

  /*
   * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
   * return a constructor for the ViewModel so that the ViewModel is constructed
   * each time the view is displayed.
   */
  return CustomerViewModel;
});
