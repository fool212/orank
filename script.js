let attempts = 0;
const maxAttempts = 10;
const claimBtn = document.getElementById('claimBtn');
const modal = document.getElementById('modal');
const finalModal = document.getElementById('finalModal');
const modalBtn = document.getElementById('modalBtn');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');

const messages = [
    { title: '😅 再试一次！', text: '按钮好像有点调皮...' },
    { title: '🤔 咦？', text: '怎么点不到呢？' },
    { title: '😂 哈哈！', text: '你抓不到我！' },
    { title: '🏃 快跑！', text: '有人要抓我！' },
    { title: '😜 略略略~', text: '就是点不到！' },
    { title: '🤪 抓不到！', text: '我跑得可快了！' },
    { title: '😤 别放弃！', text: '再试一次嘛~' },
    { title: '🧐 认真的？', text: '你真的想要吗？' },
    { title: '😏 最后一次', text: '这次一定行！' },
    { title: '🎊 恭喜！', text: '你终于成功了！' }
];

function moveButton() {
    const maxX = window.innerWidth - claimBtn.offsetWidth - 20;
    const maxY = window.innerHeight - claimBtn.offsetHeight - 20;
    
    const randomX = Math.max(20, Math.random() * maxX);
    const randomY = Math.max(20, Math.random() * maxY);
    
    claimBtn.classList.add('run-away');
    claimBtn.style.left = randomX + 'px';
    claimBtn.style.top = randomY + 'px';
}

function showModal() {
    const message = messages[Math.min(attempts - 1, messages.length - 1)];
    modalTitle.textContent = message.title;
    modalText.textContent = message.text;
    modal.classList.add('show');
}

function hideModal() {
    modal.classList.remove('show');
}

function showFinalModal() {
    finalModal.classList.add('show');
    createFallingEmojis();
}

function createFallingEmojis() {
    const emojis = ['🔥', '🐵', '⚔️', '🎮', '🏆', '😂', '🤣', '💀', '👑', '💎'];
    const container = document.querySelector('.falling-emojis');
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.className = 'emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(emoji);
            
            setTimeout(() => emoji.remove(), 4000);
        }, i * 100);
    }
}

claimBtn.addEventListener('mouseenter', function() {
    if (attempts < maxAttempts - 1) {
        moveButton();
    }
});

claimBtn.addEventListener('click', function(e) {
    attempts++;
    
    if (attempts >= maxAttempts) {
        showFinalModal();
    } else {
        showModal();
        moveButton();
    }
});

modalBtn.addEventListener('click', function() {
    hideModal();
});

let seconds = 59;
const timerEl = document.getElementById('timer');

setInterval(() => {
    seconds--;
    if (seconds < 0) seconds = 59;
    timerEl.textContent = '00:' + (seconds < 10 ? '0' : '') + seconds;
}, 1000);

setInterval(() => {
    const countEl = document.getElementById('count');
    let count = parseInt(countEl.textContent.replace(/,/g, ''));
    count += Math.floor(Math.random() * 10) + 1;
    countEl.textContent = count.toLocaleString();
}, 2000);
