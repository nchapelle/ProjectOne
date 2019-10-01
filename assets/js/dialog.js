var userName;
$(function() {
  var dialog,
    form,
    name = $("#name"),
    password = $("#password"),
    allFields = $([])
      .add(name)
      .add(password),
    tips = $(".validateTips");

  function updateTips(t) {
    tips.text(t).addClass("ui-state-highlight");
    setTimeout(function() {
      tips.removeClass("ui-state-highlight", 1500);
    }, 500);
  }

  function checkLength(o, n, min, max) {
    if (o.val().length > max || o.val().length < min) {
      o.addClass("ui-state-error");
      updateTips(
        "Length of " + n + " must be between " + min + " and " + max + "."
      );
      return false;
    } else {
      return true;
    }
  }

  function checkRegexp(o, regexp, n) {
    if (!regexp.test(o.val())) {
      o.addClass("ui-state-error");
      updateTips(n);
      return false;
    } else {
      return true;
    }
  }

  function addUser() {
    var valid = true;
    allFields.removeClass("ui-state-error");

    valid = valid && checkLength(name, "username", 3, 16);
    valid = valid && checkLength(password, "password", 5, 16);

    valid =
      valid &&
      checkRegexp(
        name,
        /^[a-z]([0-9a-z_\s])+$/i,
        "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter."
      );
    valid =
      valid &&
      checkRegexp(
        password,
        /^([0-9a-zA-Z])+$/,
        "Password field only allow : a-z 0-9"
      );

    if (valid) {
      userName = name.val();
      var accountRef = database.ref("/accts");
      accountRef.push({ un: userName, pw: password.val() });
      dialog.dialog("close");
      return valid;
    }
  }

  dialog = $("#dialog-form").dialog({
    autoOpen: true,
    height: 400,
    width: 350,
    modal: true,
    buttons: {
      "Create account": addUser,
      Cancel: function() {
        dialog.dialog("close");
      }
    },
    close: function() {
      form[0].reset();
      allFields.removeClass("ui-state-error");
    }
  });

  form = dialog.find("form").on("submit", function(event) {
    event.preventDefault();
    addUser();
    dialog.dialog("close");
  });

  $("#create-user")
    .button()
    .on("click", function() {
      dialog.dialog("open");
    });
});
