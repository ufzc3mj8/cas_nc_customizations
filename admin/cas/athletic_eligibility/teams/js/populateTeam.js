"use strict";

function populateStaffLists() {
  $j.getJSON("/admin/cas/athletic_eligibility/json/staff.json.html", function(data) {
    $j.each(data.users, function(id, name) {
      if (this.id) {
        $j("#faculty_assigned").append("<option value=\"" + this.id + "\">" + this.name + "</option>");
        $j("#coach").append("<option value=\"" + this.id + "\">" + this.name + "</option>");
      }
    });

    PearsonCas.extSchema.populateForm("json/formdata.json.html?id=" + pageData.id);
  });
}

function populateAttCodeList() {
  $j.getJSON("/admin/cas/athletic_eligibility/teams/json/attendance_codes.json.html", function(data) {
    $j.each(data.codes, function(id, code, desc) {
      if (this.code === "") this.code = "&nbsp;&nbsp;";
      if (this.id) $j("#attendance_reason").append("<option value=\"" + this.id + "\">(" + this.code + ") " + this.desc + "</option>");
    });
    populateStaffLists();
  });
}

function populateCategoryList() {
  $j.getJSON("/admin/cas/athletic_eligibility/json/categories.json.html", function(data) {
    $j.each(data.categories, function(id, name) {
      if (this.id) $j("#team_category").append("<option value=\"" + this.id + "\">" + this.name + "</option>");
    });
    populateAttCodeList();
  });
}

function populateTypeList() {
  $j.getJSON("/admin/cas/athletic_eligibility/json/types.json.html", function(data) {
    $j.each(data.types, function(id, name) {
      if (this.id) $j("#team_type").append("<option value=\"" + this.id + "\">" + this.name + "</option>");
    });
    populateCategoryList();
  });
}

populateTypeList();

