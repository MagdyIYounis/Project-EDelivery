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
], function (
  accUtils,
  ko,
  Bootstrap,
  $,
  ResponsiveUtils,
  ResponsiveKnockoutUtils,
  AsyncRegExpValidator,
  Message,
  ArrayDataProvider,
  ListDataProviderView,
  ojTable
) {
  function CustomerViewModel() {
    var self = this;
    this.val_Country = ko.observable("");
    this.NameCustomer = ko.observable("");

    this.District_Number = ko.observable(0);
    this.Neighboring_Number = ko.observable(0);
    this.Block_Number = ko.observable(0);
    this.Floor_Number = ko.observable(0);
    this.Flat_Number = ko.observable(0);
    this.info = ko.observable("");

    this.val_City = ko.observable("");
    this.Phone = ko.observableArray("");
    this.error = ko.observableArray([]);
    var panel;
    this.dataprovider = ko.observable();
    this.Country_Op = ko.observable("");
    this.City_Op = ko.observable("");

    this.valueChangeHandler = function (event) {
      if (event.type === "valueChanged") {
        var valueArr = event.detail.value;
        var str = valueArr[valueArr.length - 1];
        var patt = new RegExp("[0]{1}[1]{1}[0-5]{1}[0-9]{8}");
        var res = patt.test(str);
        if (!res) {
          var previousValue = event.detail.previousValue;
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

    $.getJSON("http://localhost:3000/api/countries").then(async (data) => {
      var Country = new ArrayDataProvider(data, {
        keyAttributes: "Country_ID",
      });
      this.Country_Op(
        new ListDataProviderView(Country, {
          dataMapping: dataMapCountry,
        })
      );
      this.val_Country(1);
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

    this.valid_Name = ko.observableArray([
      new AsyncRegExpValidator({
        pattern: "^[\u0621-\u064A\u0660-\u0669 ]+$",
        hint: "enter two words with a space between it.",
        messageDetail: "messageDetailString",
      }),
    ]);

    this.Save = (event) => {
      /* var settings = {
        url:
          "http://localhost:3000/api/Customers?access_token=CYoY6z4BtjjCfkHcy5CMOgrGHMPqmJpcun1vipCTcJkGHSzhBkP3tyrucZpzjaum",
        method: "POST",
        timeout: 0,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          Cust_Name: this.NameCustomer(),
          Governorate_Name: this.val_Country(),
          District_Number: this.District_Number(),
          Neighboring_Number: this.Neighboring_Number(),
          Block_Number: this.Block_Number(),
          Floor_Number: this.Floor_Number(),
          Flat_Number: this.Flat_Number(),
          Info: this.info(),
          Point: 0,
          cityId: this.val_City(),
        }),
      };

      $.ajax(settings).done(function (response) {
        console.log(response);
      });*/

      var t = document.getElementById("table");

      t.refresh();
    };

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
