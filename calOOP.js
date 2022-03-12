class YearCalender{

    constructor(year){
        this.weekDays = [{id:0,day:'Sun'},{id:1,day:"Mon"},{id:2,day:'Tue'},
        {id:3,day:"Wed"},{id:4,day:"Thur"},{id:5,day:'Fri'},{id:6,day:"Sat"}
    ]
        this.thirtyDays = ['September','April','June','November'];
        this.year = year
        this.months = ['January','February','March',
        'April','May','June','July','August',
        'September','October','November','December'];
        this.monthByIndex = this.monthByIndex.bind(this)
    }
    monthByIndex(index){
        const {months} = this.months
        var month;
        for (let i = 0; i < months.length; i++) {
          if (index == i) {
            month = months[index - 1];
          }
        }
          return month;
      }
    range(start,monthId){
        const year = this.year
        var arr = [];
          for(var i =1;i <= start;i++){
            var today = new Date(year,monthId - 1,i)
            arr.push({
                dayNo:i,day:this.fetchDayOfTheWeek(today.getDay())
            });
          }
        return arr;
      }
    fetchDays(monthId){
        const month = this.monthByIndex(monthId)
        var Days;
        //february
           if (month === 'February'){
            if (this.year%2== 0) {
              Days = this.range(28,monthId);
            }else{
              Days = this.range(29,monthId);
            }
           }else{
           for(m in this.thirtyDays){
            if (this.thirtyDays[m] === month) {
              Days = this.range(30,monthId);
              break
            }else{
              Days = this.range(31,monthId);
            }
           }
         }
           return Days;
      }
      
     fetchDayOfTheWeek(dayIndex){
        const {weekDays} = this
    let dayOfTheWeek = ""
            for (let i = 0; i < weekDays.length; i++) {
                if (weekDays[i].id === dayIndex) {
                    dayOfTheWeek = weekDays[i].day
                    break
                }
            }
            return dayOfTheWeek;
      }
    getMonthData(monthId){ 
    }
    //working 3
    FetchYearData(){
        const {year,months,fetchDays} = this
        var monthandDays = [];
        for (let i = 0; i < months.length; i++) {
            monthandDays.push({
            [months[i]]:fetchDays(i+1,year)
            })
        }
        console.log(monthandDays)
        return monthandDays
    }
}