function selectStudents(action) {
  loadingDialog();
  var curSelect =
    $j.unique($j("input:hidden").map(function() {
      return "ids="
        + $j(this).val();
    })).get().join('&');
  curSelect = curSelect + '&selectionAction=' + action + '&temp=false';
  $j.ajax({
    type    : "POST",
    url     : "/admin/SaveSelectedStudentsToSelection.action",
    cache   : false,
    data    : curSelect.replace(/ids=&/gi, ''),
    success : function() {
      closeLoading();
      window.location = "/admin/home.html";
    },
    error   : function() {
      closeLoading();
      $j('body').append('<div id="curSelectFail" title="Error"><p>There was an error making the students the current selection.</p></div > ');
      $j("#curSelectFail").dialog();
    } });
}