"use strict";
var $j,
  stugradelevel,
  rangeid,
  speakingRaw,
  listeningRaw,
  readingRaw,
  speakingPL = 0,
  listeningPL = 0,
  readingPL = 0,
  writingPL = 0,
  cplval = 0,
  acplvalue,
  lepval,
  tierval,
  lepstatus,
  classification,
  stuDcid = '~(rn)';
//  alert(stuDcid);

var tbl_cpl = ('<tr>' +
  '<td><label for="SPEAKING_RAW">Speaking Raw</label></td>' +
  '<td><select name="CF-[STUDENTS:' + stuDcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-1]Name=SPEAKING_RAW" id="SPEAKING_RAW" class="rawSelect" onChange="speakingProficiency();">' +
  '<option value=" "></option>' +
  '</select>' +
  '</td>' +
  '<td><label for="SPEAKING_PL_ID">PL</label></td>' +
  '<td>' +
  '<div class="proflevel" id="SPEAKING_PL_ID" name="CF-[STUDENTS:' + stuDcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-1]Name=SPEAKING_PL_ID">&nbsp;</div>' +
  '</td>' +
  '</tr>' +
  '<tr id="write">' +
  '<td><label for="write_raw">Writing Raw</label></td>' +
  '<td>' +
  '<div id="write_raw">N/A</div>' +
  '</td>' +
  '<td><label for="wrselect">PL</label></td>' +
  '<td id="writingplopt"><select name="CF-[STUDENTS:' + stuDcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-1]Name=WRITING_PL_ID" id="wrselect" class="rawSelect" onChange="writingProficiency();">' +
  '<option value=""></option>' +
  '</select>' +
  '<div id="WRITING_PL_ID" name="CF-[STUDENTS:' + stuDcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-1]Name=WRITING_PL_ID" style="display:none;">&nbsp;</div>' +
  '</td>' +
  '</tr>' +
  '<tr>' +
  '<td><label for="LISTENING_RAW">Listening Raw</label></td>' +
  '<td><select id="LISTENING_RAW" name="CF-[STUDENTS:' + stuDcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-1]Name=LISTENING_RAW" class="rawSelect" onChange="listeningProficiency();">' +
  '<option value=""></option>' +
  '</select>' +
  '</td>' +
  '<td><label for="LISTENING_PL_ID">PL</label></td>' +
  '<td>' +
  '<div class="proflevel" id="LISTENING_PL_ID" name="CF-[STUDENTS:' + stuDcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-1]Name=LISTENING_PL_ID">&nbsp;</div>' +
  '</td>' +
  '</tr>' +
  '<tr id="read">' +
  '<td><label for="READING_RAW">Reading Raw</label></td>' +
  '<td><select name="CF-[STUDENTS:' + stuDcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-1]Name=READING_RAW" id="READING_RAW" class="rawSelect" onChange="readingProficiency();">' +
  '<option value=""></option>' +
  '</select>' +
  '</td>' +
  '<td><label for="READING_PL_ID">PL</label></td>' +
  '<td>' +
  '<div class="proflevel" id="READING_PL_ID" name="CF-[STUDENTS:' + stuDcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-1]Name=READING_PL_ID">&nbsp;</div>' +
  '</td>' +
  '</tr>' +
  '<tr>' +
  '<td><label for="CPL">CPL</label></td>' +
  '<td>' +
  '<div id="CPL" name="CF-[STUDENTS:' + stuDcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-1]Name=CPL">&nbsp;</div>' +
  '</td>' +
  '<td></td>' +
  '<td></td>' +
  '</tr>' +
  '<tr>' +
  '<td><label for="ADJUSTED_CPL">Adjusted CPL</label></td>' +
  '<td>' +
  '<div id="ADJUSTED_CPL" name="CF-[STUDENTS:' + stuDcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-1]Name=ADJUSTED_CPL">&nbsp;</div>' +
  '</td>' +
  '<td></td>' +
  '<td></td>' +
  '</tr>' +
  '<tr id="lep">' +
  '<td><label for="LEP_STATUS_ID">LEP Status</label></td>' +
  '<td>' +
  '<div id="LEP_STATUS_ID" name="CF-[STUDENTS:' + stuDcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-1]Name=LEP_STATUS_ID">&nbsp;</div>' +
  '</td>' +
  '<td><label for="TIER_ID">Tier</label></td>' +
  '<td>' +
  '<div id="TIER_ID" name="CF-[STUDENTS:' + stuDcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-1]Name=TIER_ID">&nbsp;</div>' +
  '</td>' +
  '</tr>');

$j(document).ajaxStart(function() {
  loadingDialog();
});
$j(document).ajaxStop(function() {
  closeLoading();
});

