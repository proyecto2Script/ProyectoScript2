

(function($) {

	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1280px)',
		narrow: '(max-width: 980px)',
		narrower: '(max-width: 840px)',
		mobile: '(max-width: 736px)',
		mobilep: '(max-width: 480px)'
	});
    
    var votototal = [];
    var votoActual = [];

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on narrower.
			skel.on('+narrower -narrower', function() {
				$.prioritize(
					'.important\\28 narrower\\29',
					skel.breakpoint('narrower').active
				);
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				alignment: 'right'
			});

		// Off-Canvas Navigation.

			// Navigation Button.
				$(
					'<div id="navButton">' +
						'<a href="#navPanel" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});
                
			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navButton, #navPanel, #page-wrapper')
						.css('transition', 'none');

		// Header.
		// If the header is using "alt" styling and #banner is present, use scrollwatch
		// to revert it back to normal styling once the user scrolls past the banner.
		// Note: This is disabled on mobile devices.
			if (!skel.vars.mobile
			&&	$header.hasClass('alt')
			&&	$banner.length > 0) {

				$window.on('load', function() {

					$banner.scrollwatch({
						delay:		0,
						range:		0.5,
						anchor:		'top',
						on:			function() { $header.addClass('alt reveal'); },
						off:		function() { $header.removeClass('alt'); }
					});

				});

			}

	});

})(jQuery);



