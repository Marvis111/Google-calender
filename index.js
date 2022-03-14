(function(){
    createDaysTiles();
    const day = new Date();
   dispatchDaysOfTheMonth(day.getMonth()+1,day.getFullYear());

})();



function toMonth(direction){
    var monthId = document.getElementById('monthId').innerHTML;
        monthId = parseInt(monthId)
    direction === 'prev' ? monthId -=1 : monthId +=1
    dispatchDaysOfTheMonth(monthId,2022)
}
function dispatchDaysOfTheMonth(monthId,year){
    setMonthAndYear(monthId,year,'year','month')
             initializeTiles();
    var monthData = getMonthData(monthId,year);
    var dotm = document.querySelectorAll('.dotm');
    var startDayIndex;
        for (let startDay = 0; startDay < dotm.length; startDay++) {
           if ( dotm[startDay].classList.contains(monthData[0].day)) {
               startDayIndex = startDay;
               break
           }
        }
        for (let i = 0; i < monthData.length; i++) {
               if ((i + startDayIndex) >= 35) {
                dotm[i + startDayIndex - 35].innerHTML = monthData[i].dayNo
               }else{
                dotm[i + startDayIndex].innerHTML = monthData[i].dayNo
               }

        }
}
function getMonthData(monthId,year){
    const month = monthByIndex(monthId)
    for (let i = 0; i < FetchYearData(year).length; i++) {
        for(let m in FetchYearData(year)[i]){
            if (m === month) {
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
  //index from 1,2 3,..
  function monthByIndex(index){
    var months = ['January','February','March','April','May',
    'June','July','August','September','October','November','December'];
    var month;
    for (let i = 0; i < months.length; i++) {
      if (index == i + 1) {
        month = months[i];
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
       <td class='Sun dotm'></td>
       <td class='Mon dotm'></td>
       <td class='Tue dotm'></td>
       <td class='Wed dotm'></td>
       <td class='Thur dotm'></td>
       <td class='Fri dotm'></td>
       <td class='Sat dotm'></td>
   </tr>
       `;
        noOfDaysTiles += 7;
    }
    tableBody.innerHTML = outPut
}

function setMonthAndYear(monthId,year,yearPosId,monthPos){
    const month = monthByIndex(monthId);
    document.getElementById(yearPosId).innerHTML = year;
    document.getElementById(monthPos).innerHTML = month;
    document.getElementById('monthId').innerHTML = monthId;

}
function initializeTiles(){
    var tiles = document.querySelectorAll('.dotm');
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].innerHTML = '';
    }
}