exports.TEAMS_EJEMPLO_RESUELVE_BD = [
    { nombreEquipo :"rojo",
        "meta": {   
            "A":5,
            "B":10,
            "C":15,
            "Cuauh":20
        } 
    },
    { nombreEquipo :"azul",
        "meta": {   
            "A":5,
            "B":10,
            "C":15,
            "Cuauh":20
        }   
    },
    { nombreEquipo : "Resuelve FC",
        "meta": {   
            "A":5,
            "B":10,
            "C":15,
            "Cuauh":20
        }   
    }
]


exports.TEAM_TLAX_CONTROLLER = 
    {
        "nombreEquipo": "TLAX FC",
        "goles_minimos": [
            {   
                nivel:"0",
                goles:8
            },
            {   
                nivel:"1",
                goles:12
            },
            {   nivel:"2",
                goles:15
            },
            {   
                nivel:"3",
                goles:24
            }
        ]
    }



exports.TEAM_CDMX_UPDATE_CONTROLLER = 
    {
        "nombreEquipo": "CDMX FC",
        "goles_minimos": [
            {   
                nivel:"0",
                goles:6
            },
            {   
                nivel:"1",
                goles:13
            },
            {   nivel:"2",
                goles:9
            },
            {   
                nivel:"3",
                goles:20
            }
        ]
    }

    exports.TEAM_CDMX_BD = [
        {
            "nombreEquipo": "CDMX FC",
            "meta": {   
                "0":4,
                "1":8,
                "2":13,
                "3":22
            } 
        }
    ]