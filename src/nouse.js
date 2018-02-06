//Login开始
$(".btn-login").click(function() {
  if ($("#username").val() == null || $("#username").val() == "") {
    alert("Username can't be empty.");
    return;
  }
  if ($("#password").val() == null || $("#password").val() == "") {
    alert("Password can't be empty.");
    return;
  }
  if ($("#username").val() == "123456789" && $("#password").val() == "123456") {
    window.location.href = "index.html";
  } else {
    alert("Incorrect username or password! Please try again.");
  }
});
//Login结束
//Sign up开始
$("#sign-up-agree").change(function() {
  if ($("#sign-up-agree").prop('checked')) {
    $(".btn-sign-up").removeAttr("disabled");
  } else {
    $(".btn-sign-up").attr('disabled', "true");
  }
});
$(".btn-sign-up").click(function() {
  if ($("#sign-up-name").val() == null || $("#sign-up-name").val() == "") {
    alert("Username can't be empty.");
    return;
  }
  if ($("#sign-up-password").val() == null || $("#sign-up-password").val() == "") {
    alert("Password can't be empty.");
    return;
  }
  if ($("#sign-up-repassword").val() == null || $("#sign-up-repassword").val() == "") {
    alert("Repeat Password can't be empty.");
    return;
  }
  if ($("#sign-up-password").val() !== $("#sign-up-repassword").val()) {
    alert("The two passwords you typed do not match.");
    return;
  }
  $.ajax({
    type: "POST",
    url: "http://106.15.91.150:20552",
    data: JSON.stringify(GetJsonData()),
    dataType: "json",
    success: function(message) {
      if (message > 0) {
        alert("success");
      }
    },
    error: function(message) {
      alert("error");
    }
  });

  function GetJsonData() {
    var json = {
      "jsonrpc": "2.0",
      "method": "registeaddress",
      "name": $("#sign-up-name").val(),
      "password": $("#sign-up-password").val(),
      "params": ["AY8r7uG6rH7MRLhABALZvf8jM4bCSfn3YJ"],
      "id": 1
    };
    return json;
  }
});
//Sign up结束