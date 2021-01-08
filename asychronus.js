function showTime(){
    const date =new Date();
    return date.getHours()+ "Hrs: " + date.getMinutes +"Mins" + date.getSeconds+ "Secs";
}

function showSeesionExpires(){
    console.log("Activity B expired at " +showTime());
}

console.log("Activity A step 1" + showTime());
setTimeout(showSeesionExpires,5000)
console.log("Activity A Triggered Activity B at " + showTime()+ "will excute");