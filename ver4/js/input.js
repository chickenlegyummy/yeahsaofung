export class InputHandler {
    constructor() {
        this.keys = [];
        this.init();
    }

    init() {
        window.addEventListener('keydown', (e) => {
            if ((e.key==='ArrowUp' || e.key==='ArrowLeft' || e.key==='ArrowRight' || e.key==='w' || e.key==='a' || e.key==='d' || e.key===' ') && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
        });

        window.addEventListener('keyup', (e) => {
            if( e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'w' || e.key === 'a' || e.key === 'd' || e.key === ' ') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });

    }
}