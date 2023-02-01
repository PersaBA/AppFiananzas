class GetNumbers {
    getNumbers(x) {
        var numbers = x.match(/\d+/g);
        if (numbers === null) {
            return "";
        }
        return numbers.join("");
    };

    cent(p) {
        let Centavos = p.substr((p.length - 1, p.length - 2))
        const x = p.substr(0, p.length - 2)
        const cent = (x) => {
            const exp = /(\d)(?=(\d{3})+(?!\d))/g;
            const rep = '$1,';
            return x.toString().replace(exp, rep);
        }
        const total = `${cent(x)}.${Centavos}`
        return total
    };
     formatNumber(number) {
        if (number >= 1000000) {
          return (number / 1000000).toFixed(1).toString() + "M";
        } else if (number >= 1000) {
          return (number / 1000).toFixed(1).toString() + "K";
        } else {
          return number.toString();
        }
      }

};
