let grafico;

export const renderGraph = (datos,context) => {
  const options =     {
    type: 'line',
    data:{
      labels: datos.label,
      datasets: [{
        label: datos.name,
        data: datos.temp,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
  }
  if(grafico) {
    grafico.destroy()
  }
  grafico = new Chart(context, options,
)
}

