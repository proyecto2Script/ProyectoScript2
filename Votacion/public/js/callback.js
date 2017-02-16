function cancel(){
	$('input[type=text], input[type=password]').val('');
}

function verificarUser(){
	var url = '/verificar_user/' + $('#reg input[name=usuario]').val();
	var datos = {
		data: null,
		type: 'GET',
		datatype: 'json'
	};

	$.ajax(url, datos)
	.done(function(data, status, xhr){
		//Mostrar la respuesta utilizando DOM y CSS
		data = JSON.parse(data);
		console.log(data);
		var color = data.found;
		$('#reg input[name=usuario]').css('border-color',color);
		// if( data.found == '0'){
		// 	$('input[name=usuario]').css('border-color','green');
		// }else {
		// 	$('input[name=usuario]').css('border-color','red');
		// }

	})
	.fail(function(xhr, status, error){
		alert('Error en la verificación del USER');
	});
}

$(document).ready(function(){
	$('#reg input[name=usuario]').focusout(verificarUser);
	/*GuardarAnteriores();
	$('#perfil input[type=text], #perfil input[type=password]').focusout(ActualizarDatos);*/
});

function loginAjax(){
	var url = '/login';
	var usuario = $('#login input[name=usuario]').val();
	var clave = $('#login input[name=clave]').val();
	var datos = {
		data: {"usuario":usuario,"clave":clave},
		type: 'POST',
		datatype: 'json'
	};

	$.ajax(url, datos)
	.done(function(data, status, xhr){
		data = JSON.parse(data);
		if(data.found)
		{
			alert("Bienvenido "+data.user.name);
			window.location = "/perfil/" + data.user.usuario;
		}else{
			alert("Usuario y/o clave invalidos");
		}
	})
	.fail(function(xhr, status, error){
		alert('Error en la verificación del USER');
	});

}

function loginVotanteAjax(){
	var url = '/loginVotante';
	var cedula = $('#loginVotante input[name=cedula]').val();
	
	var datos = {
		data: {"cedula":cedula},
		type: 'POST',
		datatype: 'json'
	};

	$.ajax(url, datos)
	.done(function(data, status, xhr){
		data = JSON.parse(data);
		if(data.found)
		{
			alert("Bienvenido "+data.user.name);
			window.location = "/votante/" + data.user.usuario;
		}else{
			alert("Usuario y/o clave invalidos");
		}
	})
	.fail(function(xhr, status, error){
		alert('Error en la verificación del USER');
	});

}


