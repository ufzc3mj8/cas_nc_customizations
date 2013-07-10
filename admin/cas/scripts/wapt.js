//        var $ = jQuery.noConflict();

//  Options for Test Administered In
        $j(document).ready(function() {

            $j("#range").change(function() {
                var val = $j(this).val();
                if (val == "K1") {
                    $j("#semester").html("<option value='K1'>1st Semester K</option><option value='K2'>2nd Semester K</option>");
                    
                } else if (val == "K2") {
                    $j("#semester").html("<option value='K1'>1st Semester K</option><option value='K2'>2nd Semester K</option>");

                } else if (val == "1-2") {
                    $j("#semester").html("<option value='011'>1st Semester 1</option><option value='012'>2nd Semester 1</option><option value='021'>1st Semester 2</option><option value='022'>2nd Semester 2</option><option value='031'>1st Semester 3</option><option value='032'>2nd Semester 3</option>");

                } else if (val == "3-5") {
                    $j("#semester").html("<option value='031'>1st Semester 3</option><option value='032'>2nd Semester 3</option><option value='041'>1st Semester 4</option><option value='042'>2nd Semester 4</option><option value='051'>1st Semester 5</option><option value='052'>2nd Semester 5</option>");

                } else if (val == "6-8") {
                    $j("#semester").html("<option value='061'>1st Semester 6</option><option value='062'>2nd Semester 6</option><option value='071'>1st Semester 7</option><option value='072'>2nd Semester 7</option><option value='081'>1st Semester 8</option><option value='082'>2nd Semester 8</option>");

                } else if (val == "9-12") {
                    $j("#semester").html("<option value='091'>1st Semester 9</option><option value='092'>2nd Semester 9</option><option value='101'>1st Semester 10</option><option value='102'>2nd Semester 10</option><option value='111'>1st Semester 11</option><option value='112'>2nd Semester 11</option><option value='121'>1st Semester 12</option><option value='122'>2nd Semester 12</option>");

                }
            });


        });

