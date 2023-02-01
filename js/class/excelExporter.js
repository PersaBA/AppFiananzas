class ExcelExporter {
    constructor(array, buttonId) {
        this.array = array;
        this.buttonId = buttonId;
    }
    export() {
        //  map array and get sum of ganancia and gasto
        let sumGanancia = 0;
        let sumGasto = 0;
        const newArray = this.array.map(item => {
            sumGanancia += item.ganancia;
            sumGasto += item.gasto;
            return {
                fecha: `${item.day}-${item.month}-${item.year}`,
                descripcion: item.resumen                ,
                ganancia: "$ "+listaClass.Comas(String(item.ganancia)),
                gasto: "$ "+listaClass.Comas(String(item.gasto)),
            }
        });
        // Add the sum of ganancia and gasto to the array
        newArray.push({ ganancia: "$ "+ listaClass.Comas(String(sumGanancia)), gasto:"$ "+ listaClass.Comas(String(sumGasto))});
        // Add the difference to the array
        newArray.push({Saldo_Actual: "$ " + (listaClass.Comas(String(sumGanancia - sumGasto)))});
        const ws = XLSX.utils.json_to_sheet(newArray);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "data");
        const button = document.getElementById(this.buttonId);
        button.addEventListener("click", () => {
           const currentDate = new Date();
           const formattedDate = currentDate.toLocaleDateString().replace(/\//g, '-');
           const fileName = `datos-${formattedDate}.xlsx`;
           const blob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], { type: "application/octet-stream" });
           const link = document.createElement('a');
           link.href = URL.createObjectURL(blob);
           link.download = fileName;
           link.style.display = 'none';
           document.body.appendChild(link);
           link.click();
           document.body.removeChild(link);
        });
    }
}