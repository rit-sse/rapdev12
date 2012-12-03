
var preloadedImages = {};

function preloadImage(location,waiter) {
    if (!preloadedImages[location]) {
        preloadedImages[location] = new Image();
        preloadedImages[location].src = location;
        preloadedImages[location].waiters = [waiter];
        preloadedImages[location].onload = function() {
            this.loaded = true;
            for (var i=0;i<this.waiters.length;i++) {
                if (this.waiters[i]) {
                    this.waiters[i](this);
                }
            }
        }
    } else {
        if (preloadedImages[location].loaded) {
            if (waiter) {
                waiter(preloadedImages[location]);
            }
            return preloadedImages[location];
        } else {
            preloadedImages[location].waiters.push(waiter);
        }
    }
} 

//Preload all the images that we're using so we download them at first, inatead of when we're trying to do things.
preloadImage("/assets/images/creatures/creature-1.png");
preloadImage("/assets/images/creatures/creature-2.png");
preloadImage("/assets/images/creatures/creature-3.png");
preloadImage("/assets/images/tiles/grass.png");
preloadImage("/assets/images/tiles/rock.png");
preloadImage("/assets/images/tiles/sand.png");
preloadImage("/assets/images/tiles/water.png");
preloadImage("/assets/images/misc_animations/attack1.png");
preloadImage("/assets/images/misc_animations/death1.png");
preloadImage("/assets/images/misc_animations/effect01.png");
preloadImage("/assets/images/misc_animations/effect2.png");
preloadImage("/assets/images/misc_animations/zzz.png");