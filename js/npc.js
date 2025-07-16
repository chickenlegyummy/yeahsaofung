export class NPC{
    constructor(game, name, x, y, width, height, page){
        this.game = game;
        this.name = name;
        // Store relative positions (as percentages) for responsive scaling
        this.relativeX = x / game.width;
        this.relativeY = y / game.height;
        this.relativeWidth = width / game.width;
        this.relativeHeight = height / game.height;
        
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.page = page;
        this.interactionRange = 200;
        this.isNearPlayer = false;
        
        this.image = this.getNPCImage(name);
        
        this.videoData = this.getVideoData(name);
        this.videosLoaded = false;
    }
    
    getVideoData(name) {
        switch(name.toLowerCase()) {
            case 'henry':
                return [
                    { id: 'ou-sy2Tfguk', title: 'yeah洨瘋與他的小顆伴之行山記' },
                    { id: 'FgYrUSTBI68', title: '平行四邊形與他的小顆伴之行山記' },
                    { id: 'X47e8WL1xAs', title: '蒙俊軒龍脊演唱會與他的小顆伴之行山記 Part.1' },
                    { id: '6Uicy8KqMfg', title: '蒙俊軒龍脊演唱會與他的小顆伴之行山記 Part.2' },
                    { id: 'Rd0TtUaaPks', title: '雞與虎之大帽山驚魂記 Part.1' },
                    { id: 'O9kYvwicgLo', title: '雞與虎之大帽山驚魂記 Part.2' },
                    { id: 'iLlWQ_Ddolw', title: '雞與虎之大帽山驚魂記 Part.3' },
                    { id: 'RsQJjynMW1s', title: '雞與虎之大帽山驚魂記 大結局' },
                    { id: 'CVvxHNrwXLQ', title: '雞與虎的撕紙山秋之回憶' }
                ];
            case 'yeah':
                return [
                    { id: 'JD8EL0Qx02M', title: '兩日一夜moscow 之 fishu big boobs流出must watch 馬克斯和心志未成熟者請勿看 part 1' },
                    { id: 'H4kUPHIJ7LU', title: '兩日一夜moscow 之 fishu big boobs流出must watch 馬克斯和心志未成熟者請勿看 part 2' },
                    { id: 'dcPLyzYK7BA', title: '兩日一夜moscow 之 fishu big boobs流出must watch 馬克斯和心志未成熟者請勿看 大結局' }
                ];
            case 'pure':
                return [
                    { id: 'fYxFgahGeJg', title: 'Yeah洨瘋之大冒險 2' },
                    { id: 'tFZ01GlXo-g', title: '雞與虎 之 決戰碼頭姑哩 2' },
                    { id: '2acrcWdS-SE', title: '極密極秘極醜惡實錄 雞竟然做出了這種事' },
                    { id: 'UEdk4XnT0EA', title: '' }
                ];
            default:
                return [];
        }
    }
    
    getNPCImage(name) {
        switch(name.toLowerCase()) {
            case 'henry':
                return document.getElementById('npc1');
            case 'yeah':
                return document.getElementById('npc2');
            case 'pure':
                return document.getElementById('npc0');
        }
    }
    
    update(user) {
        if (this.page === this.game.currentPage) {
            const distance = this.getDistanceToUser(user);
            this.isNearPlayer = distance <= this.interactionRange;
        } else {
            this.isNearPlayer = false;
        }
    }
    
    getDistanceToUser(user) {
        return Math.abs(user.x - this.x+ this.width / 4);
    }
    
    interact() {
        if (this.isNearPlayer) {
            this.showDialog();
        }
    }
    
    showDialog() {
        this.hideAllBlurSections();
        
        const bluringPage = document.getElementById('bluringPage');
        
        switch(this.name.toLowerCase()) {
            case 'henry':
                this.loadVideosToSection('blurp1');
                bluringPage.classList.add('show');
                break;
            case 'yeah':
                this.loadVideosToSection('blurp2');
                bluringPage.classList.add('show');
                break;
            case 'pure':
                this.loadVideosToSection('blurp3');
                bluringPage.classList.add('show');
                break;
            default:
                window.alert(`${this.name} says: Hello there!`);
        }
    }
    
    loadVideosToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        section.innerHTML = '';
        
        this.showCharacterDescription();
        
        this.videoData.forEach(video => {
            const iframe = document.createElement('iframe');
            iframe.width = '320';
            iframe.height = '180';
            iframe.src = `https://www.youtube.com/embed/${video.id}`;
            iframe.title = video.title;
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.allowFullscreen = true;
            
            iframe.loading = 'lazy';
            
            section.appendChild(iframe);
        });
        
        section.classList.add('show');
        this.videosLoaded = true;
    }
    
    showCharacterDescription() {
        const existingDesc = document.getElementById('character-desc');
        if (existingDesc) {
            existingDesc.remove();
        }
        
        const description = this.getCharacterDescription();
        if (description) {
            const descDiv = document.createElement('div');
            descDiv.id = 'character-desc';
            descDiv.className = 'character-description';
            descDiv.innerHTML = description;
            document.body.appendChild(descDiv);
        }
    }
    
    getCharacterDescription() {
        switch(this.name.toLowerCase()) {
            case 'henry':
                return `
                    <h2>🏔️行山片</h2>
                `;
            case 'yeah':
                return `
                    <h2>✈️旅遊片</h2>
                `;
            case 'pure':
                return `
                    <h2>🎥絕對電影!</h2>
                `;
            default:
                return '';
        }
    }
    
    hideAllBlurSections() {
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
        
        this.videosLoaded = false;
    }
    
    draw(context) {
        if (this.page === this.game.currentPage && this.image) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    
    updatePositionAndSize() {
        this.x = this.relativeX * this.game.width;
        this.y = this.relativeY * this.game.height;
        this.width = this.relativeWidth * this.game.width;
        this.height = this.relativeHeight * this.game.height;
    }
}