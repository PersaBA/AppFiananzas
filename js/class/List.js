class Lista {

    Comas(p) {
        if (p == 0 || p == '') {
            return '0.00'
        } else {
            let Centavos = p.substr((p.length - 1, p.length - 2))
            const x = p.substr(0, p.length - 2)
            const comas = (x) => {
                const exp = /(\d)(?=(\d{3})+(?!\d))/g;
                const rep = '$1,';
                return x.toString().replace(exp, rep);
            }
            const total = `${comas(x)}.${Centavos}`
            return total
        }
    }

    Creador(list) {
        let creadorHTML = '';
        for (let i = 0; i < list.length; i++) {
            creadorHTML += `<tr>`;
            creadorHTML += `<td>${list[i].day}/${list[i].month}/${list[i].year}</td>`;
            creadorHTML += `<td title='${list[i].detalles}'>${list[i].resumen || '-'}</td>`;
            creadorHTML += `<td>$${listaClass.Comas(String(list[i].ganancia))}</td>`;
            creadorHTML += `<td>$${listaClass.Comas(String(list[i].gasto))}</td>`;
            creadorHTML += `<td data-index=${i} class='delete' >X</td>`;
            creadorHTML += `</tr>`;
            creadorHTML += `</div>`;
        }
        document.getElementById('table').innerHTML = creadorHTML;
    }

    importeActualizar(array) {
        let gasto = 0;
        let ganancia = 0;
        for (let i = 0; i < array.length; i++) {
            gasto += array[i].gasto;
            ganancia += array[i].ganancia;
        }
        let saldo = ganancia - gasto
        document.getElementById('gasto').innerHTML = listaClass.Comas(String(gasto));
        document.getElementById('ganancias').innerHTML = listaClass.Comas(String(ganancia));
        document.getElementById('saldo').innerHTML = listaClass.Comas(String(saldo));
        Ars_to_usd_class.Ars_to_usd_async(saldo)

    }

    Agregar(items) {
        let formulario = document.querySelector('#formulario');
        itemsLista.unshift(items);
        localStorage.setItem('itemsLista', JSON.stringify(itemsLista));
        listaClass.importeActualizar(itemsLista)
        listaClass.Creador(itemsLista)
        alert(`Se a agregado correctamente: ${formulario.Nombre.value}`)
        window.location.reload()
    }

    Open(Categoria, d, m, y) {
        let add = document.getElementById('add');
        add.style.display = 'block';
        add.style.scale = '1';
        if (Categoria == 'Haber') {
            document.getElementById('tituloForm').innerHTML = 'Gastos';
        } else {
            document.getElementById('tituloForm').innerHTML = 'Ganancias';
        }
        formulario.day.value = d
        formulario.month.value = m
        formulario.year.value = y
    }
    Close() {
        let add = document.getElementById('add');
        add.style.display = 'none';
        add.style.scale = '0';
    }
}