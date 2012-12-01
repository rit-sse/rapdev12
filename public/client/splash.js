
var Splash = function Splash(stage) {
    this.stage = stage;
    
    this.layers = {
        "bg" : new Kinetic.Layer(),
        "logo" : new Kinetic.Layer(),
        "loader" : new Kinetic.Layer()
    };
    
    var wid = this.stage.getWidth();
    var bgrect = new Kinetic.Rect({
        width: wid,
        height: this.stage.getHeight(),
        fill: {
            start: {
                x: wid/2,
                y: 0,
                radius: 0
            },
            end: {
                x: wid/2,
                y: 0,
                radius: 2*(wid/3)
            },
            colorStops: [0, '#99ddff', 1, '#004466']
        }
    });
    
    bg.add(bgrect);
    
    stage.add(bg);
    stage.add(logo);
    stage.add(loader);
    
    this.Kill = function Kill() {
        this.bg.remove();
        this.logo.remove();
        this.loader.remove();
    }
}