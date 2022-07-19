window.addEventListener('load', function() {
    // Al cargar la pagina buscamos y obtenemos el formulario donde estarán los datos que le usuarie cargará del nueve paciente
    const formulario = document.querySelector('#add_new_paciente');

    // Ante un submit del formulario se ejecutará la siguiente funcion
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
       // Creamos un JSON que tendrá los datos de un nueve paciente
        const formData = {
            nombre: document.querySelector('#nombre').value,
            apellido: document.querySelector('#apellido').value,
            email: document.querySelector('#email').value,
            dni: document.querySelector('#dni').value,
            fechaIngreso: document.querySelector('#fechaIngreso').value,
            domicilioDTO: {
                calle: document.querySelector('#calle').value,
                numero: document.querySelector('#numero').value,
                localidad: document.querySelector('#localidad').value,
                provincia: document.querySelector('#provincia').value
            }
        }

       // Invocamos utilizando la función fetch le API pacientes con el método POST que guardará le paciente que enviaremos en formato JSON
        const url = '/pacientes';
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                // Si no hay ningun error se muestra un mensaje diciendo que le paciente se agrego bien
                 let successAlert = '<div class="alert alert-success alert-dismissible">' +
                 '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                 '<strong></strong> Paciente agregado </div>'

                 document.querySelector('#response').innerHTML = successAlert;
                 document.querySelector('#response').style.display = "block";
                 resetUploadForm();
        }).catch(error => {
             // Si hay algun error se muestra un mensaje diciendo que le paciente no se pudo guardar y se intente nuevamente
              let errorAlert = '<div class="alert alert-danger alert-dismissible">' +
                               '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                               '<strong> Error intente nuevamente</strong> </div>'

              document.querySelector('#response').innerHTML = errorAlert;
              document.querySelector('#response').style.display = "block";
             // Se dejan todos los campos vacíos por si se quiere ingresar otre paciente
              resetUploadForm();});
    });

    function resetUploadForm(){
        document.querySelector('#nombre').value = "";
        document.querySelector('#apellido').value = "";
        document.querySelector('#dni').value = "";
        document.querySelector('#fechaIngreso').value = "";
        document.querySelector('#calle').value ="";
        document.querySelector('#numero').value = "";
        document.querySelector('#localidad').value = "";
        document.querySelector('#provincia').value = "";
        document.querySelector('#email').value = "";
    }

    (function(){
        let pathname = window.location.pathname;
        if(pathname === "/"){
            document.querySelector(".nav .nav-item a:first").addClass("active");
        } else if (pathname == "/pacienteListar.html") {
            document.querySelector(".nav .nav-item a:last").addClass("active");
        }
    })();
});