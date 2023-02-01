class Ars_to_usd{
        async Ars_to_usd_async(x) {
            try {
                const results = await fetch(`https://api.bluelytics.com.ar/v2/latest`);
                const resultado = await results.json();
                let valorDolar = Number(resultado.blue.value_sell);
                let monto = Math.trunc(x / valorDolar);
                document.getElementById('saldoDolares').innerHTML = listaClass.Comas(String(monto))
            } catch (error) {
                alert('error en el async', error)
            }
        }
      
}