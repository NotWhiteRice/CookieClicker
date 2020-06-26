Objects = {};

var target = "Cursor";
var price = Game.cookies + 1;

init = function() {
    for(var i in Game.Objects) {
        var gameObj = Game.Objects[i];
        Objects[i] = {};
        Objects[i].price = gameObj.price;
        Objects[i].cps = (typeof(gameObj.cps) == 'function' ? gameObj.cps(gameObj) : gameObj.cps);
    }

    findTarget();
    var autoBuy = setInterval(buyTarget, 100);
    var autoGC = setInterval(clickGC, 500);
}

calcEff = function(name) {
    var obj = Objects[name];
    var cost = obj.price;
    var cpsGain = (typeof(obj.cps) == 'function' ?               obj.cps(obj) : obj.cps);
    var cps = Game.cookiesPs;    
    var cookiesLeft = (Game.cookies < cost ? cost - Game.cookies : 0);
    var eff = cost / cpsGain;
    var delay = (cps == 0 ? 0 : cookiesLeft / cps);
    return eff + delay;
}

findTarget = function() {

    var bestEff = calcEff(target);
    var newTarget = false;
    for(var i in Game.Objects) {
        var eff = calcEff(i);
        if(eff < bestEff) {
            bestEff = eff;
            target = i;
            price = Objects[i].price;
            newTarget = true;
        }
    }
    
    if(Game.cookiesPs == 0) {
        target = "Cursor";
        price = Game.Objects.Cursor.price;
        newTarget = false;
    }
    
    if (newTarget) { console.log(target); }
}

buyTarget = function() { 
    findTarget();
    if(Game.cookies >= price) {
        Game.Objects[target].buy();
        Objects[target].price = Game.Objects[target].price;
        Objects[target].cps = (typeof(Game.Objects[target].cps) == 'function' ? Game.Objects[target].cps(Game.Objects[target]) : Game.Objects[target].cps);
    }
}

clickGC = function() {
    Game.shimmers.forEach(function(shimmer) {
        if(shimmer.type == "golden" && shimmer.wrath == 0) {                   shimmer.pop() 
        } 
    });
}

init();
