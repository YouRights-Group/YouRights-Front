//DATATABLE -
public data;
public filterQuery = '';

constructor(private http: Http) {
  http.get('assets/data.json')
    .subscribe((data) => {
      setTimeout(() => {
        this.data = data.json();
      }, 2000);
    });
}

public toInt(num: string) {
  return +num;
}

public sortByWordLength = (a: any) => {
  return a.name.length;
}
//DATATABLE |

// Pie -
public pieChartLabels: string[] = ['Comunidad de Madrid', 'Castilla y León', 'Andalucía'];
public pieChartData: number[] = [500, 100, 300];
public pieChartType = 'pie';
// Pie |

// Events Pie -
public chartClicked(e: any): void {
  console.log(e);
}

public chartHovered(e: any): void {
  console.log(e);
}
// Events Pie |

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Hull", "Total Armour", "Energy"],
        datasets: [{
            label: 'Value',
            data: [10000, 6000, 5000],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
          
            borderColor: [
                'rgba(255,99,132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      title: {
        display: true,
        text: 'Reaper Primary Stats',
        fontSize: 28,
      }//end of title
      
    }//end of options
});
