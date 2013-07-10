"use strict";
var selectedExitCode;
var $j;
function selectExitCode() {
  selectedExitCode = $j("#exitcode").val();
  $j('[name*="001033"]').val(selectedExitCode);
  validateThisForm();
}

function exitCodeSelect() {
  $j.getJSON("/admin/cas/daily_headcount/json/exitcodes.json.html", function(result) {
    $j.each(result.codes, function() {
      if (this.name) {
        $j("#exitcode").append("<option value=\"" + this.name + "\">" + this.description + "</option>");
      }
    });
  });
}

function schoolSubmit() {
  var frm = $j('#schoolactions');
  console.log(frm.attr('method'));
  $j.ajax({
    type : frm.attr('method'),
    data : frm.serialize(),
  }).done(function() {
      window.location = '/admin/changesrecorded.white.html';
  });
}

function enrollmentSubmit() {
  var frm = $j('#enrollmentactions');
  $j.ajax({
    type    : frm.attr('method'),
    data    : frm.serialize(),
    success : function(data) {
      schoolSubmit();
    }
  });
}

function attendanceSubmit() {
  var frm = $j('#attendanceactions');
  $j.ajax({
    type: frm.attr('method'),
    data: frm.serialize(),
    success: function(data) {
      enrollmentSubmit();
    }
  });
}

function dropStudentEnrollment(dcid,id,entrydate) {
  $j("#enrstudentaction-" + id).append("<input type=\"hidden\" name=\"UF-001016" + dcid + "\" value=\"" + (entrydate).replace("_", "/", "g") + "\" />");
  $j("#enrstudentaction-" + id).append("<input type=\"hidden\" name=\"UF-001007" + dcid + "\" value=\"2\" />");
  $j("#enrstudentaction-" + id).append("<input type=\"hidden\" name=\"UF-001033" + dcid + "\" value=\"" + selectedExitCode + "\" />");
}

function dropCCEnrollments(id,entrydate) {
  $j.getJSON("/admin/cas/daily_headcount/json/dropCC.json.html?studentid=" + id + "&entrydate=" + entrydate, function(result) {
    $j.each(result.enrollments, function() {
      if(this.dcid) {
        $j("#enrstudentaction-" + id).append("<input type=\"hidden\" name=\"UF-004005" + this.dcid + "\" value=\"" + this.dateenrolled + "\" />");
        $j("#enrstudentaction-" + id).append("<input type=\"hidden\" name=\"UF-004007" + this.dcid + "\" value=\"-" + this.termid + "\" />");
      }
    });
  });
}

function changeStudents(dcid,id,entrydate,validdate) {
  $j("#schoolstudentaction-" + id).append("<input type=\"hidden\" name=\"UF-001015" + dcid + "\" value=\"" + (validdate).replace("_", "/", "g") + "\" />");
}

function changeCCEnrollments(id,entrydate,validdate) {
  $j.getJSON("/admin/cas/daily_headcount/json/changeCC.json.html?studentid=" + id + "&entrydate=" + entrydate + "&validdate=" + validdate, function(result) {
    $j.each(result.enrollments, function() {
      if(this.dcid) {
        $j("#enrstudentaction-" + id).append("<input type=\"hidden\" name=\"UF-004004" + this.dcid + "\" value=\"" + (validdate).replace("_","/","g") + "\" />");
      }
    });
  });
}

function removeAttendance(id,entrydate,validdate) {
  $j.getJSON("/admin/cas/daily_headcount/json/attendance.json.html?studentid=" + id + "&entrydate=" + entrydate + "&validdate=" + validdate, function(result) {
    $j.each(result.attendance, function() {
      if(this.dcid) {
        $j("#attstudentaction-" + id).append("<input type=\"hidden\" name=\"UF-157002" + this.dcid + "\" value=\"" + headcount.currentpresentid + "\" />");
      }
    });
  });
}

function validateThisForm() {
  var numberOfDrops = $j('[name*="001033"]').length;
  if ((selectedExitCode == null || selectedExitCode == '') && numberOfDrops > 0) {
    $j('#btnSubmit').attr('disabled','disabled');
    $j('#formError').show();
  } else {
    $j('#btnSubmit').removeAttr('disabled');
    $j('#formError').hide();
  }
}

function dropStudent(dcid,id,entrydate,validdate) {
  $j("#attstudentaction-" + id).html("");
  $j("#enrstudentaction-" + id).html("");
  $j("#schoolstudentaction-" + id).html("");
  removeAttendance(id,entrydate,validdate);
  dropCCEnrollments(id,entrydate);
  dropStudentEnrollment(dcid,id,entrydate);
  validateThisForm();
}

function changeEnrollment(dcid,id,entrydate,validdate) {
  $j("#attstudentaction-" + id).html("");
  $j("#enrstudentaction-" + id).html("");
  $j("#schoolstudentaction-" + id).html("");
  removeAttendance(id, entrydate, validdate);
  changeCCEnrollments(id,entrydate,validdate);
  changeStudents(dcid,id,entrydate,validdate);
}

function doNothing(id) {
  $j("#attstudentaction-" + id).html("&nbsp;");
  $j("#enrstudentaction-" + id).html("&nbsp;");
  $j("#schoolstudentaction-" + id).html("&nbsp;");
  validateThisForm();
}

function listStudents() {
  $j.getJSON("/admin/cas/daily_headcount/json/studentlist.json.html", function(data) {
    $j.each(data.students, function() {
      if (this.id) {
        $j("#studentlist").append("<tr>" +
          "<td>" + this.student + "</td>" +
          "<td>" + this.entrydate + "</td>" +
          "<td id=\"exitdate-" + this.id + "\">Never</td>" +
          "<td id=\"action-" + this.id + "\">" +
          "<input type=\"radio\" name=\"studentaction_" + this.id + "\" onChange=\"dropStudent(" + this.dcid + "," + this.id + ",'" + (this.entrydate).replace("/", "_", "g") + "','" + (this.validdate).replace("/", "_", "g") + "');\"> Drop Student as No Show</input><br/>" +
          "<input type=\"radio\" name=\"studentaction_" + this.id + "\" checked=\"checked\" onChange=\"doNothing(" + this.id + ");\"> Do Nothing</input><br/>" +
          "</td>" +
          "</tr>");
        if (this.validdate !== '0/0/0') {
          $j("#exitdate-" + this.id).html(this.validdate);
          $j("#action-" + this.id).prepend("<input type=\"radio\" name=\"studentaction_" + this.id + "\" onChange=\"changeEnrollment(" + this.dcid + "," + this.id + ",'" + (this.entrydate).replace("/", "_", "g") + "','" + (this.validdate).replace("/", "_", "g") + "');\"> Change enrollment date to " + this.validdate + "</input><br/>");
        }
        $j("#attendanceactions").append("<div id=\"attstudentaction-" + this.id + "\">&nbsp;</div>");
        $j("#enrollmentactions").append("<div id=\"enrstudentaction-" + this.id + "\">&nbsp;</div>");
        $j("#schoolactions").append("<div id=\"schoolstudentaction-" + this.id + "\">&nbsp;</div>");
      }
    });
  }).fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ', ' + error;
    console.log( "Request Failed: " + err);
  });
}

function changeHeader()
{
  $j('H1').html('Enrollment Summary')
}

$j(function() {
  exitCodeSelect();
  listStudents();
  $j('#btnSubmit').click(function() {
    loadingDialog();
    attendanceSubmit();
  });
});

$j(document).ajaxStart(function() {
  $j('#loading_page').show();
});
$j(document).ajaxStop(function() {
  $j('#loading_page').hide();
});