function resetVars() {
    speakingRaw = null,
    listeningRaw = null,
    readingRaw = null,
    speakingPL = 0,
    listeningPL = 0,
    readingPL = 0,
    writingPL = 0,
    cplval = 0,
    acplvalue = null,
    lepval = null,
    tierval = null,
    lepstatus = null,
    classification = null;
}

function calcClassification() {
  lepstatus = $j('#LEP_STATUS_ID').html();
  if (lepstatus === 'Never' || lepstatus === 'Exited') {
    classification = 'Reclassification';
  } else {
    $j.getJSON('json/classificationinfo.json.html?studcid=' + stuDcid, function(result) {
      if (result.recordcount === '0') {
        classification = 'Initial';
      } else if (result.recordcount > 0 && result.testdatestatus === 'IU' && lepstatus === 'Current') {
        classification = 'Instructional Update';
      } else if (result.recordcount > 0 && result.testdatestatus === 'NA' && lepstatus === 'Current') {
        classification = 'Current';
      }
      $j('#CLASS').val(classification);
    });
  }
}

function calcTier() {
  if (cplval >= 1 && cplval < 2.5) {
    tierval = 'A';
  } else if (cplval >= 2.5 && cplval <= 4.0) {
    tierval = 'B';
  } else if (cplval > 4.0) {
    tierval = 'C';
  }
  $j('#TIER_ID').html(tierval);
  calcClassification();
}

function calcLEP() {
  speakingPL = parseFloat($j('#SPEAKING_PL_ID').html());
  readingPL = parseFloat($j('#READING_PL_ID').html());
  listeningPL = parseFloat($j('#LISTENING_PL_ID').html());
  writingPL = parseFloat($j('#wrselect').val());
  if ((rangeid === '6' && ((listeningRaw + speakingRaw <= 26) || readingRaw <= 13 || writingPL <= 16)) || ((rangeid !== '1' && rangeid !== '6') && (acplvalue < 5 || speakingPL < 5 || listeningPL < 5 || readingPL < 5 || writingPL < 5)) || (rangeid === '1' && speakingPL <= 26)) {
    lepval = 'Current';
  } else if ((rangeid === '1' && (listeningRaw + speakingRaw >= 27)) || (rangeid === '6' && ((listeningRaw + speakingRaw >= 27) && readingRaw >= 14 && writingPL >= 17))) {
    lepval = 'Never';
  } else if (acplvalue >= '5' && listeningPL >= 5 && readingPL >= 5 && writingPL >= 5 && speakingPL >= 5) {
    lepval = 'Never';
  }
  $j('#LEP_STATUS_ID').html(lepval);
  calcTier();
}

function calcACPL() {
  if (stugradelevel === '0' || stugradelevel === '2' || stugradelevel === '5' || stugradelevel === '8' || stugradelevel === '12') {
    acplvalue = (cplval);
  } else if (stugradelevel === '1') {
    acplvalue = ((cplval * 1.13) + 0.07);
  } else if (stugradelevel === '3') {
    acplvalue = ((cplval * 1.22) + 0.08);
  } else if (stugradelevel === '4') {
    acplvalue = ((cplval * 1.1) + 0.06);
  } else if (stugradelevel === '6') {
    acplvalue = ((cplval * 1.17) + 0.05);
  } else if (stugradelevel === '7') {
    acplvalue = ((cplval * 1.07) + 0.09);
  } else if (stugradelevel === '9') {
    acplvalue = ((cplval * 1.11) + 0.23);
  } else if (stugradelevel === '10') {
    acplvalue = ((cplval * 1.06) + 0.16);
  } else if (stugradelevel === '11') {
    acplvalue = ((cplval * 1.02) + 0.12);
  } else {
    acplvalue = null;
  }
  if (acplvalue) {
    acplvalue = parseFloat(acplvalue).toFixed(2);
    $j('#ADJUSTED_CPL').html(acplvalue);
    calcLEP(acplvalue);
  }
}

function calcCPL() {
  $j.getJSON('json/calccpl.json.html?rangeid=' + rangeid, function(result) {
    $j.each(result, function(key, value) {
      if (value.weight) {
        cplval = cplval + (parseFloat($j('#' + value.testscore).html()) * value.weight);
      }
    });
    cplval = parseFloat(cplval).toFixed(2);
    $j('#CPL').html(cplval);
    calcACPL();
  });
}

function checkCPLCalc() {
  if (rangeid === '1') {
    if (speakingRaw && listeningRaw) {
      calcLEP();
    }
  } else if (rangeid === '6') {
    if (speakingRaw && listeningRaw && readingRaw && writingPL) {
      calcLEP();
    }
  } else if (speakingRaw && listeningRaw && readingRaw && writingPL) {
    calcCPL();
  } else {
    $j('#CPL').html('');
  }
}

