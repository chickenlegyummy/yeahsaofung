document.getElementById("hike").addEventListener("click", function() {
    $("#hike").addClass("selected");
    $("#on9").removeClass();
    $("#trip").removeClass();
    $("#uk").removeClass();
});

document.getElementById("on9").addEventListener("click", function() {
    $("#hike").removeClass();
    $("#on9").addClass("selected");
    $("#trip").removeClass();
    $("#uk").removeClass();
});

document.getElementById("trip").addEventListener("click", function() {
    $("#hike").removeClass();
    $("#on9").removeClass();
    $("#trip").addClass("selected");
    $("#uk").removeClass();
});

document.getElementById("uk").addEventListener("click", function() {
    $("#hike").removeClass();
    $("#on9").removeClass();
    $("#trip").removeClass();
    $("#uk").addClass("selected");
});

function boom(){
    var jeng = ["錯撚柒左啊 仲周唔到你個臭SPY!!!???", 
    "傻西瓜咁都錯到你係咪M先生既間諜黎架", "屌你老母葵盛西邨六座2.74死懶鬼連巴士都唔撚識答"];
    var input = document.getElementById("jeng");
    var inputVar = input.value;
    if (inputVar === "38"){
        $("p").append("<iframe width='320' height='180' src='https://www.youtube.com/embed/eSxJ7mIZE-U' title='終局之戰 決戰馬克斯 最後的軸心國' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowfullscreen></iframe>")
        $("#shoot").attr("onclick", "");
    } else{
        var poop = Math.floor(Math.random() * 3);
        alert(jeng[poop]);
    }
}