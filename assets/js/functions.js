const fnMove = (div) => {
  $('html,body').animate(
    {
      scrollTop: $("#" + div).offset().top
    }, 5000);
}

const fnContact = () => {
  $('#contactModal').modal('show');
  $('#nombre').val('');
  $('#telefono').val('');
  $('#correo').val('');
  $('#mensaje').val('');
}

const fnValmail = (correo) => {
  emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  if (emailRegex.test(correo))
    return 1;
  else
    return 0;
}

const fnSendContact = () => {
  $('#btnSendContact').prop('disabled', true);
  var nombre = $.trim($('#nombre').val());
  var telefono = $.trim($('#telefono').val());
  var correo = $.trim($('#correo').val());
  var mensaje = $.trim($('#mensaje').val());

  if (nombre == "") {
    toastr.options.timeOut = 2500;
    toastr.warning('¡Debes ingresar un nombre!');
    $('#nombre').focus();
    $('#btnSendContact').prop('disabled', false);
    return;
  } else if (telefono == '' && correo == '') {
    toastr.options.timeOut = 2500;
    toastr.warning('¡Debes ingresar al menos un medio de contacto (Teléfono o correo) !');
    $('#btnSendContact').prop('disabled', false);
    return;
  }

  if (correo != '') {
    validacion = fnValmail(correo);
    if (validacion == 0) {
      toastr.options.timeOut = 2500;
      toastr.warning('¡Debes ingresar una cuenta de correo válida!');
      $('#correo').focus();
      $('#btnSendContact').prop('disabled', false);
      return;
    }
  }

  if (mensaje == '') {
    toastr.options.timeOut = 2500;
    toastr.warning('¡Debes un mensaje !');
    $('#mensaje').focus();
    $('#btnSendContact').prop('disabled', false);
    return;
  }

  var datos = { accion: 'sendContact', nombre, telefono, correo, mensaje };
  $.ajax({
    url: "sendMail.php",
    type: "POST",
    data: datos
  }).done(function (res) {
    if (res.estatus == 'ok') {
      toastr.options.timeOut = 2500;
      toastr.success('¡Gracias por contactarnos, pronto nos comunicaremos contigo!');
      $('#contactModal').modal('hide');
      $('#btnSendContact').prop('disabled', false);
    } else {
      toastr.options.timeOut = 2500;
      toastr.info('¡Tuvimos un problema, por favor inténtalo de nuevo!');
      $('#btn_env_cot').prop('disabled', false);
    }
  }).fail(function (error) {
    $('#btnSendContact').prop('disabled', false);
    toastr.options.timeOut = 2500;
    toastr.error('¡Tuvimos un problema, por favor inténtalo de nuevo!');
    return;
  });
}