function getPL(rawscore, testid, div) {
  $j.getJSON('json/profleveldisplay.json.html?rangeid=' + rangeid + '&rawscore=' + rawscore + '&testid=' + testid, function(result) {
    $j('#' + div).html(result.proflevel);
    checkCPLCalc();
  });
}

function speakingProficiencyK1() {
  speakingPL = (parseFloat(speakingRaw) + parseFloat(listeningRaw));
  $j('#SPEAKING_PL_ID').html(speakingPL);
  checkCPLCalc();
}

function readingProficiency() {
  readingRaw = parseFloat($j('#READING_RAW').val());
  getPL(readingRaw, 4, 'READING_PL_ID', readingPL);
}

function listeningProficiency() {
  listeningRaw = parseFloat($j('#LISTENING_RAW').val());
  if (rangeid !== '1') {
    getPL(listeningRaw, 3, 'LISTENING_PL_ID', listeningPL);
  } else {
    speakingProficiencyK1();
  }
}

function writingProficiency() {
  writingPL = parseFloat($j('#wrselect').val());
  $j('#WRITING_PL_ID').html(writingPL);
  checkCPLCalc();
}

function speakingProficiency() {
  speakingRaw = parseFloat($j('#SPEAKING_RAW').val());
  if (rangeid !== '1') {
    getPL(speakingRaw, 1, 'SPEAKING_PL_ID', speakingPL);
  } else {
    speakingProficiencyK1();
  }
}

function populateWritingPL() {
  var i;
  $j.getJSON('json/writingpl.json.html?rangeid=' + rangeid, function(result) {
    for (i = 1; i <= result.maxpl; i++) {
      $j('#wrselect').append('<option value=\"' + i + '\">' + i + '</option>');
    }
  });
}

function populateSelect(target, maxval) {
  var i;
  for (i = 1; i <= maxval; i++) {
    $j(target).append('<option value="' + i + '">' + i + '</option>');
  }
}

function populateSelects() {
  $j.getJSON('json/scoreselects.json.html?rangeid=' + rangeid, function(result) {
    $j.each(result, function(key, value) {
      if (value.maxval) {
        populateSelect('#' + value.select, value.maxval);
      }
    });
  });
}

function hideWrite() {
  if ($j('#GRADE_RANGE').val() === "1") {
    $j("#write").remove();
  }
  populateSelects();
}

function hideRead() {
  if ($j('#GRADE_RANGE').val() === "1") {
    $j("#read").remove();
  }
  hideWrite();
}

function replaceWrite() {
  if (rangeid === "6") {
    $j("#write_raw").html('<select name=\"[students.s_nc_wapt_sheet]writing_raw\" onChange="writingProficiency();\" id=\"wrselect\" class=\"rawSelect\" id=\"wrselect\">' +
      '<option value=\"\"></option>' +
      '</select>;');
    $j('#writingplopt').html('<div class=\"proflevel\" id="writingpl" name=\"[students.s_nc_wapt_sheet]writing_raw\" />&nbsp;</div>');
  } else if (rangeid !== "6") {
    $j("#write_raw").html('N/A');
  }
  populateWritingPL();
  hideRead();
}

function load_tbl_cpl() {
  $j("#tbl_cpl").html(tbl_cpl);
  replaceWrite();
}

function populateTestAdminIn() {
  resetVars();
  rangeid = $j('#GRADE_RANGE').val();
  $j('#GRADE_SEMESTER').html('<option value=\"\">-- select one --</option>');
  var val = $j('#GRADE_RANGE').val();
  $j.getJSON('json/testadminin.json.html?rangeid=' + val, function(result) {
    $j.each(result, function(key, value) {
      if (value.description) {
        $j('#GRADE_SEMESTER').append('<option value=\"' + value.code + '\">' + value.description + '</option>');
      }
    });
  });
  load_tbl_cpl();
}

function populateGradeSpan() {
  $j.getJSON('json/gradespan.json.html', function(result) {
    $j.each(result, function(key, value) {
      if (value.description) {
        $j('#GRADE_RANGE').append('<option value=\"' + value.rangeid + '\">' + value.description + '</option>');
      }
    });
  });
}

function populateYearSelects() {
  $j.getJSON('json/years.json.html', function(result) {
    $j.each(result, function(key, value) {
      if (value.year) {
        $j('.yearSelect').each(function() {
          $j(this).append('<option value=\"' + value.year + '\">' + value.year + '</option>');
        });
      }
    });
  });
}

function populateRace() {
  $j.getJSON('json/studentrace.json.html?dcid=' + stuDcid, function(data) {
    $j('#race').val(data.race);
  });
}

function populateSchool() {
  $j.getJSON('json/school.json.html?dcid=' + stuDcid, function(data) {
    $j('#school').val(data.school);
  });
}

$j(function() {
  populateSchool();
  populateRace();
  populateGradeSpan();
  populateYearSelects();
});
