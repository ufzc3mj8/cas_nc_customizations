"use strict";

function loadEditData() {
  if (pageData.id > 0) {
    $j.getJSON(pageData.JSONUrl, function(data) {
      if (data.name) {
        $j(pageData.selector).val(data.name);
      }
    });
  }
}

function displayPage() {
  $j("body").removeAttr("style");
}

function submitForm() {
  $j("#btnSubmit").submit();
}

function addDeletionString() {
  $j("form").append("<input type=\"hidden\" name=\"DC-:0." + pageData.table + "." + pageData.table + ":" + pageData.id + "\" value=\"on\">", submitForm());
}

function deleteRecord() {
  $j(pageData.selector).removeAttr("name", addDeletionString());
}

function setSelect(value, field) {
  $j("#" + field).val(value);
}

function setRadio(value, field) {
  $j("#" + field + " input:radio[value=" + value + "]").prop('checked', true);
}

function setCheckBox(value, field) {
  if (value === '1') {
    $j("#" + field).prop('checked', true);
  }
}

function setTextBox(value, field) {
  $j("#" + field).val(value);
}

function populateForm(JSONString) {
  $j.getJSON(JSONString, function(formdata) {
    $j(":text,textarea").each(function() {
      setTextBox(formdata[this.id], this.id);
    });
    $j(":checkbox").each(function() {
      setCheckBox(formdata[this.id], this.id);
    });
    $j("fieldset").each(function() {
      setRadio(formdata[this.id], this.id);
    });
    $j("select").each(function() {
      setSelect(formdata[this.id], this.id);
    });
    displayPage();
  });
}