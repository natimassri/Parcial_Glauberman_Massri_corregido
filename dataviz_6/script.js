function plotBar_6(path, id){
    d3.dsv(";", path , d3.autoType).then((data) => {
      console.log(data)
      // Guardamos el svg generado en la variable chart

      let chart = Plot.plot({
        grid: true,
        marks: [
          Plot.barY(data.filter(d=> d.domicilio_barrio=="PALERMO"), 
          Plot.groupX({y: "sum"}, {x: "canal", fill:'#c7302f', opacity: 0.15})),
          
          Plot.barY(data.filter(d=> d.domicilio_barrio=="PALERMO"), 
          Plot.groupX({y: "sum"}, {x: "canal", fill : d => d.estado != "0" ? "#c7302f" : 'transparent'})),
        ],

        y:{
          grid:true,
          label: "Cantidad denuncias",
          labelOffset : 30
        },                 
        x:{
          label: "Canales",
          labelAnchor: "right",
          tickLabelAnchor: "start",
          labelOffset : 40
        },
        marginLeft: 100,
        // marginRight: 100,
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