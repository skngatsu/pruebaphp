const Url = "http://localhost/master-php/prueba_php/php/";

var Fn = {
    validaRut: function (rutCompleto) {
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
            return false;

        var tmp = rutCompleto.split('-');
        var digv = tmp[1];
        var rut = tmp[0];
        if (rut.length == 9) return false;
        if (digv == 'K') digv = 'k';
        return (Fn.dv(rut) == digv);
    },
    dv: function (T) {
        var M = 0, S = 1;
        for (; T; T = Math.floor(T / 10))
            S = (S + T % 10 * (9 - M++ % 6)) % 11;
        return S ? S - 1 : 'k';
    }
}
function resetform() {
    $("form select").each(function () { this.selectedIndex = 0 });
    $("form input[type=text] , form select,form input[type=checkbox] ").each(function () { this.value = '' });

}

function limpiarMensajes() {
    let opciones = "";
    $("#nombremgs").html(opciones);
    $("#aliasmgs").html(opciones);
    $("#rutmgs").html(opciones);
    $("#emailmgs").html(opciones);
    $("#regionmgs").html(opciones);
    $("#comunamgs").html(opciones);
    $("#candidatomgs").html(opciones);
    $("#opcionesmgs").html(opciones);
    $("#mensagessucces").html(opciones);



}

async function fnllamadaBd() {
    const respuesta = await fetch(Url + "region.php", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const json = await respuesta.json();
    var opciones = "";
    opciones = json.map(region => `<option value =${region.Id}>${region.Nombre}</option>`);
    opciones = '<option value =""></option>' + opciones;
    $("#region").html(opciones);


}

async function cargarComuna(regionId) {

    var data = {
        id: regionId
    };


    const respuesta = await fetch(Url + "comuna.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const json = await respuesta.json();
    var opciones = "";
    opciones = json.map(comuna => `<option value =${comuna.Id}>${comuna.Nombre}</option>`);
    opciones = '<option value =""></option>' + opciones;
    $("#comuna").html(opciones);



}


async function cargarCandidato(comunaId) {
    var data = {
        id: comunaId
    };


    const respuesta = await fetch(Url + "candidato.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const json = await respuesta.json();
    var opciones = "";
    opciones = json.map(candidato => `<option value =${candidato.Id}>${candidato.Nombre}</option>`);
    opciones = '<option value =""></option>' + opciones;
    $("#candidato").html(opciones);

}

async function InsertarVotacion(data) {

    const respuesta = await fetch(Url + "insertaVotacion.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const json = await respuesta.json();
    if (json.status == "OK") {
        document.getElementById("formVotacion").reset();
        $("#mensagessucces").html('<div class="alert alert-success" role="alert">' + json.mensage + '</div>');
    } else {
        $("#mensagessucces").html('<div class="alert alert-danger" role="alert">' + json.mensage + '</div>');
    }



}
function validarCampos(data) {
    limpiarMensajes();
    if (data.nombre == "" || data.nombre == null) {

        $("#nombremgs").html("Debe ingresar nombre y apellido");
        return false;
    }
    if (data.alias != "") {
        var validAlias = /^[a-zA-Z0-9]+$/
        if (data.alias.length < 6 || !validAlias.test(data.alias)) {
            $("#aliasmgs").html("Alias debe tener mas de 5 caracteres y ser alfanumerico");
            return false;
        }
    }
    if (data.rut != "") {
        if (!Fn.validaRut(data.rut)) {
            $("#rutmgs").html("Rut debe tener formato valido (XXXXXXXX-X)");
            return false;
        }
    }


    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!validEmail.test(data.email)) {
        $("#emailmgs").html("Debe ingresar un email valido");
        return false;
    }

    if (data.region == "" || data.region == null) {
        $("#regionmgs").html("Debe Seleccionar Region");
        return false;
    }

    if (data.comuna == "" || data.comuna == null) {
        $("#comunamgs").html("Debe Seleccionar Comuna");
        return false;
    }

    if (data.candidato == "" || data.candidato == null) {
        $("#candidatomgs").html("Debe Seleccionar Candidato");
        return false;
    }

    var contador = 0;
    if (data.ckWeb) contador++;
    if (data.ckTv) contador++;
    if (data.ckRed) contador++;
    if (data.ckAmigo) contador++;
    if (contador < 2) {
        $("#opcionesmgs").html("Debe seleccionar al menos 2 de la siguientes opciones (Web,Tv,Red Sociales,Amigo) ");
        return false;
    }
    return true
}

$(document).ready(function () {
    fnllamadaBd();
    $("#region").on("change", function () {
        const valorSeleccionado = $(this).val();
        cargarComuna(valorSeleccionado);
    });
    $("#comuna").on("change", function () {
        const valorSeleccionado = $(this).val();
        cargarCandidato(valorSeleccionado);
    });

    $("#alias").bind('keypress', function (event) {
        var regex = new RegExp("^[a-zA-Z0-9]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    });

    $("#votar").on("click", function (event) {
        event.preventDefault();
        const nombre = $("#name").val();
        const alias = $("#alias").val();
        const rut = $("#rut").val();
        const email = $("#email").val();
        const region = $("#region").val();
        const comuna = $("#comuna").val();
        const candidato = $("#candidato").val();
        const ckWeb = $('#ckWeb').is(':checked');
        const ckTv = $('#ckTv').is(':checked');
        const ckRed = $('#ckRed').is(':checked');
        const ckAmigo = $('#ckAmigo').is(':checked');
        var data = { nombre: nombre, alias: alias, rut: rut, email: email, region: region, comuna: comuna, candidato: candidato, ckWeb: ckWeb, ckTv: ckTv, ckRed: ckRed, ckAmigo: ckAmigo };

        if (validarCampos(data)) {
            InsertarVotacion(data);
        }



    });



});



