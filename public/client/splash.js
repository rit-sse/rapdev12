
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

/*
 * Returns a random subtitle to display
 */
function getRandomSubTitle() {
    return subtitles[Math.floor(Math.random() * subtitles.length)];
}

/** 
* This is the contructor and manager for the Splash screen.
* It 
* @param stage The stage to use to draw the splash screen on
* @param onkill A callback function to be called when the splash is removed using its Kill function.
* @see Splash.Kill,Splash.SetPercent,Splash.Disperse
*/
var Splash = function Splash(stage,onkill) {
    console.log("I can do this");
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
    * REMOVED, JUST Disperse
    * @param per a number between 0 and 1 indicating the percent loaded
    * @see Splash.Disperse
    */
    this.SetPercent = function SetPercent(per) {
        /*if (lexical.loader && lexical.loader.ready) {
            lexical.loader.setAdjustedWidth(per);
            if (per>=1) {
                lexical.Disperse();
            }
        }*/
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
            text: getRandomSubTitle(),
            fontSize: lineSize,
            fontFamily: 'Calibri',
            textFill: '#11aadd',
            align: 'center'
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
        
        logoGroup.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });
        logoGroup.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });
        //Make the subtitle change when the logo is clicked
        logoGroup.on('mousedown', function() {
            subtext.setText(getRandomSubTitle());
        });
        
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
        loadingBarFG.setCornerRadius(lineSize/8);
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
            opacity: 0.6,
            fill: {
                start: {
                    x: stage.getWidth() / 2 + imgWidth/2 + lineSize,
                    y: lineSize/2,
                    radius: lineSize*10
                },
                end: {
                    x: stage.getWidth() / 2 + imgWidth/2 + lineSize,
                    y: 0,
                    radius: 0
                },
                colorStops: [0, '#ffffff', 1, 'transparent']
            }
        });
        loadingBarBG.setCornerRadius(lineSize/8);
        
        var loadingBarUnder = new Kinetic.Rect({
            height: lineSize-(lineSize/4),
            width: imgWidth,
            x: stage.getWidth() / 2 - imgWidth/2,
            y: stage.getHeight() / 2 + imgHeight/2 + (lineSize/8),
            fill: {
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: imgWidth,
                    y: 0
                },
                colorStops: [0, 'transparent', 0.15, '#004466', 0.85, '#004466', 1, 'transparent']
            }
        });
        //loadingBarUnder.setCornerRadius((lineSize-(lineSize/4))/2);
        var dotcol = ['#006699','#99ddff','004466','#ffffff'];
        var loading = [];
        for (var i=0; i<5; i++) {
            loading[i] = new Kinetic.Circle({
                radius: 3*(lineSize/8),
                x: stage.getWidth() / 2 - imgWidth/2 + (lineSize/8),
                y: stage.getHeight() / 2 + imgHeight/2 + (lineSize/2),
                fill: '#006699'
            });
            loading[i].setShadow({
                color: '#000000',
                blur: 0.8,
                offset: [-1,0],
                opacity: 0.8
            });
            loading[i].setCornerRadius((lineSize-(lineSize/4))/2);
            var inc = 1;
            loading[i].on('mousedown', function() {
                this.setFill(dotcol[inc]);
                inc++;
                if (inc>4) {
                    inc=0;
                }
            });
        }

        var loadingBar = new Kinetic.Group();
        loadingBar.add(loadingBarBG);
        loadingBar.add(loadingBarFG);
        loadingBar.add(loadingBarUnder);
        for (var i=0; i<(loading.length); i++) {
            loadingBar.add(loading[i]);
        }
        
        splash.loader = loading;
        splash.loader.ready = true;
        
        //Animates the gradient in the background of the loading bar AND the motion of the bar itself
        var amp1 = lineSize;
        var amp2 = lineSize*2;
        var period1 = 2500; //in ms
        var period2 = 4750;
        var movePeriod = 5750;
        var maxX = lineSize+(imgWidth-(lineSize/4)-lineSize);
        var maxW = maxX-(stage.getWidth() / 2 - imgWidth/2 + (lineSize/8));
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
            
            for (var orb=0; orb<(loading.length); orb++) {
                var cycle = (Math.tan((frame.time + (orb*100)) * 2 * Math.PI / movePeriod)+1)/2;
                loading[orb].setX(stage.getWidth() / 2 - imgWidth/2 + (lineSize/8) + maxX*cycle + orb*lineSize); 
            }     
        },splash.layers.loader);
        lexical.loadAnimCircles = gradientFlare;
        
        gradientFlare.start();
        
        splash.layers.loader.add(loadingBar);
        
        splash.stage.add(splash.layers.bg);
        splash.stage.add(splash.layers.logo);
        splash.stage.add(splash.layers.loader);
    };
    
    /** 
    * This transitions the splashscreen into full transparency and off the screen.
    * @param duration time (in seconds) to send dispersing
    * @see Splash.Kill
    */
    this.Disperse = function Disperse(duration) {
        if (!lexical.dispersed) {
            lexical.dispersed = true;
            lexical.logoAnim.stop();
            lexical.loadAnimCircles.stop();
            lexical.layers.logo.transitionTo({
                y: -lexical.stage.getHeight(),
                opacity: 0,
                duration: duration
            });
            lexical.cbtrans = lexical.layers.bg.transitionTo({
                opacity: 0,
                duration: duration,
                callback: function() {lexical.Kill()}
            });
            lexical.layers.loader.transitionTo({
                y: lexical.stage.getHeight()*(3/2),
                opacity: 0,
                duration: duration
            });
        }
    }
}