"use strict";
var $j = jQuery.noConflict();

function loadEditData() {
  if (pageData.id > 0) {
    $j.getJSON(pageData.JSONUrl, function(data) {
      if (data.name) {
        $j(pageData.selector).val(data.name);
      }
    });
  }
}

(function(PearsonCas, $j, undefined) {
  //Private Properties
  //var amountOfGrease = '1 Cup';

  //Public Properties
  PearsonCas.extSchema = PearsonCas.extSchema || {};

  //Public Methods
  PearsonCas.extSchema.loadCheckbox = function() {
    checkboxValues();
    checkboxInputs();
  };

  PearsonCas.extSchema.populateForm = function(JSONString) {
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
  };

  //Private Methods
  function checkboxValues() {
    $j(":checkbox").on('change', function() {
      if (this.checked) {
        $j('#' + $j(this).attr('id') + '_cb').val(1);
      } else {
        $j('#' + $j(this).attr('id') + '_cb').val(0);
      }
    });
  }

  function checkboxInputs() {
    $j(':checkbox').each(function() {
      $j(this).before('<input type="hidden" name="' + this.name + '" id="' + this.id + '_cb"/>').removeAttr('name');
    });
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
      $j("#" + field + "_cb").val(1);
    } else {
      $j("#" + field + "_cb").val(0);
    }
  }

  function setTextBox(value, field) {
    $j("#" + field).val(value);
  }

  $j(function() {
    PearsonCas.extSchema.loadCheckbox();
  });
}(window.PearsonCas = window.PearsonCas || {}, jQuery));
