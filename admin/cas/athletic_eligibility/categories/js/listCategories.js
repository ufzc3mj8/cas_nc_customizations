"use strict";

$j(function() {
  $j.getJSON("/admin/cas/athletic_eligibility/json/categories.json.html", function(data) {
    $j.each(data.categories, function(id, name) {
      if (this.id) $j("#categorytypes").append("<tr><td><a href=\"edit.html?id=" + this.id + "\">" + this.name + "</a></td></tr>");
    });
  });
});

