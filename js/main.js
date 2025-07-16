import { user } from './user.js';
import { InputHandler } from './input.js';
import { NPC } from './npc.js';

class ScrambledText {
    constructor(element, options = {}) {
        this.element = element;
        this.originalText = element.textContent;
        this.radius = options.radius || 100;
        this.duration = options.duration || 800;
        this.speed = options.speed || 100;
        this.scrambleChars = options.scrambleChars || ".:#@$%&*";
        this.chars = [];
        this.activeScrambles = new Map();
        
        this.init();
    }
    
    init() {
        this.element.innerHTML = this.originalText
            .split('')
            .map(char => `<span class="char" data-original="${char}">${char}</span>`)
            .join('');
        
        this.chars = this.element.querySelectorAll('.char');
        console.log('Initialized', this.chars.length, 'characters');
        
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }
    
    handleMouseMove(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        this.chars.forEach((char, index) => {
            const charRect = char.getBoundingClientRect();
            const charCenterX = charRect.left + charRect.width / 2;
            const charCenterY = charRect.top + charRect.height / 2;
            
            const distance = Math.hypot(mouseX - charCenterX, mouseY - charCenterY);
            
            if (distance < this.radius && char.dataset.original.trim() !== '') {
                if (!this.activeScrambles.has(index)) {
                    this.scrambleChar(char, index);
                }
            }
        });
    }
    
    scrambleChar(char, index) {
        const originalChar = char.dataset.original;
        let scrambleCount = 0;
        const maxScrambles = Math.floor(this.duration / this.speed);
        
        console.log('Scrambling character:', originalChar, 'at index:', index);
        
        this.activeScrambles.set(index, true);
        
        const scrambleInterval = setInterval(() => {
            if (scrambleCount < maxScrambles) {
                char.textContent = this.getRandomChar();
                scrambleCount++;
            } else {
                char.textContent = originalChar;
                clearInterval(scrambleInterval);
                this.activeScrambles.delete(index);
            }
        }, this.speed);
    }
    
    getRandomChar() {
        return this.scrambleChars[Math.floor(Math.random() * this.scrambleChars.length)];
    }
}

