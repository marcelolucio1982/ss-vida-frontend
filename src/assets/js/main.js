$(document).ready(function(){
    $('.button-collapse').sideNav({
        menuWidth: 330, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
      });

    /* Iniciando os selects */
    $('select').material_select();
    
    /* Iniciando o DatePikcer */
    $(".datepicker").pickadate({
        monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        weekdaysLetter: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        format: 'dd/mm/yyyy',
        today: 'Hoje',
        clear: 'Limpar',
        close: 'Pronto',
        labelMonthNext: 'Próximo mês',
        labelMonthPrev: 'Mês anterior',
        labelMonthSelect: 'Selecione um mês',
        labelYearSelect: 'Selecione um ano',
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        closeOnSelect: false // Close upon selecting a date,
      });

    /* ################# Option Box Config ################# */
    $(document).mouseup(function (e) {
      var $div = $(".option-box"),
          $btn = $(".option-button");
  
      // se o alvo do clique não é a DIV ou um filho da DIV
      if (!$div.is(e.target) && $div.has(e.target).length === 0) {
  
          // se o alvo não é o botão que abre/fecha a DIV
          if (!$btn.is(e.target) && $btn.has(e.target).length === 0) {
  
              // se a DIV está aberta
              if ($div.is(':visible')) {
                  $div.slideToggle("fast");
              }
          }
      }
    });
    
    $('.option-button').on("click", function() {
        $('.option-box').slideToggle();
    });

    /* Ativando as tooltips */
    $('.tooltipped').tooltip({delay: 50});
});
