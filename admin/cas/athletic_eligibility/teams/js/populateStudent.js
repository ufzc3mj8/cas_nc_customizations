"use strict";
var $j = jQuery.noConflict();
var pageData;

function enableCheckbox(id) {
  $j("#" + id + "_override").removeAttr("disabled");
}

function disableCheckbox(id) {
  $j("#" + id + "_override").prop("disabled", true).removeAttr("checked");
  $j('#' + id + '_override_cb').val(0);
}

function toggleOverride() {
  $j("fieldset").each(function() {
    if ($j("#" + this.id + "_no").is(':checked') === true) {
      enableCheckbox(this.id);
    } else {
      disableCheckbox(this.id);
    }
  });
}

//noinspection JSUnresolvedFunction
$j(document).ajaxStop(function() {
  toggleOverride();
});

$j(document).ready(function() {
  PearsonCas.extSchema.populateForm("json/studentdetail.json.html?id=" + pageData.id);
});