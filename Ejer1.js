class Alumno{
    constructor(dni, ciclo, anyio){
        this._dni = dni;
        this._ciclo = ciclo;
        this._anyio = anyio;
    }

    get DNI(){
        return this._cif;
    }
    get CICLO(){
        return this._ciclo;
    }
    get ANYIO(){
        return this._anyio;
    }

    set CIF(value){
        this._dni = value;
    }
    set CICLO(value){
        this._ciclo = value;
    }
    set ANYIO(value){
        this._anyio = value;
    }
}

class Empresa{
    ciclos = [];
    alumnos = [];
    constructor(cif){
        this._cif = cif;
    }

    get CIF(){
        return this._cif;
    }

    set CIF(value){
        this._cif = value;
    }

    alta(alumno){
        this.alumnos.push(alumno);
    }
    baja(alumno){
        this.alumnos = this.alumnos.filter((a) => (a.DNI !== alumno.DNI))
    }
    alumnoPorciclo(ciclo){
        busqueda = [];
        busqueda = this.alumnos.filter((a) => a.Ciclo === ciclo);
        return busqueda;
    }
    alumnoPorAnyio(anyio){
        busco = [];
        busco = this.alumnos.filter((a) => a.Anyio === anyio);
        return busco;
    }
}

let empresa1 = new Empresa('878787848');
empresa1.ciclos.push('DAW');
empresa1.alta(new Alumno('98774685D', 'DAW', 2025));
empresa1.alta(new Alumno('98774685X', 'DAW', 2024));
empresa1.alta(new Alumno('98774685Y', 'DAM', 2025));
empresa1.alta(new Alumno('98774685W', 'DAW', 2024));
empresa1.alta(new Alumno('98774685V', 'DAM', 2025));
empresa1.alta(new Alumno('98774685A', 'DAW', 2024));
empresa1.alta(new Alumno('98774685R', 'DAM', 2025));
console.log(empresa1.alumnos);
empresa1.baja(new Alumno('98774685X', 'DAM', 2022));
cosole.log(empresa1.alumnoPorciclo("DAW"));
cosole.log(empresa1.alumnoPorciclo("DAM"));

