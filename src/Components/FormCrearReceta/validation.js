export default function validation(data){
    let errors={};
    const regexNum = /^-?\d+$/;
    const regexUrl = /\.(jpg|jpeg|png|gif|bmp)$/i;

    if(!data.name){
        errors.name = "El campo nombre no puede estar vacio"
    }
    if(!data.image){
        errors.image = "El campo imagen no puede estar vacio "
    }else if (!regexUrl.test(data.image)){
        errors.image = "Debe ingresar una ruta de imagen"
    }
    if(!data.summary){
        errors.summary = "El campo resumen no puede estar vacio"
    }
    if(!data.health_Score){
        errors.health_Score = "El campo Health Score no puede estar vacío"
    }
    if(data.health_Score < 0 || data.health_Score >100){
        errors.health_Score = "El Health Score debe ser un número entre 0 y 100"
    }
    if(!regexNum.test(data.health_Score)){
        errors.health_Score = "El valor debe ser un número"
    }
    return errors;
}