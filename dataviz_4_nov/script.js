
function plotLineNov(path, id) {
    d3.csv(path,  d3.autoType).then((data) => {
    console.log(data)
    // Guardamos el svg generado en la variable chart
//---------------------------------------------------------------------------------------------
    // TODO CAPITAL:
    
    let total = data.filter(d=>d.mes == "11").length
    let hours = data.filter(d=>d.mes == "11").map(d=>d.hora)
    let hours_count = hours.reduce((acc, curr) => {
        acc[curr] ? acc[curr]++ : acc[curr] = 1;
        return acc;
        }, {});
    let hours_count_array = Object.entries(hours_count)

    let hours_percentage = hours_count_array.map(d=> {
        return [d[0], d[1]/total]
    })
    hours_percentage.forEach(d=> {
        d[0] = +d[0]
        d[1] = d[1]*100
    })

    console.log(hours_percentage)
//-------------------------------------------------------------------------------------------
    // PALERMO NOMAS:
    let total_palermo = data.filter(d=> d.domicilio_barrio=="PALERMO")
    let pal_dic = total_palermo.filter(d=>d.mes=="11").length
    let hours_palermo = total_palermo.filter(d=>d.mes=="11").map(d=>d.hora)
    let hours_count_palermo = hours_palermo.reduce((acc, curr) => {
        acc[curr] ? acc[curr]++ : acc[curr] = 1;
        return acc;
        }, {});
    let hours_count_array_palermo = Object.entries(hours_count_palermo)

    let hours_percentage_palermo = hours_count_array_palermo.map(d=> {
        return [d[0], d[1]/pal_dic]
    })

    hours_percentage_palermo.forEach(d=> {
        d[0] = +d[0]
        d[1] = d[1]*100
    })
    
    console.log(hours_percentage_palermo)
//-------------------------------------------------------------------------------------------
   

    let chart = Plot.plot({
      grid: true,
      marks: [
        Plot.dot(hours_percentage, {x: d=>d[0], y: d=>d[1], stroke:  "#FFA726", fill:  "#FFA726"}),
        Plot.line(hours_percentage, {x: d=>d[0], y: d=>d[1], stroke:  "#FFA726"}),
        Plot.dot(hours_percentage_palermo, {x: d=>d[0], y: d=>d[1], stroke: '#c7302f', fill: '#c7302f'}),
        Plot.line(hours_percentage_palermo, {x: d=>d[0], y: d=>d[1], stroke: '#c7302f'}),
      ],
      
     
      y:{
        grid:true,
        label: "procentaje denuncias x hora",
        tickFormat: d => d + "%",
        labelOffset : 30,
        domain: [0,14],
      },                 
      x:{
        label: "Horas",
        labelAnchor: "right",
        tickLabelAnchor: "start",
        labelOffset : 40
      },
      marginLeft: 100,
      marginBottom: 50,
      // height: 700,
      width: 800,
      style:{
        fontFamily: "Courier new",
        fontSize: 12,
      },
    });

     d3.select(id).append(() => chart)
  })
}
