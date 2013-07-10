"use strict";
$j(document).ajaxStart(function() {
  loadingDialog();
});
$j(document).ajaxStop(function() {
  closeLoading();
});

var $j;

function calcTier(cplval, studentsDcid) {
  var tierval;
  if (cplval >= 1 && cplval < 2.5) {
    tierval = 'A';
  } else if (cplval >= 2.5 && cplval <= 4.0) {
    tierval = 'B';
  } else if (cplval > 4.0) {
    tierval = 'C';
  }
  $j('#TIER_ID_' + studentsDcid).val(tierval);
}

function calcLEP(rangeselect, acplvalue, studentsDcid) {
  var speakingval = $j('#SPEAKING_RAW_' + studentsDcid).val(),
    listeningval = $j('#LISTENING_RAW_' + studentsDcid).val(),
    readingval = $j('#READING_RAW_' + studentsDcid).val(),
    writingval = $j('#WRITING_PL_ID_' + studentsDcid).val(),
    lepval;
  if ((rangeselect === 'K1' && (listeningval + speakingval <= 26)) || (rangeselect === 'K2' && ((listeningval + speakingval <= 26) || readingval <= 13 || writingval <= 16)) || (acplvalue < 5 || speakingval < 5 || listeningval < 5 || readingval < 5 || writingval < 5)) {
    lepval = 'Current';
  } else if ((rangeselect === 'K1' && (listeningval + speakingval >= 27)) || (rangeselect === 'K2' && ((listeningval + speakingval >= 27) && readingval >= 14 && writingval >= 17))) {
    lepval = 'Never';
  } else if (acplvalue < 5 || listeningval < 5 || readingval < 5 || writingval < 5 || speakingval < 5) {
    lepval = 'Current';
  } else if (acplvalue >= 5 && listeningval >= 5 && readingval >= 5 && writingval >= 5 && speakingval >= 5) {
    lepval = 'Never';
  }
  $j('#LEP_STATUS_ID_' + studentsDcid).val(lepval);
}

function calcACPL(cplvalue, stugradelevel, studentsDcid, rangeval) {
  var acplvalue;
  if (stugradelevel === '0' || stugradelevel === '2' || stugradelevel === '5' || stugradelevel === '8' || stugradelevel === '12') {
    acplvalue = (cplvalue);
  } else if (stugradelevel === '1') {
    acplvalue = ((cplvalue * 1.13) + 0.07);
  } else if (stugradelevel === '3') {
    acplvalue = ((cplvalue * 1.22) + 0.08);
  } else if (stugradelevel === '4') {
    acplvalue = ((cplvalue * 1.1) + 0.06);
  } else if (stugradelevel === '6') {
    acplvalue = ((cplvalue * 1.17) + 0.05);
  } else if (stugradelevel === '7') {
    acplvalue = ((cplvalue * 1.07) + 0.09);
  } else if (stugradelevel === '9') {
    acplvalue = ((cplvalue * 1.11) + 0.23);
  } else if (stugradelevel === '10') {
    acplvalue = ((cplvalue * 1.06) + 0.16);
  } else if (stugradelevel === '11') {
    acplvalue = ((cplvalue * 1.02) + 0.12);
  } else {
    acplvalue = null;
  }
  if (acplvalue) {
    acplvalue = parseFloat(acplvalue).toFixed(2);
    $j('#ADJUSTED_CPL_' + studentsDcid).val(acplvalue);
  }
  calcLEP(rangeval, acplvalue, studentsDcid);
}

function calcCPL(rangeval, studentsDcid, gradelevel) {
  var cplval = 0;
  $j.getJSON('json/calccpl.json.html?rangeid=' + rangeval + '&studentDcid=' + studentsDcid, function(result) {
    $j.each(result, function(key, value) {
      if (value.weight) {
        cplval = cplval + ($j('#' + value.testscore).val() * value.weight);
      }
    });
    cplval = cplval.toFixed(2);
    $j('#CPL_' + studentsDcid).val(cplval);
    calcACPL(cplval, gradelevel, studentsDcid, rangeval);
    calcTier(cplval, studentsDcid);
  });
}


function convertGradeSpan(rangeval) {
  if (rangeval === 'K1') {
    return 1;
  } else if (rangeval === 'K2') {
    return 6;
  } else if (rangeval === '1-2') {
    return 2;
  } else if (rangeval === '3-5') {
    return 3;
  } else if (rangeval === '6-8') {
    return 4;
  } else if (rangeval === '9-12') {
    return 5;
  }
}

