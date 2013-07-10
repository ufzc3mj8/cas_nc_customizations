
function getAccommodations() {
        $j.getJSON('json/ec_accommodations.json.html?stuid=' + stuid, function(result){
            $j.each(result, function(key, vlaue){
                if (result[key].test_code) {
                    $j('#accommodations').append(
                        '<tr>' +
                        '<td>' + result[key].test_code + '</td>' +
                        '<td>' + result[key].accommodation_code  + '</td>' +
                        '</tr>'
                    );
                }
            });
        });
}

$j(document).ready(function() {
  getAccommodations();
}); 