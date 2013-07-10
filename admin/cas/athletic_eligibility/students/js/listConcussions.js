"use strict";
$j(function() {
  $j.getJSON("json/concussions.json.html?frn=" + pageData.studentfrn, function(data) {
    $j.each(data.concussions, function(id, name, notes) {
      if (this.id) $j("#concussions").append("<tr><td><a href=\"edit_concussions.html?id=" + this.id + "&frn=" + pageData.studentfrn + "\">" + this.date + "</a></td><td>" + this.notes + "</td></tr>");
    });
  });
});

