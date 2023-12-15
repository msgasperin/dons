const fnLogin = async () => {
  let user   = document.getElementById('logUser').value;
  let pass   = document.getElementById('logPsw').value;
  let idSuc  = document.getElementById('logSucursal').value;
  let combo  = document.getElementById("logSucursal");
  let nomSuc = combo.options[combo.selectedIndex].text;

  var formData = new FormData();
  formData.append("user", user);
  formData.append("pass", pass);
  formData.append("idSuc", idSuc);
  formData.append("nomSuc", nomSuc);
  formData.append("func", 'fnRequestLogin');

  if(user == '') {
    toastr.options.timeOut = 2500;
    toastr.warning('¡Debes ingresar un nombre de usuario!');
    $('#logUser').focus();
    return;
  } else if(pass == '') {
    toastr.options.timeOut = 2500;
    toastr.warning('¡Debes ingresar una contraseña!');
    $('#logPsw').focus();
    return;
  } else if(idSuc == 0) {
    toastr.options.timeOut = 2500;
    toastr.warning('¡Debes seleccionar una sucursal!');
    $('#logSucursal').focus();
    return;
  }
  
  fetch("controller/fnLogin.php", {
    method: "POST",
    body: formData
  })
  .then((response) => response.json())
  .catch((error) => console.error("Error:", error))
  .then((response) => {
    if(response == 200) {
      toastr.options.timeOut = 2500;
      toastr.success('¡Bienvenido al equipo LIB!');
      redireccionar('views/admin.php');
    }
    else if(response == 202) {
      toastr.options.timeOut = 3500;
      toastr.warning('El usuario o contraseña son incorrectos o no perteneces a esa sucursal');
      return;
    } else if(response == 500) {
      toastr.options.timeOut = 2500;
      toastr.error('Hubo un problema, vuelve a intentarlo');
      return;
    }
    
  });  
}

const fnSucursalesLite = (combo) => {
  var formData = new FormData();
  formData.append("func", 'fnSucursalesLite');

  fetch("controller/fnLogin.php", {
    method: "POST",
    body: formData
  })
  .then((response) => response.json())
  .catch((error) => {
    console.log(error);
    toastr.options.timeOut = 2500;
    toastr.warning('Se presentó un problema para cargar las sucursales');
    return;
  })
  .then((response) => {
    var html = '<option value="0">Sucursal</option>';
    if(response.data.length > 0) {
      response.data.forEach(suc => {
        html += `<option value="${suc.Id}" class="text_14">${suc.Nombre}</option>`;
      });
    }
    $(`#${combo}`).html(html);
  });  
}

const redireccionar = (dir) => {
 	setTimeout("location.href='"+dir+"'",1000);
 }