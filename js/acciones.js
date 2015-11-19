// JavaScript Document
var sexo = 0;
var edad = 0;
var conoce = 0;
var hace = 0;
var bulleado = 0;
var denunciado = 0;
var db;
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
		  $('#pregunta4').removeClass('oculta');
		  
		 }
		else if ($(this).hasClass("R3n"))
		 {
		  $(".R3n").addClass('rojo');
		  $(".R3s").removeClass('verde');
  		  $('#pregunta4').addClass('oculta');
		  $(".R4n").addClass('rojo');
		  $(".R4s").removeClass('verde');
		  bulleado = 0;
		  denunciado = 0;
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


//alert ($('#cuantas').html());

	//   $('#cuantas').html(parseInt ($('#cuantas').html())+1);
   });
 }

});

