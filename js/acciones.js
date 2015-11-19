// JavaScript Document
var sexo = -1;
var edad = -1;
var conoce = -1;
var hace = -1;
var bulleado = -1;
var denunciado = -1;
var $contenido = ""
var $nombre=""
var db;

//*************************


            function gotFS(fileSystem) {

				 var fecha = new Date();

 
$nombre = fecha.getDate() + "-" + (fecha.getMonth() +1) + "-" + fecha.getFullYear() + "-" + fecha.getHours() + "-" + fecha.getMinutes() + "-" + fecha.getSeconds();

   fileSystem.root.getDirectory("Bullying", {create: true}, gotDir);
}

function gotDir(dirEntry) {
    dirEntry.getFile($nombre+".csv", {create: true, exclusive: true}, gotFileEntry);


            }

            function gotFileEntry(fileEntry) {
                fileEntry.createWriter(gotFileWriter, fail);
            }

            function gotFileWriter(writer) {
                writer.onwrite = function(evt) {				
					
                    console.log("Correcto");
                };

                writer.write($contenido);
				alert ("here");
				$("#archivo").html($nombre + ".csv");
				$("#exportado").popup();
                $("#exportado").popup("open");	 
				
                writer.abort();

            }

            function fail(error) {
                console.log("error : "+error.code);
            }
function Guardar()
{
	$contenido = "Folio Encuesta, Sexo, Edad, Conoce, Hace, Bulleado, Denunciado" + "\n";

	db.transaction(function(tx) {
        tx.executeSql("select * from encuestas;", [], function(tx, res) {

    for (i = 0; i < res.rows.length; i++) { 
	$contenido = $contenido + res.rows.item(i).folioEncuesta + "," + res.rows.item(i).sexo + "," + res.rows.item(i).edad + "," +res.rows.item(i).conoce + "," + res.rows.item(i).hace + "," + res.rows.item(i).bulleado + "," +res.rows.item(i).denunciado  +"\n"; 

    }  

        });
      });
		
		

try
{
	
window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}
    catch (e)
	{
        alert(e);
	}


}

//*******************

function conectar_base()
 {

			db = window.sqlitePlugin.openDatabase({name: "bullying.db", createFromLocation: 1});

			
			db.transaction(function(tx) {
        tx.executeSql("select count(folioEncuesta) as cuantas from encuestas;", [], function(tx, res) {

          $('#cuantas').html(res.rows.item(0).cuantas);
        });
      });
			
			
 }
