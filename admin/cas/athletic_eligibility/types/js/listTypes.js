"use strict";
$j(function() {
  $j.getJSON("/admin/cas/athletic_eligibility/json/types.json.html", function(data) {
    $j.each(data.types, function(id, name) {
      if (this.id) $j("#teamtypes").append("<tr><td><a href=\"edit.html?id=" + this.id + "\">" + this.name + "</a></td></tr>");
    });
  });
});
