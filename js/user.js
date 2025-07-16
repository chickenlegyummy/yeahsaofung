import { IDLE , READYRUN , RUN , FINISHRUN , JUMP , FALL } from './userstate.js';

// Get preloaded images from HTML
function getPreloadedImages() {
    const idle_img = [];
    const runready = [];
    const runstart = [];
    const runfinish = [];
    const jump_img = [];
    const fall_img = [];
    
    // Idle images (21 frames: 0-20)
    for (let i = 0; i <= 20; i++) {
        idle_img.push(document.getElementById(`idle_${i}`));
    }
    
    // Run ready images (11 frames: 0-10)
    for (let i = 0; i <= 10; i++) {
        runready.push(document.getElementById(`runready_${i}`));
    }
    
    // Run start images (25 frames: 0-24)
    for (let i = 0; i <= 24; i++) {
        runstart.push(document.getElementById(`runstart_${i}`));
    }
    
    // Run finish images (11 frames: 0-10)
    for (let i = 0; i <= 10; i++) {
        runfinish.push(document.getElementById(`runfinish_${i}`));
    }
    
    // Jump images (11 frames: 0-10)
    for (let i = 0; i <= 10; i++) {
        jump_img.push(document.getElementById(`jump_${i}`));
    }
    
    // Fall images (11 frames: 0-10)
    for (let i = 0; i <= 10; i++) {
        fall_img.push(document.getElementById(`fall_${i}`));
    }
    
    return [idle_img, runready, runstart, runfinish, jump_img, fall_img];
}

let u_states;

export class user{
    constructor(game){
        this.game = game;
        
        // Initialize u_states from preloaded HTML images
        u_states = getPreloadedImages();
        
        this.originalWidth = 300;
        this.originalHeight = 273;
        this.relativeWidth = this.originalWidth / game.width;
        this.relativeHeight = this.originalHeight / game.height;
        
        this.width = this.originalWidth;
        this.height = this.originalHeight;
        this.x= 0;
        this.y = this.game.height - this.height;
        this.image = document.getElementById('user');
        this.frameX = 0; 
        this.frameY = 0; 
        this.maxFrame = 11;
        this.states = [new IDLE(this), new READYRUN(this), new RUN(this), new FINISHRUN(this), new JUMP(this), new FALL(this),];
        this.currentState = this.states[0];
        this.currentState.enter();
        this.vy = 0;
        this.gravity = 1;
        this.speed = 0;
        this.maxspeed = 10;
        this.fps =60;
        this.frameInterval = 1000 / this.fps; 
        this.frameTimer = 0;
        this.facingRight = true;
    }
    update(input, deltaTime){
        this.currentState.handleInput(input);
        const userCenterX = this.x + this.width / 2;

        if(input.includes('ArrowRight') || input.includes('d')) {
            this.speed = (this.speed + 0.5 > this.maxspeed) ? this.maxspeed : this.speed + 0.5;
            if(this.game.currentPage ==="right"){
                this.x = (userCenterX >= this.game.width) ? this.x : this.x + this.speed;
            }
            else{this.x += this.speed;}
            this.facingRight = true;
        }
        else if(input.includes('ArrowLeft') || input.includes('a')) {
            this.speed = (this.speed + 0.5 > this.maxspeed) ? this.maxspeed : this.speed + 0.5;
            if(this.game.currentPage ==="left"){
                this.x = (userCenterX <= 0) ? this.x : this.x - this.speed;
            }
            else{this.x -= this.speed;}
            this.facingRight = false;
        }
        else{
            this.speed = (this.speed - 0.5 < 0) ? 0 : this.speed - 0.5;
        }

        this.y += this.vy;
        if(!this.OnGround()){
            this.vy += this.gravity;
        }
        else{
            this.vy = 0;
        }

        this.frameTimer += deltaTime;
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame - 1){
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        }
    }

    draw(context){ 
        context.save();

        // Get the current frame image from preloaded DOM elements
        const currentImage = u_states[this.frameY] && u_states[this.frameY][this.frameX] 
            ? u_states[this.frameY][this.frameX] 
            : this.image;

        if (!this.facingRight) {
            context.scale(-1, 1);
            context.drawImage(currentImage, -this.x - this.width, this.y, this.width, this.height);
        } else {
            context.drawImage(currentImage, this.x, this.y, this.width, this.height);
        }
        
        context.restore();
    }
    
    updateSize() {
        // Update size based on current game dimensions
        this.width = this.relativeWidth * this.game.width;
        this.height = this.relativeHeight * this.game.height;
        
        // Update speed proportionally to maintain consistent feel
        const baseMoveSpeed = Math.min(this.game.width, this.game.height) * 0.008; // 0.8% of smaller dimension
        this.maxspeed = Math.max(baseMoveSpeed, 5); // Minimum speed of 5
        
        // Update gravity proportionally
        this.gravity = Math.min(this.game.width, this.game.height) * 0.001; // 0.1% of smaller dimension
        
        // Adjust position if user is on ground to maintain ground contact
        if (this.OnGround()) {
            this.y = this.game.height - this.height;
        }
    }
    
    OnGround(){
        return this.y >= this.game.height - this.height;
    }
    setstate(state){
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    updatelocation(){
        this.y = (this.y < 0) ? 0 : this.y;
        this.y = (this.y > this.game.height - this.height) ? this.game.height - this.height : this.y;
    }
}
