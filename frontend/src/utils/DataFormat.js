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


export const formatearHoraDosCuatroDigitos = (periodo) => {
    try {
        if (!periodo) return "Hora no disponible";
        
        const periodoStr = periodo.toString();
        
        // periodo con guion
        if (periodoStr.includes('-')) {
            const [primeraHora, segundaHora] = periodoStr.split('-');
            const hora1 = parseInt(primeraHora);
            const hora2 = parseInt(segundaHora);
            
            if (isNaN(hora1) || isNaN(hora2) || hora1 < 0 || hora1 > 24 || hora2 < 0 || hora2 > 24) {
                return "Hora inválida";
            }
            
            return `${hora1.toString().padStart(2, '0')}:00 - ${hora2.toString().padStart(2, '0')}:00`;
        }
        
        // Periodo de 4
        if (periodoStr.length == 4) {
            const primeraHora = parseInt(periodoStr.slice(0, 2)); // Primeros 2 dígitos
            const segundaHora = parseInt(periodoStr.slice(2));    // Últimos 2 dígitos
            
            if (isNaN(primeraHora) || isNaN(segundaHora) || 
                primeraHora < 0 || primeraHora > 24 || 
                segundaHora < 0 || segundaHora > 24) {
                return "Hora inválida";
            }
            
            return `${primeraHora.toString().padStart(2, '0')}:00 - ${segundaHora.toString().padStart(2, '0')}:00`;
        }
        
        // Periodo de 2 dígitos
        if (periodoStr.length == 2) {
            const hora = parseInt(periodoStr);
            
            if (isNaN(hora) || hora < 0 || hora > 24) {
                return "Hora inválida";
            }
            
            return `${hora.toString().padStart(2, '0')}:00`;
        }
        
        return "Formato inválido";
    } catch {
        return "Hora no disponible";
    }
}



export const formatearHoraConGuion = (hora) => {
    return formatearHoraDosCuatroDigitos(hora.split("-")[0]) +
        "-" +
        formatearHoraDosCuatroDigitos(hora.split("-")[1])
}