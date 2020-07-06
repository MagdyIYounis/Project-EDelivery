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
  "jquery",
  "ojs/ojresponsiveutils",
  "ojs/ojresponsiveknockoututils",
  "ojs/ojasyncvalidator-regexp",
  "ojs/ojmessaging",
  "ojs/ojarraydataprovider",
  "ojs/ojlistdataproviderview",
  "ojs/ojknockout",
  "ojs/ojinputtext",
  "ojs/ojlabel",
  "ojs/ojformlayout",
  "ojs/ojselectcombobox",
  "ojs/ojinputnumber",
  "ojs/ojtable",
], async function (
  accUtils,
  ko,
  Bootstrap,
  $,
  ResponsiveUtils,
  ResponsiveKnockoutUtils,
  AsyncRegExpValidator,
  Message,
  ArrayDataProvider,
  ListDataProviderView
) {
  var datacountry;
  $.getJSON("http://localhost:3000/api/countries").then(async (data) => {
    datacountry = await data;
    console.log(datacountry + "----");
  });
  console.log(datacountry);
  function CustomerViewModel() {
    console.log(datacountry);
    var self = this;
    this.val_Country = ko.observable("1");
    this.val_City = ko.observable();
    this.Phone = ko.observableArray([]);
    this.error = ko.observableArray([]);
    var panel;
    this.dataprovider = ko.observable();
    this.Country_Op = ko.observable();
    this.City_Op = ko.observable();
    this.valueChangeHandler = function (event) {
      if (event.type === "valueChanged") {
        var valueArr = event.detail.value;
        var str = valueArr[valueArr.length - 1];
        var patt = new RegExp("[0]{1}[1]{1}[0-5]{1}[0-9]{8}");
        var res = patt.test(str);
        if (!res) {
          var previousValue = event.detail.previousValue;
          this.Phone = previousValue;
          panel.refresh();
          this.error([
            {
              summary: "Error",
              detail: "This Number is correct",
              severity: Message.SEVERITY_LEVEL.ERROR,
            },
          ]);
        } else {
          for (var i = 0; i < valueArr.length; i++) {
            var newVal = valueArr[i];
            // check if it exists in the array
            // eslint-disable-next-line no-loop-func
            var match = ko.utils.arrayFirst(this.Phone, function (item) {
              return item.value === newVal;
            });

            if (!match && newVal) {
              this.Phone.push({ value: newVal, label: newVal });
            }
          }
        }
      }
    }.bind(this);

    $.getJSON("http://localhost:3000/api/Customers").then(function (data) {
      self.dataprovider(
        new ArrayDataProvider(data, {
          keyAttributes: "Cust_ID",
          implicitSort: [{ attribute: "Cust_ID", direction: "ascending" }],
        })
      );
    });

    // Country
    var mapCountry = function (item) {
      var data = item.data;
      var mappedItem = {};
      mappedItem.data = {};
      mappedItem.data.label = data.Country_Name;
      mappedItem.data.value = data.Country_ID;
      mappedItem.metadata = { key: data.Country_ID };

      return mappedItem;
    };
    var dataMapCountry = { mapFields: mapCountry };

    $.getJSON("http://localhost:3000/api/countries").then((data) => {
      var Country = new ArrayDataProvider(data, {
        keyAttributes: "Country_ID",
      });
      this.Country_Op(
        new ListDataProviderView(Country, {
          dataMapping: dataMapCountry,
        })
      );
    });

    var mapCity = function (item) {
      var data = item.data;
      var mappedItem = {};
      mappedItem.data = {};
      mappedItem.data.label = data.City_Name;
      mappedItem.data.value = data.City_ID;
      mappedItem.metadata = { key: data.City_ID };
      return mappedItem;
    };

    var dataMapCity = { mapFields: mapCity };
    this.valueChangeCountry = function (event) {
      $.getJSON(
        "http://localhost:3000/api/countries/" + this.val_Country() + "/cities"
      ).then((data) => {
        var City = new ArrayDataProvider(data, {
          keyAttributes: "City_ID",
        });
        self.City_Op(
          new ListDataProviderView(City, { dataMapping: dataMapCity })
        );
      });
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
      Bootstrap.whenDocumentReady().then(function () {
        panel = document.getElementById("Phone");
      });
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
