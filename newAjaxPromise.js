let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date =new Date();
    return date.getHours()+ " Hrs: " + date.getMinutes() +" Mins: " + date.getSeconds()+ " Secs";
}

function makePromiseCall(methodType,url,async =true,data=null){
    return new Promise(function (resolve,reject){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            console.log(methodType+" State change called. Ready State: "+
                  xhr.readyState+" Status: " + xhr.status);
        if(xhr.status.toString().match('^[2][0-9]{2}$')){
            resolve(xhr.responseText);
        } else if(xhr.status.toString().match('^[4,5][0-9]{2}$')){
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
            console.log("Handle 400 Client Error or 500 Server at: " + showTime());
        }
    }
    xhr.open(methodType,url,async);
    if(data){
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    }else xhr.send();
    console.log(methodType+" request send to the server at :" + showTime());
});
}

const getURL ="http://localhost:3000/employees/1";
makePromiseCall("GET",getURL, true)
      .then(responseText =>  {
          console.log("Get User Data: " + responseText)
      })
      .catch(error => console.log("GET Error Status: " +
                           JSON.stringify(error)));


const deleteURL = "http://localhost:3000/employees/4";
makePromiseCall("DELETE",deleteURL,false)
        .then(responseText =>{
            console.log("User Dleted: " + responseText)
        })
        .catch(error => console.log("DELETE Error Status: " +
                                    JSON.stringify(error)));

const postURL = "http://localhost:3000/employees";
const empData ={"name": "Vicky","salary": "8000"};
makePromiseCall("POST",postURL,true,empData)
           .then(responseText =>{
               console.log("User Added: " + responseText)
           })
           .catch(error => console.log("POST Error Status: "+
                                JSON.stringify(error)));