function getPL(rawscore, rangeval, testid, div) {
  $j.getJSON('json/profleveldisplay.json.html?rangeid=' + rangeval + '&rawscore=' + rawscore + '&testid=' + testid, function(result) {
    if (result.proflevel !== 'Unknown') {
      $j('#' + div).val(result.proflevel);
    }
  });
}

function writingProficiency(studentDcid, rangeid) {
  var writingpl = $j('#WRITING_PL_' + studentDcid).val(),
    rawscore = $j('#WRITING_RAW_' + studentDcid).val();
  if (rangeid !== 1 && rangeid !== 6) {
    $j('#WRITING_PL_ID_' + studentDcid).val(writingpl);
  } else if (rangeid === 6) {
    $j.getJSON('json/profleveldisplay.json.html?rangeid=' + rangeid + '&rawscore=' + rawscore + '&testid=2', function(result) {
      if (result.proflevel !== 'Unknown') {
        $j('#WRITING_PL_' + studentDcid).val(result.proflevel);
        var description = $j('#WRITING_PL_' + studentDcid).val();
        $j.getJSON('json/proflevelbulk.json.html?testid=2&rangeid=' + rangeid + '&description=' + description, function(data) {
          $j('#WRITING_PL_ID_' + studentDcid).val(data.proflevel);
        });
      }
    });
  }
}

function readingProficiency(studentDcid, rangeid) {
  var readingpl;
  var rawscore = $j('#READING_RAW_' + studentDcid).val();
  if (rangeid !== 1) {
    $j.getJSON('json/profleveldisplay.json.html?rangeid=' + rangeid + '&rawscore=' + rawscore + '&testid=4', function(result) {
      if (result.proflevel !== 'Unknown') {
        readingpl = (result.proflevel);
        $j('#READING_PL_' + studentDcid).val(readingpl);
        if (rangeid !== 6) {
          getPL(rawscore, rangeid, 4, 'READING_PL_ID_' + studentDcid);
        } else {
          var description = $j('#READING_PL_' + studentDcid).val();
          $j.getJSON('json/proflevelbulk.json.html?testid=4&rangeid=' + rangeid + '&description=' + description, function(data) {
            $j('#READING_PL_ID_' + studentDcid).val(data.proflevel);
          });
        }
      }
    });
  }
}

function listeningProficiency(studentDcid, rangeid) {
  getPL($j('#LISTENING_RAW_' + studentDcid).val(), rangeid, 3, 'LISTENING_PL_ID_' + studentDcid);
}

function speakingProficiency(studentDcid, rangeid) {
  var speakingRaw = $j('#SPEAKING_RAW_' + studentDcid).val(),
    listeningRaw = $j('#LISTENING_RAW_' + studentDcid).val();
  if (rangeid === 1) {
    if (speakingRaw !== '' && listeningRaw !== '') {
      var speakingPL = (parseFloat(speakingRaw) + parseFloat(listeningRaw));
      $j('#SPEAKING_PL_ID_' + studentDcid).val(speakingPL);
    }
  } else {
    getPL(speakingRaw, rangeid, 1, 'SPEAKING_PL_ID_' + studentDcid);
  }
}

function proficiencyBulk() {
  $j('tbody tr').each(function() {
    var studentDcid = $j(this).attr('id');
    var rangeid = convertGradeSpan($j('#GRADE_RANGE_' + studentDcid).val());
    var gradelevel = $j('#gradelevel_' + studentDcid).html();
    listeningProficiency(studentDcid, rangeid);
    speakingProficiency(studentDcid, rangeid);
    readingProficiency(studentDcid, rangeid);
    writingProficiency(studentDcid, rangeid);
    if (rangeid !== 1 && rangeid !== '6') {
      calcCPL(rangeid, studentDcid, gradelevel);
    } else {
      calcLEP(rangeid, null, studentDcid);
    }
  });
}

