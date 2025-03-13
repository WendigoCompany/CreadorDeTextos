document.getElementById('generateBtn').addEventListener('click', function() {
    // Obtener el texto del textarea
    const text = document.getElementById('textInput').value;
    
    // Mostrar el texto con estilo en el contenedor de salida
    const output = document.getElementById('output');
    output.innerHTML = text;

    // Usar html2canvas para generar la imagen
    html2canvas(output, {
        backgroundColor: null // No se agrega color de fondo, así se mantiene la transparencia
    }).then(function(canvas) {
        // Convertir el canvas a una imagen PNG con transparencia
        const imgData = canvas.toDataURL('image/png');
        
        // Crear un enlace para descargar la imagen
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = imgData;
        downloadLink.download = 'texto_generado.png';
        
        // Mostrar el enlace de descarga
        downloadLink.style.display = 'block';
    });
});
