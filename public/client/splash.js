
//List of random subtitles (Add more!)
var subtitles =     ["SSE Approved!",
                    ".JS",
                    "With Friends!",
                    "In the cloud!",
                    "20% Cooler!",
                    "More Cowbell!",
                    "Funded Via IPO!",
                    "Proceeds go to\nYacht Purchases!",
                    "The Movie!",
                    "The Game!",
                    "<witty subtitle here>",
                    "In Color!",
                    "Not that bad!",
                    "It's great!",
                    "Lite Edition",
                    "Alpha",
                    "In Technicolor!",
                    "Fully Animated!",
                    "May Cause Cancer!\n(in California)",
                    "Surprisingly\nDelicious!",
                    "Splashy!",
                    "2KB of Memory!",
                    "Test first, ask\nquestions later!",
                    "Fancy!",
                    "Totally not\nMinecraft!",
                    "In Space!",
                    "Thinking with\nPortals!",
                    "A Series of Tubes!"]

/** 
* This is the contructor and manager for the Splash screen.
* It 
* @param stage The stage to use to draw the splash screen on
* @param onkill A callback function to be called when the splash is removed using its Kill function.
* @see Splash.Kill,Splash.SetPercent,Splash.Disperse
*/
var Splash = function Splash(stage,onkill) {
    this.stage = stage;
    this.onkill = onkill;
    

    var lexical = this;
    this.layers = {
        "bg" : new Kinetic.Layer(),
        "logo" : new Kinetic.Layer(),
        "loader" : new Kinetic.Layer()
    };
    
    /** 
    * Removes all traces of the splash screen from the stage.
    */
    this.Kill = function Kill() {
        lexical.layers.bg.remove();
        lexical.layers.logo.remove();
        lexical.layers.loader.remove();
        lexical.onkill();
    }
    
    /** 
    * This sets the percentage of the loadingbar, provided it's been setup, 
    * and also cleans up and disperses the splash screen when it's passed a value >=1.
    * @param per a number between 0 and 1 indicating the percent loaded
    * @see Splash.Disperse
    */
    this.SetPercent = function SetPercent(per) {
        if (lexical.loader && lexical.loader.ready) {
            lexical.loader.setAdjustedWidth(per);
            if (per>=1) {
                lexical.Disperse(function() {lexical.Kill()});
            }
        }
    }
    
    //Background gradient
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
        },
        stroke: "black"
    });
    
    this.layers.bg.add(bgrect);
    
    //logo and such onload stuff
    var ratio = 1000/947;
    var logoData = new Image();
    var lineSize = (40/600)*stage.getHeight();
    logoData.splash = this;
    logoData.src = "assets/images/biogridlogo.png";
    logoData.onload = function() {
        var logoGroup = new Kinetic.Group();

        //logo subtitle text
        var splash = this.splash;
        var imgWidth    = ratio*(stage.getHeight()*0.75);
        var imgHeight   = (stage.getHeight()*0.75);
        var subtext = new Kinetic.Text({
            x: imgWidth,
            y: imgHeight,
            text: subtitles.randomVal(),
            fontSize: lineSize,
            fontFamily: 'Calibri',
            textFill: '#11aadd',
            align: 'center',
        });
        subtext.rotate(-Math.PI/6); //Rotating the text on a 30 degree slant
    
        //logo image itself
        var logoImg = new Kinetic.Image({
            image: logoData,
            x: stage.getWidth() / 2 - imgWidth/2,
            y: stage.getHeight() / 2 - imgHeight/2,
            width: imgWidth,
            height: imgHeight
        });
        
        logoGroup.add(logoImg);
        logoGroup.add(subtext);
        
        splash.layers.logo.add(logoGroup);
        
        //configuration variables for the motion of the logo
        var amplitude = 20;
        var period = 6000; // in ms
        var centerY = stage.getHeight() / 2;
        
        /** 
        * Private function to animate the title logo, passed to Kinetic.Animation
        */
        var animFunc = function animFunc(frame) {
            var y = amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerY - imgHeight/2
            logoImg.setY(y); //This moves the logo vertically
            
            var scale = Math.sin(frame.time * 2 * Math.PI / 1000)*0.05
            
            subtext.setScale(1+scale) //This pulses the subtitle text
            subtext.setX((stage.getWidth()/2 + imgWidth/2)-(3/4)*subtext.getWidth());
            subtext.setY(y+imgHeight*(3/4)+(1/6)*subtext.getWidth()) //This and the line above it ensure that the subtitle text is always in the right place
            subtext.setShadow({ //Give the text a little glow using shadows, for some reason, only looks right when constantly updated
                color: '#99ddff',
                blur: 8,
                offset: [0.1, 0.1],
                opacity: 0.3
            });
        }
        lexical.logoAnim = new Kinetic.Animation(animFunc, splash.layers.logo);

        lexical.logoAnim.start(); //start the animation
        
        var loadingBarFG = new Kinetic.Rect({
            width: imgWidth,
            height: lineSize,
            x: stage.getWidth() / 2 - imgWidth/2,
            y: stage.getHeight() / 2 + imgHeight/2,
            opacity: 0.6,
            fill: {
                start: {
                    x: -lineSize*2,
                    y: lineSize/2,
                    radius: 0
                },
                end: {
                    x: 0,
                    y: 0,
                    radius: lineSize*10
                },
                colorStops: [0, '#ffffff', 1, 'transparent']
            }
        }); 
        loadingBarFG.setCornerRadius(lineSize/2);
        loadingBarFG.setShadow({ 
                color: '#ffffff',
                blur: 3,
                offset: [0.1, 0.1],
                opacity: 0.6
            });
        
        
        var loadingBarBG = new Kinetic.Rect({
            height: lineSize,
            width: imgWidth,
            x: stage.getWidth() / 2 - imgWidth/2,
            y: stage.getHeight() / 2 + imgHeight/2,
            fill: '#006699'
        });
        loadingBarBG.setCornerRadius(lineSize/2);
        
        var loadingBarUnder = new Kinetic.Rect({
            height: lineSize-(lineSize/4),
            width: imgWidth-(lineSize/4),
            x: stage.getWidth() / 2 - imgWidth/2 + (lineSize/8),
            y: stage.getHeight() / 2 + imgHeight/2 + (lineSize/8),
            fill: '#004466'
        });
        loadingBarUnder.setCornerRadius((lineSize-(lineSize/4))/2);
        
        var loading = new Kinetic.Rect({
            height: lineSize-(lineSize/4),
            width: lineSize,
            x: stage.getWidth() / 2 - imgWidth/2 + (lineSize/8),
            y: stage.getHeight() / 2 + imgHeight/2 + (lineSize/8),
            fill: '#006699'
        });
        loading.setShadow({
            color: '#000000',
            blur: 0.8,
            offset: [-1,0],
            opacity: 0.8
        });
        loading.setCornerRadius((lineSize-(lineSize/4))/2);
        loading.minimum = lineSize;
        
        /** 
        * Internally used function to set the width of the loading bar based on its percentage
        * @param percent A number between 0 and 1 used to determine the percentage of the bar to draw
        * @see Splash.SetPercentage
        */
        loading.setAdjustedWidth = function(percent) {
            //0 to 1 mapped to lineSize to imgWidth-(lineSize/4)
            var percent = Math.min(Math.max(percent,0),1)
            
            loading.transitionTo({
                width:lineSize+percent*(imgWidth-(lineSize/4)-lineSize),
                duration: 0.5
            });
            
            if (Math.random()>=0.2) {
                subtext.setText(subtitles.randomVal());
            }
        }
 
        var loadingBar = new Kinetic.Group();
        loadingBar.add(loadingBarBG);
        loadingBar.add(loadingBarFG);
        loadingBar.add(loadingBarUnder);
        loadingBar.add(loading);
        
        splash.loader = loading;
        splash.loader.ready = true;
        
        //Animates the gradient in the background of the loading bar
        var amp1 = lineSize;
        var amp2 = lineSize*2;
        var period1 = 2500; //in ms
        var period2 = 4750;
        var gradientFlare = new Kinetic.Animation(function(frame) {
            var start = (-lineSize*2) + amp1 * Math.sin(frame.time * 2 * Math.PI / period1) + amp2*Math.sin(frame.time * 2 * Math.PI / period2)
            
            loadingBarFG.setFill({
                start: {
                    x: start,
                    y: lineSize/2,
                    radius: 0
                },
                end: {
                    x: 0,
                    y: 0,
                    radius: lineSize*10
                },
                colorStops: [0, '#ffffff', 1, 'transparent']
            });
            
        },splash.layers.loader);
        
        gradientFlare.start();
        
        splash.layers.loader.add(loadingBar);
        
        splash.stage.add(splash.layers.bg);
        splash.stage.add(splash.layers.logo);
        splash.stage.add(splash.layers.loader);
    };
    
    /** 
    * This transitions the splashscreen into full transparency and off the screen.
    * @param callback A function to be called when the transition is finished (eg. to remove it)
    * @see Splash.Kill
    */
    this.Disperse = function Disperse(callback) {
        lexical.logoAnim.stop();
        lexical.layers.logo.transitionTo({
            y: -lexical.stage.getHeight(),
            opacity: 0,
            duration: 0.75
        });
        lexical.cbtrans = lexical.layers.bg.transitionTo({
            opacity: 0,
            duration: 0.75,
            callback: callback
        });
        lexical.layers.loader.transitionTo({
            y: lexical.stage.getHeight()*(3/2),
            opacity: 0,
            duration: 0.75
        });
    }
}