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
  "ojs/ojselectcombobox",
  "ojs/ojinputnumber",
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
    this.val_Governorate = ko.observable("Damietta");
    this.val_City = ko.observable("New Damietta");
    this.valueChangeHandler = function (event) {
      if (event.type === "valueChanged") {
        var valueArr = event.detail.value;
        for (var i = 0; i < valueArr.length; i++) {
          var newVal = valueArr[i];
          // check if it exists in the array
          // eslint-disable-next-line no-loop-func
          var match = ko.utils.arrayFirst(this.browsers(), function (item) {
            return item.value === newVal;
          });

          if (!match && newVal) {
            this.browsers.push({ value: newVal, label: newVal });
          }
        }
      }
    }.bind(this);
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
