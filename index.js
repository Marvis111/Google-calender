(function(){
    createDaysTiles();
    dispatchDays(getMonthData(2,2022));

})()


function dispatchDays(days){
    var weekDays = [{id:0,day:'Sun'},{id:1,day:"Mon"},{id:2,day:'Tue'},
    {id:3,day:"Wed"},{id:4,day:"Thur"},{id:5,day:'Fri'},{id:6,day:"Sat"}
]
weekDays.forEach(wkdays=>{
    var similarDays = document.querySelectorAll('.'+wkdays.day)
    days.forEach(day =>{
        similarDays.forEach(sday =>{
            if (sday.classList.contains(day.day)) {
                sday.innerHTML = day.dayNo
            }
        })
    })
})
}

function getMonthData(monthId,year){
    const month = monthByIndex(monthId)
    for (let i = 0; i < FetchYearData(year).length; i++) {
        for(let m in FetchYearData(year)[i]){
            if (m === month) {
                console.log(FetchYearData(year)[i])
                return FetchYearData(year)[i][month]
                break
            }
        }
        
    }
}
//working 3
function FetchYearData(year){
    var months = ['January','February','March',
    'April','May','June','July','August',
    'September','October','November','December'];
    var monthandDays = [];
    for (let i = 0; i < months.length; i++) {
        monthandDays.push({
        [months[i]]:fetchDays(i+1,year)
        })
    }
    return monthandDays
}
function fetchDays(monthId,year){
    var thirtyDays = ['September','April','June','November'];
    var Days;
    var month = monthByIndex(monthId)
    //february
       if (month === 'February'){
        if (year%2== 0) {
          Days = range(28,monthId,year);
        }else{
          Days = range(29,monthId,year);
        }
       }else{
       for(m in thirtyDays){
        if (thirtyDays[m] === month) {
          Days = range(30,monthId,year);
          break
        }else{
          Days = range(31,monthId,year);
        }
       }
     }
       return Days;
  }
  //working 1
  //index from 1,2 3,..
  function monthByIndex(index){
    var months = ['January','February','March','April','May',
    'June','July','August','September','October','November','December'];
    var month;
    for (let i = 0; i < months.length; i++) {
      if (index == i) {
        month = months[index - 1];
      }
    }
      return month;
  }
  //
  function fetchDayOfTheWeek(dayIndex){
    var weekDays = [{id:0,day:'Sun'},{id:1,day:"Mon"},{id:2,day:'Tue'},
    {id:3,day:"Wed"},{id:4,day:"Thur"},{id:5,day:'Fri'},{id:6,day:"Sat"}
]   
let dayOfTheWeek = ""
        for (let i = 0; i < weekDays.length; i++) {
            if (weekDays[i].id === dayIndex) {
                dayOfTheWeek = weekDays[i].day
                break
            }
            
        }
        return dayOfTheWeek;
  }
  //2
function range(start,monthId,year){
    var arr = [];
      for(var i =1;i <= start;i++){
        var today = new Date(year,monthId - 1,i)
        arr.push({
            dayNo:i,day:fetchDayOfTheWeek(today.getDay())
        });
      }
    return arr;
  }
  function createDaysTiles(){
    var noOfDaysTiles = 0,
    reqNoOfDaysTile = 35,
     tableBody = document.querySelector('#side-cal-tbody');
     let outPut='';
    while (noOfDaysTiles < reqNoOfDaysTile) {
        outPut  += `
       <tr class='days-tiles'>
       <td class='Sun dotm'>1</td>
       <td class='Mon dotm'>2</td>
       <td class='Tue dotm'>3</td>
       <td class='Wed dotm'>1</td>
       <td class='Thur dotm'>1</td>
       <td class='Fri dotm'>1</td>
       <td class='Sat dotm'>1</td>
   </tr>
       `;
        noOfDaysTiles += 7;
    }
    tableBody.innerHTML = outPut
}
