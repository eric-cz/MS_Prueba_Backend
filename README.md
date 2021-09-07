
# Prueba-Ingeniería Resuelve Backend

Este Microservicio se encarga de calcular los sueldos completos de los jugadores.

## Instalación
	Existe dos formas de poder correr el proyecto:
 **1. Docker**	  
 **2. Node**
 
## 1. Docker
 ### Requisitos 
* Docker 	
 
 ### Build
 Para construir la imagen ejecutar el siguiente comando:
 
**docker build -t eric/resuelve-prueba-backend:latest .**

### Deploy
Para correr la imagen ejecutar el siguiente comando:

**docker run --name resuelve-prueba-backend -p 9030:9030 -d  eric/resuelve-prueba-backend:latest**

### Verificar 
	Abrir en el navegador el siguiente URL http://localhost:9030/ms-salarios/

## 2. Node
 ### Requisitos 
* Node v14.17.6
* Npm 6.14.15
 
 ### Build
 Para instalar las dependencias ejecutar el comando
 
*npm install*
 ### Test
 Para ejecutar la pruebas unitarias ejecutar el comando
 
*npm test*
### Deploy
Para correr el proyecto ejecutar el comando:

*npm start*

### Verificar 
	Abrir en el navegador el siguiente URL http://localhost:9030/ms-salarios/


 ## Capacidades

### Calculo de salarios
Se realiza el calculo de salarios a los distintos jugadores con distintos niveles y diferentes equipos.
Se recibe un JSON con la estructura mostrada, donde el único campo opcional es goles_minimos.

```json
{
    "jugadores": [
        {
            "nombre": "Juan Perez",
            "nivel": "C",
            "goles": 10,
            "sueldo": 50000,
            "bono": 25000,
            "sueldo_completo": null,
            "equipo": "rojo",
            "goles_minimos": null
        },
        {
            "nombre": "EL Cuauh",
            "nivel": "Cuauh",
            "goles": 30,
            "sueldo": 100000,
            "bono": 30000,
            "sueldo_completo": null,
            "equipo": "azul",
            "goles_minimos": null
        },
        {
            "nombre": "Cosme Fulanito",
            "nivel": "A",
            "goles": 7,
            "sueldo": 20000,
            "bono": 10000,
            "sueldo_completo": null,
            "equipo": "azul",
            "goles_minimos": null
        },
        {
            "nombre": "El Rulo",
            "nivel": "B",
            "goles": 9,
            "sueldo": 30000,
            "bono": 15000,
            "sueldo_completo": null,
            "equipo": "rojo",
            "goles_minimos": null
        }
    ]
}
```

### Consulta de equipos
la consulta de equipos se realiza por medio del nombre del equipo, si el equipo existe responderá con un JSON con el siguiente formato:
```json
{
    "nombreEquipo": "rojo",
    "goles_minimos": [
        {
            "nivel": "A",
            "goles": 5
        },
        {
            "nivel": "B",
            "goles": 10
        },
        {
            "nivel": "C",
            "goles": 15
        },
        {
            "nivel": "Cuauh",
            "goles": 20
        }
    ]
}
```

### Alta de equipos
se puede dar de alta un nuevo equipo con sus diferentes niveles y minimo de goles. Es necesario enviar un JSON con la siguiente estructura:

```json
{
    "nombreEquipo": "Campeche FC",
    "goles_minimos": [
        {
            "nivel": "Z",
            "goles": 9
        },
        {
            "nivel": "W",
            "goles": 19
        },
        {
            "nivel": "K",
            "goles": 10
        },
        {
            "nivel": "M",
            "goles": 12
        }
    ]
}
```

### Actualización de equipos
se puede realizar la actualización de un equipo previamente registrado, requiere el mismo formato de JSON que la alta de equipos:
```json
{
    "nombreEquipo": "Campeche FC",
    "goles_minimos": [
        {
            "nivel": "Z",
            "goles": 9
        },
        {
            "nivel": "W",
            "goles": 19
        },
        {
            "nivel": "K",
            "goles": 10
        },
        {
            "nivel": "M",
            "goles": 12
        }
    ]
}
```
## Notas
### Base de datos
Se utilizo una base de datos embebida, al momento de levantar el proyecto carga los datos que se encuentran en el archivo **initialData.json**, el cual tienes datos de diferentes equipos con sus niveles de jugadores y respectivos mínimo de goles por cada nivel.

### Calculo de salarios
Para calcular el salario completo de los jugadores existen 3 posibles casos
1.	La configuración de nivel y equipo del jugador existen en la base de datos, se obtiene el mínimo de goles requerido para ese jugador, a partir de ese dato se calcula su salario completo.
2.	La configuración de nivel y equipo del jugador no existen en la base de datos, pero el jugador tiene precargado goles_minimos, a partir de ese dato se calcula su salario completo.
3.	La configuración de nivel y equipo del jugador no existen en la base de datos, y tampoco se tiene dato goles_minimos precargado, en este caso el sueldo completo es igual al sueldo base.
### Test servicios
Para realizar la prueba de los servicios se recomienda el uso de postman.
En el repositorio se anexo el archivo **IngenieraResuelve.postman_collection.json**, el cual tiene los diferentes endpoints con datos para realizar pruebas, o bien, importar la misma colección con el siguiente url: https://www.getpostman.com/collections/b2b22085a9af73aaa7d7
