export const formatearFecha = (fechaSinFormateo) => {
    try {
        const fecha = new Date(fechaSinFormateo);
        return fecha.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch {
        return "Fecha no disponible";
    }
}

export const formatearFechaSinHora = (fechaSinFormateo) => {
    try {
        const fecha = new Date(fechaSinFormateo);
        return fecha.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch {
        return "Fecha no disponible";
    }
}


export const formatearHora = (periodo) => {
    let primeraHora, segundaHora = undefined
  
    if (periodo.length == 4) {
        primeraHora = periodo.slice(2);
        segundaHora = periodo.slice(-2);
    }
    try {
        if (isNaN(periodo) || periodo < 0 || periodo > 24) {
            return "Hora inválida";
        }
        if (primeraHora && segundaHora) return `${primeraHora.toString().padStart(2, '0')}:00`+` - `+`${segundaHora.toString().padStart(2,"0")}:00`  
        return `${periodo.toString().padStart(2, '0')}:00`;
    } catch {
        return "Hora no disponible";
    }
}



export const formatearHoraDiaria = (hora) => {
    return formatearHora(hora.split("-")[0]) +
        "-" +
        formatearHora(hora.split("-")[1])
}