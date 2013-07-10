(function(PearsonCAS, $j, undefined) {
  //Private Properties
  //var amountOfGrease = '1 Cup';

  //Public Properties
  PearsonCAS.extSchema = PearsonCAS.extSchema || {};

  //Public Methods
  PearsonCAS.extSchema.loadCheckbox = function() {
    checkboxValues();
    checkboxInputs();
  };

  //Private Methods
  function checkboxValues() {
    $j(":checkbox").on('change', function() {
      if (this.checked) {
        $j('#' + $j(this).attr('id') + '_cb').val(1);
      } else {
        $j('#' + $j(this).attr('id') + '_cb').val(0);
      }
    });
  }

  function checkboxInputs() {
    $j(':checkbox').each(function() {
      $j(this).before('<input type="hidden" name="' + this.name + '" id="' + this.id + '_cb"/>').removeAttr('name');
    });
  }



}(window.PearsonCAS = window.PearsonCAS || {}, jQuery));