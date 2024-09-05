/* APP DE NOTAS

1. REQUERIMIENTOS
Se necesita una aplicación que nos permita crear, editar, consultar y borrar notas. Las notas deben tener un ID y nombre. 
Debo tener un menú que me permita elegir la acción que quiero ejecutar. Debo poder listar las notas para seleccionarlas,
el listado solo debe mostrar el ID de la nota y el título.

2. CREACIÓN DE LA ESTRUCTURA DE LA NOTA
Crearemos la estructura de la nota

3. CREACIÓN DE LAS FUNCIONES CRUD
* Crearemos la función crear.
* Crearemos la función editar.
* Crearemos la función consultar y listar.
* Crearemos la función borrar.

4. CREACIÓN DEL MENÚ
Crearemos el menú de usuario que permita digitar la información en la consola

*/

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let listaDeNotas = [];

// Función para crear una nueva nota
function crear() {
    rl.question("Escribe tu nota: ", function(nota) {
        listaDeNotas.push(nota);
        console.log("Nota agregada correctamente.");
        listar();  // Muestra la lista actualizada
        menu();    // Vuelve a mostrar el menú después de crear la nota
    });
    
}

// Función para listar las notas
function listar() {
    if (listaDeNotas.length === 0) {
        console.log("No hay notas disponibles.");
    } else {
        console.log("Este es tu listado de notas:");
        listaDeNotas.forEach((nota, index) => {
            console.log(`${index + 1}. ${nota}`);
        });
    }
}

// Función para editar una nota existente
function editar() {
    if (listaDeNotas.length === 0) {
        console.log("No hay notas para editar.");
        menu();  // Regresa al menú si no hay notas
        return;
    }

    listar();
    rl.question("¿Qué número de nota quieres cambiar? ", function(numero) {
        const indice = parseInt(numero) - 1;
        if (indice >= 0 && indice < listaDeNotas.length) {
            rl.question("Escribe el nuevo contenido: ", function(texto) {
                listaDeNotas[indice] = texto;
                console.log("Nota editada correctamente.");
                listar();
                menu();  // Vuelve a mostrar el menú después de editar
            });
        } else {
            console.log("Número de nota inválido.");
            menu();  // Regresa al menú si el número es inválido
        }
    });
}

// Función para borrar una nota
function borrar() {
    if (listaDeNotas.length === 0) {
        console.log("No hay notas para borrar.");
        menu();  // Regresa al menú si no hay notas
        return;
    }

    listar();
    rl.question("¿Qué número de nota quieres borrar? ", function(numero) {
        const indice = parseInt(numero) - 1;
        if (indice >= 0 && indice < listaDeNotas.length) {
            listaDeNotas.splice(indice, 1);
            console.log("Nota eliminada correctamente.");
            listar();
            menu();  // Vuelve a mostrar el menú después de borrar
        } else {
            console.log("Número de nota inválido.");
            menu();  // Regresa al menú si el número es inválido
        }
    });
}

// Función para mostrar el menú y procesar la opción elegida
function menu() {
    console.log("\nBienvenido a Ednotes");
    console.log("Menú de usuario:");
    console.log("1. Crear una nota");
    console.log("2. Ver todas las notas");
    console.log("3. Editar una nota");
    console.log("4. Eliminar una nota");
    console.log("5. Cerrar el programa");

    rl.question("Escribe el número elegido: ", function(num) {
        switch (parseInt(num)) {
            case 1:
                crear();
                break;
            case 2:
                listar();
                menu();  // Vuelve a mostrar el menú después de listar
                break;
            case 3:
                editar();
                break;
            case 4:
                borrar();
                break;
            case 5:
                console.log("¡Hasta luego!");
                rl.close();
                break;
            default:
                console.log("Opción no válida.");
                menu();  // Regresa al menú si la opción es inválida
        }
    });
}

menu();  // Inicia el programa mostrando el menú