$(document).ready(function(e) {
	
document.addEventListener("deviceready", onDeviceReady, false);
 function onDeviceReady() {
	 
 conectar_base();

 $('#resultados').on('tap', function(){
	   $("#opciones").popup("close");	 	 
alert ("dentro");
	 var $total = parseInt ($('#cuantas').html());
	 
db.transaction(function(tx) {
        tx.executeSql("select count(folioEncuesta) as totalhombres from encuestas where sexo = 'H';", [], function(tx, res) {


          var $totalhombres = res.rows.item(0).totalhombres;

        });
      });	 
/*
db.transaction(function(tx) {
        tx.executeSql("select count(folioEncuesta) as totalmujeres from encuestas where sexo = 'M';", [], function(tx, res) {


          var $totalmujeres = res.rows.item(0).totalmujeres;

        });
      });	 

*/
alert (Math.round(($totalhombres*100)/$total));

	  $('#total').html($total);
	  $('#totalHombres').html($totalhombres);
	//  $('#totalMujeres').html($totalmujeres);
	  //	  $('#datosHombres').css('width', Math.round(($totalhombres*100)/$total));
	  

	 
	$(':mobile-pagecontainer').pagecontainer('change', '#pagestadistica'); 
 });
 $('#cerrarOpciones').on('tap', function(){
  $("#opciones").popup("close");	 	 
 });
 
 $('#exportar').on('tap', function(){
     $("#opciones").popup("close");	 
	 Guardar();
 });
 

 $('#btndatos').on('tap', function(){


	 
if ( parseInt($('#cuantas').html()) > 0)
 {
    	     $('#opcionesE').removeClass('oculta');
 }
 else
  {
     $('#sindatos').removeClass('oculta');
	//  alert ("no hay estadistica que guardar o mostrar");
  }
  
  $("#opciones").popup();
  $("#opciones").popup("open");	 

 });
 
	$(".icono-grande").on("tap",function(){
		if($(this).hasClass("sexo-h"))
		 {
		  $(".sexo-h").addClass('icono-azul');
		  $(".sexo-m").removeClass('icono-rosa');
		  sexo='H';
		 }
		else if ($(this).hasClass("sexo-m"))
		 {
		  $(".sexo-m").addClass('icono-rosa');
		  $(".sexo-h").removeClass('icono-azul');
  		  sexo='M';
		 }		 
	});
	
	$(".edad").on("tap",function(){
	  $(".edad").removeClass('edad-seleccionada');
	  $(this).addClass('edad-seleccionada');
	  edad = $(this).html();

	});
	
	$(".respuesta1").on("tap", function(event){
      if($(this).hasClass("R1s"))
		 {
		  $(".R1s").addClass('verde');
		  $(".R1n").removeClass('rojo');
		  conoce = 1;
		 }
		else if ($(this).hasClass("R1n"))
		 {
		  $(".R1n").addClass('rojo');
		  $(".R1s").removeClass('verde');
		  conoce = 0;
		 }		 	  

	});
	
		$(".respuesta2").on("tap", function(event){
      if($(this).hasClass("R2s"))
		 {
		  $(".R2s").addClass('verde');
		  $(".R2n").removeClass('rojo');
		  hace = 1;
		 }
		else if ($(this).hasClass("R2n"))
		 {
		  $(".R2n").addClass('rojo');
		  $(".R2s").removeClass('verde');
		  hace = 0;
		 }		 	  

	});

	$(".respuesta3").on("tap", function(event){

      if($(this).hasClass("R3s"))
		 {
		  $(".R3s").addClass('verde');
		  $(".R3n").removeClass('rojo');
		  bulleado = 1;
		  
		 }
		else if ($(this).hasClass("R3n"))
		 {
		  $(".R3n").addClass('rojo');
		  $(".R3s").removeClass('verde');
		  bulleado = 0;
		 }		 	  

	});
	

	$(".respuesta4").on("tap", function(event){
      if($(this).hasClass("R4s"))
		 {
		  $(".R4s").addClass('verde');
		  $(".R4n").removeClass('rojo');
		  denunciado = 1;
		 }
		else if ($(this).hasClass("R4n"))
		 {
		  $(".R4n").addClass('rojo');
		  $(".R4s").removeClass('verde');
		  denunciado = 0;
		 }		 	  

	});



   $('#guardar').on('tap', function(){
if ( sexo == -1 ||  edad == -1 ||  conoce == -1 ||  hace == -1 || bulleado == -1 || denunciado == -1)
 {
  $("#faltan").popup();
  $("#faltan").popup("open");	 
 }
  else
  {


db.transaction(function(tx) {
              tx.executeSql("INSERT INTO encuestas (sexo, edad, conoce, hace, bulleado, denunciado) VALUES (?,?,?,?,?,?)", [sexo, edad, conoce,hace, bulleado, denunciado], function(tx, res) {
				  				  $("#confirmacion").popup();
				  $("#confirmacion").popup("open");
				  			  			db.transaction(function(tx) {
        tx.executeSql("select count(folioEncuesta) as cuantas from encuestas;", [], function(tx, res) {


          $('#cuantas').html(res.rows.item(0).cuantas);
        });
      });
			   
			    }, function(e) {
            alert ("ERROR: " + e.message);
			  
			  }); 	   
   });

  }
   });
   
$('#continuar').on('tap', function (){
 sexo = -1;
 edad = -1;
 conoce = -1;
 hace = -1;
 bulleado = -1;
 denunciado = -1;
  $(".sexo-m").removeClass('icono-rosa'); 
  $(".sexo-h").removeClass('icono-azul');
  $(".R1s").removeClass('verde');
  $(".R2s").removeClass('verde');
  $(".R3s").removeClass('verde');
  $(".R4s").removeClass('verde');
  $(".R1n").removeClass('rojo');
  $(".R2n").removeClass('rojo');
  $(".R3n").removeClass('rojo');
  $(".R4n").removeClass('rojo');
  $(".edad").removeClass('edad-seleccionada');

  
		       $('html, body').animate({
        scrollTop: 0 
    }, 400);
});





 }


});