window.addEventListener('load', () => {
    const scrambledTextElement = document.getElementById('scrambledText');
    console.log('Scrambled text element:', scrambledTextElement);
    if (scrambledTextElement) {
        console.log('Initializing scrambled text with text:', scrambledTextElement.textContent);
        new ScrambledText(scrambledTextElement, {
            radius: 40,
            duration: 300,
            speed: 80,
            scrambleChars: ".:#@$%&*+=<>?"
        });
        console.log('Scrambled text initialized');
    } else {
        console.error('Could not find scrambledText element');
    }
    
    function closeBlurringPage() {
        const sections = ['blurp1', 'blurp2', 'blurp3'];
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.remove('show');
                section.innerHTML = '';
            }
        });
        
        const existingDesc = document.getElementById('character-desc');
        if (existingDesc) {
            existingDesc.remove();
        }
        
        const bluringPage = document.getElementById('bluringPage');
        if (bluringPage) bluringPage.classList.remove('show');
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const bluringPage = document.getElementById('bluringPage');
            if (bluringPage && bluringPage.classList.contains('show')) {
                closeBlurringPage();
            }
        }
    });
    
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    
    const initialViewport = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
    }
    
    function resizeFeatures() {
        const features = document.querySelectorAll('.feature');
        const scaleX = window.innerWidth / initialViewport.width;
        const scaleY = window.innerHeight / initialViewport.height;
        
        const scale = Math.min(scaleX, scaleY);
        
        features.forEach(feature => {
            feature.style.transform = `scale(${scale})`;
            feature.style.transformOrigin = 'center center';
        });
    }
    
    function resizeAll() {
        resizeCanvas();
        resizeFeatures();
    }
    
    resizeAll();
    
    window.addEventListener('resize', resizeAll);
    window.addEventListener('orientationchange', resizeAll);


    class Game{
        constructor(canvas){
            this.canvas = canvas;
            this.width = canvas.width;
            this.height = canvas.height;
            this.user = new user(this);
            this.input = new InputHandler();
            
            this.backgrounds = {
                left: document.getElementById('bg00'),
                middle: document.getElementById('bg01'),
                right: document.getElementById('bg02')
            };
            this.movingBackgrounds = {
                left: document.getElementById('bbg00'),
                middle: document.getElementById('bbg01'),
                right: document.getElementById('bbg02')
            };
            this.currentPage = 'middle';
            this.currentmovingPage = 'middle';
            this.pageWidth = canvas.width;
            this.worldOffset = 0;
            
            this.npcs = [
                new NPC(this, 'henry', canvas.width * 0.15, canvas.height - 400, 300, 300, 'left'),
                new NPC(this, 'yeah', canvas.width * 0.6, canvas.height - 440, 180, 450, 'middle'),  
                new NPC(this, 'pure', canvas.width * 0.85, canvas.height - 450, 200, 450, 'right')
            ];
            
            this.previousSpaceKeyPressed = false;
        }

        updateSize(){
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.pageWidth = this.canvas.width;
            
            this.user.updateSize();
            this.npcs.forEach(npc => {
                npc.updatePositionAndSize();
            });
        }

        update(deltaTime){
            this.updateSize();
            
            const prevUserX = this.user.x;
            
            this.user.update(this.input.keys, deltaTime);
            
            const userMovement = this.user.x - prevUserX;
            this.updateParallaxOffset(userMovement);
            
            this.handlePageTransitions();
            
            this.npcs.forEach(npc => {
                npc.update(this.user);
            });
            
            const currentSpaceKeyPressed = this.input.keys.includes(' ');
            if (currentSpaceKeyPressed && !this.previousSpaceKeyPressed) {
                const bluringPage = document.getElementById('bluringPage');
                
                if (bluringPage && bluringPage.classList.contains('show')) {
                    this.closeBlurringPage();
                } else {
                    this.npcs.forEach(npc => {
                        npc.interact();
                    });
                }
            }
            this.previousSpaceKeyPressed = currentSpaceKeyPressed;
            this.user.updatelocation();
        }

        closeBlurringPage() {
            const sections = ['blurp1', 'blurp2', 'blurp3'];
            sections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.classList.remove('show');
                    section.innerHTML = '';
                }
            });
            
            const existingDesc = document.getElementById('character-desc');
            if (existingDesc) {
                existingDesc.remove();
            }
            
            const bluringPage = document.getElementById('bluringPage');
            if (bluringPage) bluringPage.classList.remove('show');
        }

        updateParallaxOffset(userMovement) {
            const parallaxFactor = 0.3;
            
            this.worldOffset += userMovement * parallaxFactor;
            
            const maxOffset = this.width * 0.25;
            this.worldOffset = Math.max(-maxOffset, Math.min(maxOffset, this.worldOffset));
        }

        handlePageTransitions(){
            const userCenterX = this.user.x + this.user.width / 2;
            
            if (userCenterX <= 0 && this.currentPage === 'middle') {
                this.currentPage = 'left';
                this.currentmovingPage = 'left';
                this.user.x = this.width - this.user.width;
                this.worldOffset = 0;
            }
            else if (userCenterX >= this.width && this.currentPage === 'middle') {
                this.currentPage = 'right';
                this.currentmovingPage = 'right';
                this.user.x = 0;
                this.worldOffset = 0;
            }
            else if (userCenterX >= this.width && this.currentPage === 'left') {
                this.currentPage = 'middle';
                this.currentmovingPage = 'middle';
                this.user.x = 0;
                this.worldOffset = 0;
            }
            else if (userCenterX <= 0 && this.currentPage === 'right') {
                this.currentPage = 'middle';
                this.currentmovingPage = 'middle';
                this.user.x = this.width - this.user.width;
                this.worldOffset = 0;
            }
        }

        draw(context){
            const movingBg = this.movingBackgrounds[this.currentPage];
            if (movingBg) {
                const bgWidth = this.width * 1.5;
                const bgHeight = this.height;
                const bgX = this.worldOffset - (bgWidth - this.width) / 2;
                
                context.drawImage(movingBg, bgX, 0, bgWidth, bgHeight);
            }
            
            const currentBg = this.backgrounds[this.currentPage];
            if (currentBg) {
                context.drawImage(currentBg, 0, 0, this.width, this.height);
            }
            
            this.npcs.forEach(npc => {
                npc.draw(context);
            });
            
            this.user.draw(context);
        }
    }
    const game = new Game(canvas);
    console.log(game);
    let lastTime = 0;

    function animate(timestamp){
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});