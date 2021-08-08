const getTime = ()=>{
    return new Date(localStorage.getItem("time"));
}
export function CheckExTime(){
    var now = new Date();
    var last = getTime()
    var temp = (now - last)/1000;
    var refreshTime = process.env.REACT_APP_REFRESH_TIME;
    console.log(temp)
    console.log(temp>=refreshTime*0.9)
    return  temp>=refreshTime*0.9
}