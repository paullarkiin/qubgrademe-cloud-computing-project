
let date, upTime, severStatus, whichService

async function fetchTotalService() {

  const t0 = performance.now();

  const total = fetch(
      `http://total.40294644.qpc.hal.davecutting.uk/monitor`
    ).then((res) => res.json());

    const t1 = performance.now();

    let totalresptime = t1-t0;
    let respTimeFormatted = totalresptime
  
   let response = Promise.all([total]);
   let data = await response;
  
    date = data[0].date;
    upTime = data[0].serverUpTime
  
    var time = secondsToTime(parseInt(upTime));
  
    serverStatus = data[0].serverHealth
    serverStatus.toUpperCase();
    whichService = "Total"
  
    postData(date, whichService, respTimeFormatted, time, serverStatus);
 
}

async function fetchMeanService() {

  const t0 = performance.now();
  const mean = fetch(
    `http://mean.40294644.qpc.hal.davecutting.uk/monitor`
  ).then((res) => res.json());
  const t1 = performance.now();

  let totalresptime = t1-t0;
  let respTimeFormatted = totalresptime


 let response = Promise.all([mean]);
 let data = await response;

  date = data[0].date;
  upTime = data[0].serverUpTime

  var time = secondsToTime(parseInt(upTime));

  serverStatus = data[0].serverHealth
  whichService = "Mean"

  postData(date, whichService, respTimeFormatted, time, serverStatus);
}

async function fetchAverageService() {

  const t0 = performance.now();
  const average = fetch(
    `http://average.40294644.qpc.hal.davecutting.uk/monitor`
  ).then((res) => res.json());

  const t1 = performance.now();

  let totalresptime = t1-t0;
  let respTimeFormatted = totalresptime

 let response = Promise.all([average]);
 let data = await response;

  date = data[0].date;
  upTime = data[0].uptime

  var time = secondsToTime(parseInt(upTime));

  serverStatus = data[0]['server-health']
  whichService = "Average"

  postData(date, whichService, respTimeFormatted, time, serverStatus);
}

async function fetchClassifyService() {

  const t0 = performance.now();
  const classify = fetch(
    `http://classify.40294644.qpc.hal.davecutting.uk/monitor`
  ).then((res) => res.json());

  const t1 = performance.now();

  let totalresptime = t1-t0;
  let respTimeFormatted = totalresptime

 let response = Promise.all([classify]);
 let data = await response;

  date = data[0].date;
  upTime = data[0].uptime

  var time = secondsToTime(parseInt(upTime));
  console.log(time);

  serverStatus = data[0]['serverHealth']
  whichService = "Classify"

  postData(date, whichService, respTimeFormatted, time, serverStatus);
}


async function fetchSortService() {

  const t0 = performance.now();
  const sort = fetch(
    `http://sort.40294644.qpc.hal.davecutting.uk/monitor.php`
  ).then((res) => res.json());

  const t1 = performance.now();

  let totalresptime = t1-t0;
  let respTimeFormatted = totalresptime

 let response = Promise.all([sort]);
 let data = await response;

  date = data[0].date;
  upTime = data[0].uptime

  var time = secondsToTime(parseInt(upTime));
  console.log(time);

  serverStatus = data[0]['message'].toUpperCase();
  whichService = "Sort"

  postData(date, whichService, respTimeFormatted, time, serverStatus);
}


async function fetchMaxMinService() {

  const t0 = performance.now();
  const maxmin = fetch(
    `http://maxmin.40294644.qpc.hal.davecutting.uk/monitor.php`
  ).then((res) => res.json());

  const t1 = performance.now();

  let totalresptime = t1-t0;
  let respTimeFormatted = totalresptime
  console.log(totalresptime);
  console.log(respTimeFormatted);

 let response = Promise.all([maxmin]);
 let data = await response;

  date = data[0].date;
  upTime = data[0].uptime

  var time = secondsToTime(parseInt(upTime));

  serverStatus = data[0]['ServerHealth'].toUpperCase();

  whichService = "Maxmin"

  postData(date, whichService, respTimeFormatted, time, serverStatus);

}

async function postData(date, whichService, respTimeFormatted, upTime, serverStatus) {
  const data = {date, whichService, respTimeFormatted, upTime, serverStatus };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch("/api", options);
  const json = await response.json();
}

async function getTableData() {
  const tableBody = document.getElementById('servicesInfo');
  const response = await fetch("/api");
  const data = await response.json();

  for (item of data) {

    var timestamp = new Date(item.timestamp).toLocaleString();
  
    var row  =`<tr>
                    <td>${timestamp}</td>
                    <td>${item.whichService}</td>
                    <td>${item.respTimeFormatted}</td>
                    <td>${item.upTime}</td>
                    <td>${item.serverStatus}</td>
              </tr>`
   tableBody.innerHTML +=row
  }
}

function secondsToTime(e){
  const h = Math.floor(e / 3600).toString().padStart(2,'0'),
        m = Math.floor(e % 3600 / 60).toString().padStart(2,'0'),
        s = Math.floor(e % 60).toString().padStart(2,'0');
  
  return h + ':' + m + ':' + s;
}


fetchTotalService();
fetchMaxMinService();
fetchSortService();
fetchClassifyService();
fetchAverageService();

getTableData();

// run every hour
setInterval(() => {

  fetchTotalService();
  fetchMaxMinService();
  fetchSortService();
  fetchClassifyService();
  fetchAverageService();

  getTableData();

}, 60 * 60 * 1000);