$(document).ready(function() {
    
  $('#btnini').click(function() {
    $.fn.login();
  });
  $.fn.login = function() {
      window.location.href="loginAdmin.html";
  }
  
  $('#btnout').click(function() {
    $.fn.out();
  });
  $.fn.out = function() {
      window.location.href="../index.html";
  }
  
  $('#btnvot').click(function() {
    $.fn.vot();
  });
  $.fn.vot = function() {
      window.location.href="loginVotante.html";
  }
  
  $('#submitLog').click(function() {
    $.fn.submitLogin();
  });
  $.fn.submitLogin = function() {
      var user = $("#user").val();
      var pass = $("#pass").val();
      var bande = false;
      var obJ = JSON.parse(strDatos);
      for (var a of obJ.administrador){
          if (user == a.user && pass == a.pass){
              console.log(a.user)
              window.location.href="../pages/admin.html";
              alert("Bienvenido " + a.name);
              bande = true;
              admin = new Admin (a)
              console.log(admin)
              
              break;
          }else{
              for (var b of obJ.votante){
              if (user == b.user && pass == b.pass){
                  alert("Bienvenido " + b.name);
                  bande = true;
                  votante = new Votante(b)
                  break;
                } 
            }
        }    
        break;    
    }
        
        if (bande == false) {
            alert("¡Contraseña o usuario incorrectos!");
             
        }  
  }
  
  $('#submitVot').click(function() {
    $.fn.submitCedu();
  });
  $.fn.submitCedu = function() {
      var ced = $("#cedula").val();
      var bander = false;
      var obJ = JSON.parse(strDatos);
      for (var a of obJ.votante){
          if (ced == a.cedula){
              console.log(a.cedula)
              alert("Bienvenido " + a.name);
              
              bander = true;
              votante = new Votante(a)
              window.location.href="votante.html";
              break;
          }
      }if (bander == false) {
            alert("¡Contraseña o usuario incorrectos!");  
  }
  }
  
  $('#submitNuevo').click(function(){
   $.fn.submitNuevo ();   
  });
  $.fn.submitNuevo = function(){
      
      var Dignidad = $( "#seleDigni option:selected" ).text();
      var Logo = $( "#seleLogo option:selected" ).text();
      var Nombre = $("#candidato").val();
      var Lista = $("#lista").val();
      var Partido =$("#partido").val();
      var Foto =$("#foto").val();
      
  var str = ", { \"Lista\" : \""+Lista+"\", \"Logo\" : \""+Logo+"\", \"Partido\" : \""+Partido+"\", \"Nombre\" : \""+Nombre+"\", \"Foto\" : \""+Foto+"\", \"Voto\" : \"0\", \"Dignidad\" : \""+Dignidad+"\"}]}";
      console.log(str);
      strDatos = strDatosslice(0,-2);
      console.log(strDatos);
      strDatos = strDatos + str;
      console.log(strDatos);
  }
  
  $('#cargarLi').click(function() {
    $.fn.cargarLi();
  });
  $.fn.cargarLi = function() {
    var obJ = JSON.parse(strDatos);
      $( "#tb" ).remove();
     $("#tabla").append("<tbody id=\"tb\">");
      var dign = $( "#seleD option:selected" ).text();
      for (var a of obJ.candidatos){
          if(a.Dignidad == dign ){
              $("#tb").append("<tr id=\"tr\"><td>"+a.Dignidad+"</td><td><img style=\"height: 20px  width: 20px\" src=\".."+a.Logo+"\"</td><td>"+a.Nombre+"</td><td>"+a.Lista+"</td><td>"+a.Partido+"</td><td>"+a.Partido+"</td></tr>");
          }
        
      }
       $("#tabla").append("</tbody>")   
  }
  
  $('#cLiMo').click(function() {
    $.fn.cLiM();
  });
    
  $.fn.cLiM = function() {
    var obJ = JSON.parse(strDatos);
     $( "#tb" ).remove();
     $("#tablaMo").append("<tbody id=\"tb\">");
      var dignDM = $( "#seleDM option:selected" ).text();
      for (var a of obJ.candidatos){
          if(a.Dignidad == dignDM ){
              $("#tb").append("<tr id=\"tr\"><td>"+a.Dignidad+"</td><td><img style=\"height: 20px  width: 20px\" src=\".."+a.Logo+"\"</td><td>"+a.Nombre+"</td><td>"+a.Lista+"</td><td>"+a.Partido+"</td><td><ul class=\"actions\"><li><a id=\"voto"+i+"\" class=\"button special\" > Voto  </a></li></ul></td></tr>");
          }
      }
       $("#tablaMo").append("</tbody>")   
  }
  
  
  $('#cLiV').click(function() {
    $.fn.cLiV();
  });
    
  $.fn.cLiV = function() {
    var obJ = JSON.parse(strDatos);
     $( "#tb" ).remove();
     $("#tablaVo").append("<tbody id=\"tb\">");
      
      var dignDM = $( "#seleVo option:selected" ).text();
      for (var a of obJ.candidatos){
          if(a.Dignidad == dignDM ){
            $("#tb").append("<tr  id=\"trV\"><td>"+a.Dignidad+"</td><td><img style=\"height: 20px  width: 20px\" src=\".."+a.Logo+"\"</td><td>"+a.Nombre+"</td><td>"+a.Partido);
            $("#selePres").append("<option>"+a.Nombre+"</option>");
          }
      }
       $("#tablaVo").append("</tbody>")   
  }
  
 $('#cLiVotar').click(function() {
    $.fn.ya();
  });
  $.fn.ya = function() {
      var dignVt = $( "#selePres option:selected" ).text();
      
      console.log(dignVt)
  }
  
 
  
  $('#candi').click(function() {
    $.fn.candi();
  });
  $.fn.candi = function() {
      window.location.href="lista.html";
  }
  
  $('#modi').click(function() {
    $.fn.modi();
  });
  $.fn.modi = function() {
      window.location.href="listaM.html";
  }
  $('#result').click(function() {
    $.fn.result();
  });
  $.fn.result = function() {
      window.location.href="vot.html";
  }
  $('#agre').click(function() {
    $.fn.agre();
  });
  $.fn.agre = function() {
      window.location.href="agregarCa.html";
  }
  
  $('#verC').click(function() {
    $.fn.ver();
  });
  $.fn.ver = function() {
      window.location.href="lista.html";
  }
  
  $('#votar').click(function() {
    $.fn.pVot();
  });
  $.fn.pVot = function() {
      window.location.href="agregarCa.html";
  }
});
var obJ; 
var arr = [];
var admin;
var votante;

class Usuario {
    constructor (obJ){
        this.user = obJ.user;
        this.pass = obJ.pass;
        this.name = obJ.name;
        this.id = obJ.id;
    }
}

class Admin extends Usuario {
    constructor (obJ){
        super (obJ.user, obJ.pass, obJ.name, obJ.id)
        this.telefono = obJ.telefono;
        this.email = obJ.email;
        this.listarTodo = function(){
        
    }
    }
}

class Votante extends Usuario {
    constructor (obJ){
        super (obJ.user, obJ.pass, obJ.name, obJ.id)
        this.cedula = obJ.cedula;
       this.votar = function(candidato){
        
    }
    }
}

class CandidatoPresidencial {
    constructor (obJ){
        this.partido = obJ.Partido;
        this.numeroLista = obJ.Lista;
        this.logo = obj.Logo;
        this.candidato = obj.Nombre;
        this.dignidad = obj.Dignidad;
        this.foto = obj.Foto; 
        this.mostrarVotos = function(){
        }
    }
    
}


