export const states ={
    IDLE: 0,
    READYRUN: 1,
    RUN: 2,
    FINISHRUN: 3,
    JUMP: 4,
    FALL: 5
}

export class State{
    constructor(state){
        this.state = state;
    }
}

export class IDLE extends State{
    constructor(user){
        super('IDLE');
        this.user = user;
    }
    enter(){
        this.user.frameY =0;
        this.user.frameX = 0;
        this.user.maxFrame = 21;
    }
    handleInput(input){
        if(input.includes('ArrowRight') || input.includes('d')) {
            this.user.setstate(states.READYRUN);
        }
        else if(input.includes('ArrowLeft') || input.includes('a')) {
            this.user.setstate(states.READYRUN);
        }
        else if(input.includes('ArrowUp') || input.includes('w')) {
            this.user.setstate(states.JUMP);
        }
    }
}

export class READYRUN extends State{
    constructor(user){
        super('READYRUN');
        this.user = user;
    }
    enter(){
        this.user.frameY = 1;
        this.user.frameX = 0;
        this.user.maxFrame = 11;
    }
    handleInput(input){
        if(input.includes('ArrowUp') || input.includes('w')) {
            this.user.setstate(states.JUMP);
        }
        else if(this.user.frameX >= this.user.maxFrame - 1){
            this.user.setstate(states.RUN);
        }
    }
}

export class RUN extends State{
    constructor(user){
        super('RUN');
        this.user = user;
    }
    enter(){
        this.user.frameY = 2;
        this.user.frameX = 0;
        this.user.maxFrame = 25;
    }
    handleInput(input){
        if(input.includes('ArrowUp') || input.includes('w')) {
            this.user.setstate(states.JUMP);
        }
        else if(this.user.speed === 0){
            this.user.setstate(states.FINISHRUN);
        }
    }
}

export class FINISHRUN extends State{
    constructor(user){
        super('FINISHRUN');
        this.user = user;
    }
    enter(){
        this.user.frameY = 3;
        this.user.frameX = 0;
        this.user.maxFrame = 11;
    }
    handleInput(input){
        if(input.includes('ArrowUp') || input.includes('w')) {
            this.user.setstate(states.JUMP);
        }
        else if(this.user.speed === 0 && this.user.frameX >= this.user.maxFrame - 1){
            this.user.setstate(states.IDLE);
        }
    }
}

export class JUMP extends State{
    constructor(user){
        super('JUMP');
        this.user = user;
    }
    enter(){
        this.user.frameY = 4;
        this.user.frameX = 0;
        this.user.maxFrame = 11;
        if(this.user.OnGround()){ 
            this.user.vy-= 30;
        }
    }
    handleInput(input){
        if(this.user.OnGround()){
            this.user.setstate(states.FALL);
        }
    }
}
export class FALL extends State{
    constructor(user){
        super('FALL');
        this.user = user;
    }
    enter(){
        this.user.frameY = 5;
        this.user.frameX = 0;
        this.user.maxFrame = 11;
    }
    handleInput(input){
        if(this.user.OnGround()&& this.user.frameX >= this.user.maxFrame - 1){
            if(this.user.speed > 0){
                this.user.setstate(states.RUN);
            }
            else{
                this.user.setstate(states.IDLE);
            }
        }
    }
}
