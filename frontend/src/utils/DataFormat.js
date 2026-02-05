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
    try {
        if (isNaN(periodo) || periodo < 0 || periodo > 24) {
            return "Hora inválida";
        }
        return `${periodo.toString().padStart(2, '0')}:00`;
    } catch {
        return "Hora no disponible";
    }
}