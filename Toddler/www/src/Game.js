/* jshint browser:true */
// python -m SimpleHTTPServer
// create BasicGame Class
BasicGame = {

};

// create Game function in BasicGame
BasicGame.Game = function (game) {
    
};

// set Game function prototype
BasicGame.Game.prototype = {

    init: function () {
        // set up input max pointers
        this.input.maxPointers = 1;
        // set up stage disable visibility change
        this.stage.disableVisibilityChange = true;
        // Set up the scaling method used by the ScaleManager
        // Valid values for scaleMode are:
        // * EXACT_FIT
        // * NO_SCALE
        // * SHOW_ALL
        // * RESIZE
        // See http://docs.phaser.io/Phaser.ScaleManager.html for full document
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // If you wish to align your game in the middle of the page then you can
        // set this value to true. It will place a re-calculated margin-left
        // pixel value onto the canvas element which is updated on orientation /
        // resizing events. It doesn't care about any other DOM element that may
        // be on the page, it literally just sets the margin.
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        // Force the orientation in landscape or portrait.
        // * Set first to true to force landscape. 
        // * Set second to true to force portrait.
        this.scale.forceOrientation(false, true);
        // Sets the callback that will be called when the window resize event
        // occurs, or if set the parent container changes dimensions. Use this 
        // to handle responsive game layout options. Note that the callback will
        // only be called if the ScaleManager.scaleMode is set to RESIZE.
        this.scale.setResizeCallback(this.gameResized, this);
        // Set screen size automatically based on the scaleMode. This is only
        // needed if ScaleMode is not set to RESIZE.
        this.scale.updateLayout(true);
        // Re-calculate scale mode and update screen size. This only applies if
        // ScaleMode is not set to RESIZE.
        this.scale.refresh();

    },

    preload: function () {

        // Here we load the assets required for our preloader
        this.load.image('background', 'asset/images/background.png');
        this.load.spritesheet('chicken', 'asset/images/chicken_spritesheet.png');
        this.load.spritesheet('horse', 'asset/images/horse_spritesheet.png');
        this.load.spritesheet('pig', 'asset/images/pig_spritesheet.png');
        this.load.spritesheet('sheep', 'asset/images/sheep_spritesheet.png');
        this.load.image('arrow', 'asset/images/arrow.png');
        
    },

    create: function () {
        
        //background
        this.background = this.add.sprite(0,0,'background');
        this.background.scale.setTo(1,2);
        
        //left arrow
        this.leftArrow = this.add.sprite(60, this.world.centerY, 'arrow');
        this.leftArrow.anchor.setTo(0.5);
        this.leftArrow.scale.x = -1;
        this.leftArrow.customParams = {direction: -1};
        
        //left arrow user input
        this.leftArrow.inputEnabled = true;
        this.leftArrow.input.pixelPerfectClick = true;
        this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

        //right arrow
        this.rightArrow = this.add.sprite(420, this.world.centerY, 'arrow');
        this.rightArrow.anchor.setTo(0.5);
        this.rightArrow.customParams = {direction: 1};

        //right arrow user input
        this.rightArrow.inputEnabled = true;
        this.rightArrow.input.pixelPerfectClick = true;
        this.rightArrow.events.onInputDown.add(this.switchAnimal, this);
        
        var dataAnimals = [
            {key:'chicken', text:'chicken'},
            {key:'horse', text:'horse'},
            {key:'pig', text:'pig'},
            {key:'sheep', text:'sheep'},
        ];
        
        this.animals = this.add.group();
        
        var self = this;
        var animal;
        
        dataAnimals.forEach(function(element){
            //create each animal and save it's properties
            animal = self.animals.create(-1000, self.world.centerY, element.key, 0);
            
            //anchor point set to the center of the sprite
            animal.anchor.setTo(0.5);
            
            //enable input so we can touch it
            animal.inputEnabled = true;
            animal.input.pixelPerfectClick = true;
            animal.events.onInputDown.add(self.animateAnimal, self);
            
            
        });
        
        this.currentAnimal = this.animals.next();
        
        this.currentAnimal.position.set(this.world.centerX,this.world.centerY);
        
    },

    gameResized: function (width, height) {

        // This could be handy if you need to do any extra processing if the 
        // game resizes. A resize could happen if for example swapping 
        // orientation on a device or resizing the browser window. Note that 
        // this callback is only really useful if you use a ScaleMode of RESIZE 
        // and place it inside your main game state.

    },
    
    switchAnimal: function (){
        console.log("this is madness!!");
    },
    
    animateAnimal: function(){
        console.log("animate animal");
    }

};