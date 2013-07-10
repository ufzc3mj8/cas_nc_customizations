
function populateSearch() {
//  var i = 1;
  $j.getJSON('json/search.json.html', function(result) {
    $j.each(result, function(key, value) {
      if (result[key].studentsdcid) {
        $j('#display').append(
          '<tr id="' + result[key].studentsdcid + '">' +
            '<td>' + result[key].wapt_id + '</td>' +
            '<td>' + result[key].grade_range + '</td>' +
            '<td>' + result[key].test_date + '</td>' +
            '<td>' + result[key].lea_code + '</td>' +
            '<td>' + result[key].school_code + '</td>' +
            '<td>' + result[key].test_administrator + '</td>' +
            '<td>' + result[key].grade_level + '</td>' +
            '<td>' + result[key].first_name + '</td>' +
            '<td>' + result[key].last_name + '</td>' +
            '<td>' + result[key].student_number + '</td>' +
            '<td>' + result[key].dob + '</td>' +
            '<td>' + result[key].enroll_status + '</td>' +
//            '<td id="gradelevel_' + result[key].studentsdcid + '">' + result[key].grade_level + '</td>' +
//            '<td><input type="text" id="TEST_DATE_' + result[key].studentsdcid + '" name="CF-[STUDENTS:~(rn).S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:~[gpv:id;-' + i + ']]TEST_DTE" value="' + result[key].test_date + '" size="10" readonly="true"></td>' +
//            '<td><input type="text" id="TEST_ADMINISTRATOR_' + result[key].studentsdcid + '" name="CF-[STUDENTS:~(rn).S_NC_WAPT_SHEET_ITEMS.S_NC_WAPT_SHEET_ITEMS:~[gpv:id;-' + i + ']]TEST_ADMINISTRATOR" value="' + result[key].test_administrator + '" size="20" readonly="true"></td>' +
            '</tr>'
        );
//        i++;
      }
    });
  });
}

$j(function() {
  populateSearch();
});