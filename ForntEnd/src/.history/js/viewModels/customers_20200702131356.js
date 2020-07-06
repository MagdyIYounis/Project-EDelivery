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
  "ojs/ojknockout-keyset",
  "ojs/ojknockout",
  "ojs/ojinputtext",
  "ojs/ojlabel",
  "ojs/ojformlayout",
  "ojs/ojselectcombobox",
  "ojs/ojinputnumber",
  "ojs/ojtable",
  "ojs/ojmessages",
  "ojs/ojformlayout",
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
  keySet
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
    this.error_Phone = ko.observableArray([]);
    this.dataprovider = ko.observable();
    this.Country_Op = ko.observable("");
    this.City_Op = ko.observable("");
    this.messagesDataprovider = ko.observableArray([]);
    var msg_error = [];
    this.selectedRows = new keySet.ObservableKeySet();
    this.selectedColumns = new keySet.ObservableKeySet();
    function clear() {
      $("#NameCustomer").val("");
      $("#info").val("");
      $("#Phone")[0].value = [];
    }

    this.valueChangeHandler = function (event) {
      if (
        event.type === "valueChanged" &&
        event.detail.trigger === "enter_pressed"
      ) {
        var valueArr = event.detail.value;
        var str = valueArr[valueArr.length - 1];
        var patt = new RegExp("[0]{1}[1]{1}[0-5]{1}[0-9]{8}");
        var res = patt.test(str);
        if (!res) {
          event.detail.value.pop();
          document.getElementById("Phone").refresh();
          msg_error.push({
            summary: "Error",
            detail: "This NumberPhone is correct",
            severity: Message.SEVERITY_LEVEL.ERROR,
          });
          this.error_Phone(msg_error);

          document.getElementById("Phone").focus();
        }
      }
    }.bind(this);

    var get_Data = () => {
      $.getJSON(
        "http://localhost:3000/api/customer_vs?filter[order]=Cust_ID%20DESC"
      ).then(function (data) {
        self.dataprovider(
          new ArrayDataProvider(data, {
            keyAttributes: "Cust_ID",
            implicitSort: [{ attribute: "Cust_ID", direction: "ascending" }],
          })
        );
      });
    };
    get_Data();
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

    this.Save = (event, data, bindingContext) => {
      if (NameCustomer.valid != "valid") {
        this.messagesDataprovider.push({
          severity: "error",
          summary: "Name",
          detail: "The Name is invalid",
        });
        return true;
      } else if ($("#Governorate")[0].valid != "valid") {
        this.messagesDataprovider.push({
          severity: "error",
          summary: "Country",
          detail: "The Country is invalid",
        });
        return true;
        City;
      } else if ($("#City")[0].valid != "valid") {
        this.messagesDataprovider.push({
          severity: "error",
          summary: "City",
          detail: "The City is invalid",
        });
        return true;
      } else if ($("#Phone")[0].valid != "valid") {
        this.messagesDataprovider.push({
          severity: "error",
          summary: "Phone",
          detail: "The Phone is invalid",
        });
        return true;
      }
      var settings = {
        url:
          "http://localhost:3000/api/Customers?access_token=CYoY6z4BtjjCfkHcy5CMOgrGHMPqmJpcun1vipCTcJkGHSzhBkP3tyrucZpzjaum",
        method: "POST",
        timeout: 0,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          Cust_Name: this.NameCustomer(),
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
        self.messagesDataprovider.push({
          severity: "confirmation",
          summary: response["Cust_ID"],
          detail: "Confirmation Add Customer",
        });
        clear();
        get_Data();
      });
    };

    var selectedListener = function (event) {
      if (event.type === "selectedChanged") {
        var ID_Customer;
        self
          .selectedRows()
          .values()
          .forEach(function (key) {
            ID_Customer = key;
          });
        var settings = {
          url:
            "http://localhost:3000/api/Customers/" +
            ID_Customer +
            "?access_token=CYoY6z4BtjjCfkHcy5CMOgrGHMPqmJpcun1vipCTcJkGHSzhBkP3tyrucZpzjaum",
          method: "GET",
          timeout: 0,
          headers: {
            "Content-Type": "application/json",
          },
        };

        $.ajax(settings).done(function (response) {
          console.log(response);
        });
      }
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
      Bootstrap.whenDocumentReady().then(function () {
        var table = document.getElementById("CustomerTable");
        table.addEventListener("selectedChanged", selectedListener);
      });
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
