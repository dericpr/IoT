$(function() {

  // Initialize variables
  var $window = $(window);

  // Prompt for setting a username

  var socket = io();

  function drawRow(rowData) {
    var row = $("<tr />")
    $("#acmeDataList").append(row);
    row.append($("<td>" + rowData._id + "</td>"));
    row.append($("<td>" + rowData.name + "</td>"));
    row.append($("<td>" + rowData.dev_location + "</td>"));
    $("#acmeDataList").fadeIn();
  }

  function drawTable(data) {
    $('#acmeDataList').fadeOut();
    $('#acmeDataList').find('tbody').empty();
    for ( var i = 0; i < data.length; i++ ) {
      drawRow(data[i]);
    }
  }
  
  // Socket events

  // Whenever the server emits 'login', log the login message
  socket.on('new_device_data', (data) => {
    // Display the welcome message
    drawTable(JSON.parse(data));
  });

});