function getScores() {
  var i = 1;
  $j.getJSON('json/process.json.html', function(result) {
    $j.each(result, function(key, value) {
      if (result[key].studentsdcid) {
        $j('#display').append(
          '<tr id="' + result[key].studentsdcid + '"><td>' + result[key].lastfirst + '</td>' +
            '<td>' + result[key].student_number + '</td>' +
            '<td id="gradelevel_' + result[key].studentsdcid + '">' + result[key].grade_level + '</td>' +
            '<td><input type="text" id="TEST_DATE_' + result[key].studentsdcid + '" name="CF-[STUDENTS:~(rn).S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:~[gpv:id;-' + i + ']]TEST_DTE" value="' + result[key].test_date + '" size="10" readonly="true"></td>' +
            '<td><input type="text" id="TEST_ADMINISTRATOR_' + result[key].studentsdcid + '" name="CF-[STUDENTS:~(rn).S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:~[gpv:id;-' + i + ']]TEST_ADMINISTRATOR" value="' + result[key].test_administrator + '" size="20" readonly="true"></td>' +
            '<td><input type="text" id="CLASSIFICATION_' + result[key].studentsdcid + '" name="CF-[STUDENTS:' + result[key].studentsdcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-' + i + ']CLASS_ID" value="' + result[key].class + '" size="10" readonly="true"></td>' +
            '<td>' +
            '<input type="text" id="GRADE_RANGE_' + result[key].studentsdcid + '" value="' + result[key].grade_range + '" size="10" readonly="true">' +
            '<input type="hidden" id="GRADE_RANGE_ID_' + result[key].studentsdcid + '" name="CF-[STUDENTS:' + result[key].studentsdcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-' + i + ']GRADE_RANGE_ID"/>' +
            '</td>' +
            '<td><input type="text" id="GRADE_SEMESTER_' + result[key].studentsdcid + '" name="CF-[STUDENTS:' + result[key].studentsdcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-' + i + ']GRADE_SEMESTER_ID" value="' + result[key].grade_semester + '" size="10" readonly="true"></td>' +
            '<td><input type="text" id="SPEAKING_RAW_' + result[key].studentsdcid + '" name="CF-[STUDENTS:' + result[key].studentsdcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-' + i + ']SPEAKING_RAW" value="' + result[key].speaking_raw + '" size="10" onLoad="speakingProficiency();" readonly="true"></td>' +
            '<td><input type="text" id="SPEAKING_PL_ID_' + result[key].studentsdcid + '" name="CF-[STUDENTS:' + result[key].studentsdcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-' + i + ']SPEAKING_PL_ID" value="" size="10" readonly="true"></td>' +
            '<td><input type="text" id="WRITING_RAW_' + result[key].studentsdcid + '" name="CF-[STUDENTS:' + result[key].studentsdcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-' + i + ']WRITING_RAW" value="' + result[key].writing_raw + '" size="10" readonly="true"></td>' +
            '<td>' +
            '<input type="text" id="WRITING_PL_' + result[key].studentsdcid + '" value="' + result[key].writing_pl + '" size="25" readonly="true">' +
            '<input type="hidden" id="WRITING_PL_ID_' + result[key].studentsdcid + '" name="CF-[STUDENTS:' + result[key].studentsdcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-' + i + ']WRITING_PL_ID" />' +
            '</td>' +
            '<td><input type="text" id="LISTENING_RAW_' + result[key].studentsdcid + '" name="CF-[STUDENTS:' + result[key].studentsdcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-' + i + ']LISTENING_RAW" value="' + result[key].listening_raw + '" size="10" onLoad="listeningProficiency();" readonly="true"></td>' +
            '<td><input type="text" id="LISTENING_PL_ID_' + result[key].studentsdcid + '" name="CF-[STUDENTS:' + result[key].studentsdcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-' + i + ']LISTENING_PL_ID" value="" size="10" readonly="true"></td>' +
            '<td><input type="text" id="READING_RAW_' + result[key].studentsdcid + '" name="CF-[STUDENTS:' + result[key].studentsdcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-' + i + ']READING_RAW" value="' + result[key].reading_raw + '" size="10" onLoad="readingProficiency();" readonly="true"></td>' +
            '<td>' +
            '<input type="text" id="READING_PL_' + result[key].studentsdcid + '" value="" size="25" readonly="true">' +
            '<input type="hidden" id="READING_PL_ID_' + result[key].studentsdcid + '" name = "CF-[STUDENTS:' + result[key].studentsdcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-' + i + ']READING_PL_ID" />' +
            '</td>' +
            '<td><input type="text" id="CPL_' + result[key].studentsdcid + '" name="CF-[STUDENTS:' + result[key].studentsdcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-' + i + ']CPL" value="" size="10" readonly="true"></td>' +
            '<td><input type="text" id="ADJUSTED_CPL_' + result[key].studentsdcid + '" name="CF-[STUDENTS:' + result[key].studentsdcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-' + i + ']ADJUSTED_CPL" value="" size="10" readonly="true"></td>' +
            '<td><input type="text" id="LEP_STATUS_ID_' + result[key].studentsdcid + '" name="CF-[STUDENTS:' + result[key].studentsdcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-' + i + ']LEP_STATUS_ID" value="" size="10" readonly="true"></td>' +
            '<td><input type="text" id="TIER_ID_' + result[key].studentsdcid + '" name="CF-[STUDENTS:' + result[key].studentsdcid + '.S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:-' + i + ']TIER_ID" value="" size="10" readonly="true"></td></tr>'
        );
        i++;
      }
    });
    proficiencyBulk();
  });
}

$j(document).ready(function() {
  getScores();
}); 