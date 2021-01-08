let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date =new Date();
    return date.getHours()+ " Hrs: " + date.getMinutes() +" Mins: " + date.getSeconds()+ " Secs";
}

function makeAJAXCall(methodType,url,callback,async =true,data=null){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        console.log(methodType+" State change called. Ready State: "+
        xhr.readyState+" Status: " + xhr.status);
        if(xhr.readyState == 4){
            if(xhr.status == 200 || xhr.status== 201){
                callback(xhr.responseText);
            } else if(xhr.status>=400){
                console.log("Handle 400 client Error or 500 Server Error");
            }
        }
    }
    xhr.open(methodType,url,async);
    if(data){
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    }else xhr.send();
    console.log(methodType+" request send to the server at :" + showTime());
}

const getURL ="http://localhost:3000/employees/1";

function getUserDetails(data){
    console.log("Get USer Data at:" + showTime() +data)
}
makeAJAXCall("GET",getURL, getUserDetails);

const deletetURL ="http://localhost:3000/employees/5";
function userDeleted(data){
    console.log("User Deleted at :"+ showTime() + data);
}

makeAJAXCall("DELETE",deletetURL,userDeleted,false);

const postURL = "http://localhost:3000/employees"
const empData ={"name": "Priya","salary": "8000"};
  
function userAdded(data){
    console.log("User Added at : " +showTime() + "data" +  data)
}

makeAJAXCall("POST",postURL,userAdded,true,empData);

