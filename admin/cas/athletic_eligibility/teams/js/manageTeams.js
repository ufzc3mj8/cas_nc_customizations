"use strict";
var $j = jQuery.noConflict();
var pageconfig;

/* Prevent blank values by disabling the "Add Student" button if the value is blank */
function enableAddStudent() {
  if ($j('#studentlist').val()) {
    $j('#btnSubmit').prop('disabled', false);
  } else {
    $j('#btnSubmit').prop('disabled', true);
  }
}

/* Populate the student select drop down box */
function populateStudentDropdown() {
  $j.getJSON("json/studentlist.json.html?id=" + pageconfig.teamid, function(data) {
    $j.each(data.students, function() {
      if (this.name) {
        $j("#studentlist").append("<option value=\"" + this.id + "\">" + this.name + "</option>");
      }
    });
  });
}

/* Populate member list on the page */
function populateMemberList() {
  $j.getJSON("json/memberlist.json.html?id=" + pageconfig.teamid, function(data) {
    $j.each(data.students, function() {
      if (this.name) {
        $j("#memberlist").append(
          '<tr>' +
            '<td><a href=\"editstudent.html?id=' + this.id + '&teamid=' + pageconfig.teamid + '&teamname=' + pageconfig.teamname + '\">' + this.name + '</a></td>' +
            '<td>' + this.studentnumber + '</td>' +
            '<td>' + this.eligible + '</td>' +
            '<td><a href=\"manage.html?id=' + pageconfig.teamid + '&name=' + pageconfig.teamname + '&ac=prim&DC-:0.S_NC_AE_TEAMMEMBERS.S_NC_AE_TEAMMEMBERS:' + this.id + '=on\">Delete<a></a></td>' +
            '</tr>');
      }
    });
  });
}

$j('#studentlist').change(function() {
  enableAddStudent();
});

$j(function() {
  populateStudentDropdown();
  populateMemberList();
});