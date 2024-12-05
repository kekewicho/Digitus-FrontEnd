
export const sum = (data, key) => {
    return data ? data.reduce((sumatoria, d) => sumatoria + d[key], 0) : 0;
}

export const mean = (data, key) => {
    const suma = sum(data, key)

    return suma / data.length
}


export const group = ({ ...args }) => {
    const formatMonth = (month) => month.toString().padStart(2, '0');

    const groupedData = args.data.reduce((acc, item) => {
        // Handle single value and array of value scenarios
        const values = Array.isArray(args.value)
            ? args.value
            : [args.value];

        values.forEach((value) => {
            if (!acc[item[args.key]]) {
                acc[item[args.key]] = {};
            }

            if (args.explainBy) {

                args.explainBy.forEach(e => {

                    if (!acc[item[args.key]][`${item[e]}-${value}`]) acc[item[args.key]][`${item[e]}-${value}`] = 0;

                    acc[item[args.key]][`${item[e]}-${value}`] += item[value];

                })

            } else {

                if (!acc[item[args.key]][value]) acc[item[args.key]][value] = 0;

                acc[item[args.key]][value] += item[value];

            }

        });
        return acc;
    }, {});

    let formattedData = Object.entries(groupedData).map(([keys, values]) => ({
        [args.key]: keys,
        ...values
    }));

    if (args.fillMissing) {

        if (args.explainBy) {

            const allMonths = args.fillMissingType == 'week' ? Array.from({ length: 7 }, (_, i) => i + 1) : Array.from({ length: 12 }, (_, i) => formatMonth(i + 1));
            const allKeys = new Set();
            formattedData.forEach((item) => {
                Object.keys(item).forEach((key) => allKeys.add(key));
            });

            formattedData = formattedData.concat(
                allMonths
                    .filter((month) => !formattedData.some((data) => data[args.key] == month))
                    .map((month) => {
                        return { [args.key]: month };
                    })
            );

            formattedData.forEach((item) => {
                allKeys.forEach((key) => {
                    if (!item.hasOwnProperty(key)) {
                        item[key] = 0;
                    }
                });
            });



        } else {

            const allMonths = args.fillMissingType == 'week' ? Array.from({ length: 7 }, (_, i) => i + 1) : Array.from({ length: 12 }, (_, i) => formatMonth(i + 1));

            formattedData = formattedData.concat(
                allMonths
                    .filter((month) => !formattedData.some((data) => data[args.key] == month))
                    .map((month) => {
                        const newObject = { [args.key]: month };
                        args.value.forEach((valueKey, index) => {
                            newObject[valueKey] = 0;
                        });
                        return newObject;
                    })
            );
        }

    }



    if (args.order != null) {
        formattedData = formattedData.sort((a, b) =>
            args.order.descending ? b[args.order.key] - a[args.order.key] : a[args.order.key] - b[args.order.key]
        );
    }

    return formattedData;

};

export const dropDuplicates = (data, keys) => {
    return data
      .map(item => 
        keys.reduce((acc, key) => {
          acc[key] = item[key];
          return acc;
        }, {})
      )
      .filter((value, index, self) =>
        index === self.findIndex(v => 
          keys.every(key => v[key] === value[key])
        )
      );
  }
  


export const getTopN = (array, key, n, order) => {
    // Filtrar el array basado en si el atributo 'key' está definido
    const filteredArray = array.filter(obj => obj[key] !== undefined);

    let sortedArray;

    // Ordenar el array en función del valor del atributo 'key' en orden descendente
    if (order=='asc') {
        sortedArray = filteredArray.sort((a, b) => b[key] - a[key]);
    } else {
        sortedArray = filteredArray.sort((a, b) => a[key] - b[key]);
    }

    // Devolver los primeros 'n' objetos
    return sortedArray.slice(0, n);
}


export function formatNumber(number, money = false) {
    if (typeof number !== "number") {
      throw new Error("El valor debe ser un número");
    }
    
    return money ? `$ ${number.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits: 2})}` : number.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits: 2}); // Usa configuración regional para formatear
  }
  

export function capitalize(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}



export function filterData(data, key, value) {
    return data.filter(e=>e[key]==value)[0]
}