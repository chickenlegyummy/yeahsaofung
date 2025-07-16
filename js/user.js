import { IDLE , READYRUN , RUN , FINISHRUN , JUMP , FALL } from './userstate.js';

let idle_img =["img/user/00_idle/0.png","img/user/00_idle/1.png","img/user/00_idle/2.png","img/user/00_idle/3.png","img/user/00_idle/4.png","img/user/00_idle/5.png","img/user/00_idle/6.png","img/user/00_idle/7.png","img/user/00_idle/8.png","img/user/00_idle/9.png"
,"img/user/00_idle/10.png","img/user/00_idle/11.png","img/user/00_idle/12.png","img/user/00_idle/13.png","img/user/00_idle/14.png","img/user/00_idle/15.png","img/user/00_idle/16.png","img/user/00_idle/17.png","img/user/00_idle/18.png","img/user/00_idle/19.png"
,"img/user/00_idle/20.png"];
let runready =["img/user/01_run_00ready/skeleton-01_run_00ready_00.png","img/user/01_run_00ready/skeleton-01_run_00ready_01.png","img/user/01_run_00ready/skeleton-01_run_00ready_02.png","img/user/01_run_00ready/skeleton-01_run_00ready_03.png","img/user/01_run_00ready/skeleton-01_run_00ready_04.png","img/user/01_run_00ready/skeleton-01_run_00ready_05.png"
,"img/user/01_run_00ready/skeleton-01_run_00ready_06.png","img/user/01_run_00ready/skeleton-01_run_00ready_07.png","img/user/01_run_00ready/skeleton-01_run_00ready_08.png","img/user/01_run_00ready/skeleton-01_run_00ready_09.png","img/user/01_run_00ready/skeleton-01_run_00ready_10.png"];
let runstart =["img/user/01_run_01start/skeleton-01_run_01start_00.png","img/user/01_run_01start/skeleton-01_run_01start_01.png","img/user/01_run_01start/skeleton-01_run_01start_02.png","img/user/01_run_01start/skeleton-01_run_01start_03.png","img/user/01_run_01start/skeleton-01_run_01start_04.png","img/user/01_run_01start/skeleton-01_run_01start_05.png"
,"img/user/01_run_01start/skeleton-01_run_01start_06.png","img/user/01_run_01start/skeleton-01_run_01start_07.png","img/user/01_run_01start/skeleton-01_run_01start_08.png","img/user/01_run_01start/skeleton-01_run_01start_09.png","img/user/01_run_01start/skeleton-01_run_01start_10.png","img/user/01_run_01start/skeleton-01_run_01start_11.png","img/user/01_run_01start/skeleton-01_run_01start_12.png","img/user/01_run_01start/skeleton-01_run_01start_13.png","img/user/01_run_01start/skeleton-01_run_01start_14.png","img/user/01_run_01start/skeleton-01_run_01start_15.png"
,"img/user/01_run_01start/skeleton-01_run_01start_16.png","img/user/01_run_01start/skeleton-01_run_01start_17.png","img/user/01_run_01start/skeleton-01_run_01start_18.png","img/user/01_run_01start/skeleton-01_run_01start_19.png","img/user/01_run_01start/skeleton-01_run_01start_20.png"
,"img/user/01_run_01start/skeleton-01_run_01start_21.png","img/user/01_run_01start/skeleton-01_run_01start_22.png","img/user/01_run_01start/skeleton-01_run_01start_23.png","img/user/01_run_01start/skeleton-01_run_01start_24.png"];
let runfinish =["img/user/01_run_02finish/skeleton-01_run_02finish_00.png","img/user/01_run_02finish/skeleton-01_run_02finish_01.png","img/user/01_run_02finish/skeleton-01_run_02finish_02.png","img/user/01_run_02finish/skeleton-01_run_02finish_03.png","img/user/01_run_02finish/skeleton-01_run_02finish_04.png","img/user/01_run_02finish/skeleton-01_run_02finish_05.png"
,"img/user/01_run_02finish/skeleton-01_run_02finish_06.png","img/user/01_run_02finish/skeleton-01_run_02finish_07.png","img/user/01_run_02finish/skeleton-01_run_02finish_08.png","img/user/01_run_02finish/skeleton-01_run_02finish_09.png","img/user/01_run_02finish/skeleton-01_run_02finish_10.png"];
let jump_img =["img/user/02_jump_01start/skeleton-02_jump_01start_00.png","img/user/02_jump_01start/skeleton-02_jump_01start_01.png","img/user/02_jump_01start/skeleton-02_jump_01start_02.png","img/user/02_jump_01start/skeleton-02_jump_01start_03.png","img/user/02_jump_01start/skeleton-02_jump_01start_04.png","img/user/02_jump_01start/skeleton-02_jump_01start_05.png"
,"img/user/02_jump_01start/skeleton-02_jump_01start_06.png","img/user/02_jump_01start/skeleton-02_jump_01start_07.png","img/user/02_jump_01start/skeleton-02_jump_01start_08.png","img/user/02_jump_01start/skeleton-02_jump_01start_09.png","img/user/02_jump_01start/skeleton-02_jump_01start_10.png"];
let fall_img =["img/user/02_jump_02finish/skeleton-02_jump_02finish_00.png","img/user/02_jump_02finish/skeleton-02_jump_02finish_01.png","img/user/02_jump_02finish/skeleton-02_jump_02finish_02.png","img/user/02_jump_02finish/skeleton-02_jump_02finish_03.png","img/user/02_jump_02finish/skeleton-02_jump_02finish_04.png","img/user/02_jump_02finish/skeleton-02_jump_02finish_05.png"
,"img/user/02_jump_02finish/skeleton-02_jump_02finish_06.png","img/user/02_jump_02finish/skeleton-02_jump_02finish_07.png","img/user/02_jump_02finish/skeleton-02_jump_02finish_08.png","img/user/02_jump_02finish/skeleton-02_jump_02finish_09.png","img/user/02_jump_02finish/skeleton-02_jump_02finish_10.png"];

let u_states = [ idle_img, runready, runstart, runfinish, jump_img, fall_img ];

export class user{
    constructor(game){
        this.game = game;
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
        
        if (!this.facingRight) {
            context.scale(-1, 1);
            context.drawImage(this.image, -this.x - this.width, this.y, this.width, this.height);
        } else {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        
        context.restore();
        this.image.src = u_states[this.frameY][this.frameX];
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
