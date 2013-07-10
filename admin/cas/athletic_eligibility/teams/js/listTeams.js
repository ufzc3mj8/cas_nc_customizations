"use strict";

var $j = jQuery.noConflict();

$j(function() {
  $j.getJSON("/admin/cas/athletic_eligibility/teams/json/teamlist.json.html", function(data) {
    $j.each(data.teams, function() {
      if (this.id) {
        $j("#teamlist").append('<tr>' +
          '<td><a href=\"editteam.html?id=' + this.id + '\">' + this.name + '</a></td>' +
          '<td>' + this.code + '</td>' +
          '<td>' + this.shortname + '</td>' +
          '<td>' + this.category + '</td>' +
          '<td><a href=\"manage.html?id=' + this.id + '&name=' + this.name + '\">' + this.membercount + '<a></a></td>' +
          '</tr>');
      }
    });
  });
});

