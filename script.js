// SIMULASI DATABASE USER & LOGIC
document.addEventListener('DOMContentLoaded', () => {
  const loginContainer = document.getElementById('loginContainer');
  const appContainer = document.getElementById('appContainer');
  const loginForm = document.getElementById('loginForm');
  const logoutBtn = document.getElementById('logoutBtn');
  const userNameDisplay = document.getElementById('userNameDisplay');
  const avatarInitial = document.getElementById('avatarInitial');

  // Login Handler (Simulasi)
  if(loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      let name = email.split('@')[0];
      name = name.charAt(0).toUpperCase() + name.slice(1);
      userNameDisplay.innerText = name;
      avatarInitial.innerText = name.charAt(0);
      loginContainer.style.display = 'none';
      appContainer.style.display = 'block';
    });
  }

  if(logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      appContainer.style.display = 'none';
      loginContainer.style.display = 'flex';
    });
  }

  // Navigasi antar page
  const navItems = document.querySelectorAll('.nav-item');
  const pages = ['dashboard','behavioral','aiadvisor','simulasi','insights'];
  function showPage(pageId) {
    pages.forEach(p => {
      const el = document.getElementById(`page-${p}`);
      if(el) el.classList.remove('active');
    });
    const activePage = document.getElementById(`page-${pageId}`);
    if(activePage) activePage.classList.add('active');
    navItems.forEach(item => {
      item.classList.remove('active');
      if(item.getAttribute('data-page') === pageId) item.classList.add('active');
    });
  }
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.getAttribute('data-page');
      if(page) showPage(page);
    });
  });

  // ========== MENU HAMBURGER UNTUK HP ==========
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });
    
    // Kalau klik di luar sidebar di HP, tutup otomatis
    document.addEventListener('click', function(event) {
      if (window.innerWidth <= 768) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
        }
      }
    });
  }

  // ---------- CHART.JS ----------
  const ctx1 = document.getElementById('behaviorChart')?.getContext('2d');
  if(ctx1) new Chart(ctx1, { type: 'radar', data: { labels: ['Innovasi','Risk','Kolaborasi','Kecepatan','Adaptasi'], datasets: [{ label: 'Tim Eksekutif', data: [85,72,88,79,84], backgroundColor: 'rgba(37,99,235,0.2)', borderColor: '#2563eb' }] } });
  const ctx2 = document.getElementById('impactChart')?.getContext('2d');
  if(ctx2) new Chart(ctx2, { type: 'doughnut', data: { labels: ['Efisiensi','Akurasi','Kecepatan','Kepuasan'], datasets: [{ data: [42,28,22,8], backgroundColor: ['#3b82f6','#10b981','#f59e0b','#8b5cf6'] }] } });
  const ctx3 = document.getElementById('sentimentChart')?.getContext('2d');
  if(ctx3) new Chart(ctx3, { type: 'line', data: { labels: ['Jan','Feb','Mar','Apr','Mei','Jun'], datasets: [{ label: 'Sentimen Positif', data: [68,72,70,78,84,89], borderColor: '#2563eb' }] } });

  // AI CHATBOT strategic
  const sendBtn = document.getElementById('sendChatBtn');
  const userInput = document.getElementById('aiUserInput');
  const chatContainer = document.querySelector('.chat-messages');
  function addMessage(text, isUser) {
    const msgDiv = document.createElement('div');
    msgDiv.className = isUser ? 'user-message' : 'ai-message';
    msgDiv.innerHTML = `<i class="${isUser ? 'fas fa-user' : 'fas fa-robot'}"></i> ${text}`;
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
  function getAIResponse(query) {
    const q = query.toLowerCase();
    if(q.includes('ekspansi')) return "📈 Rekomendasi AI: Ekspansi pasar ke Asia Tenggara layak dilakukan. ROI diprediksi +28% dengan risk adjusted. Perilaku tim menunjukkan agility tinggi.";
    if(q.includes('digital')) return "💡 Transformasi digital perlu pendekatan bertahap. Indeks kesiapan organisasi 76/100. Fokus pada automasi proses inti.";
    if(q.includes('restruktur')) return "🔄 Restruktur disarankan di divisi operasional. Mengurangi silo effect dan meningkatkan kolaborasi antar tim 18%.";
    return "✅ Berdasarkan data perilaku manajerial terkini, prioritas strategis adalah inovasi produk dan efisiensi biaya. Apakah ingin simulasi detail?";
  }
  if(sendBtn) sendBtn.addEventListener('click', () => {
    const msg = userInput.value.trim();
    if(!msg) return;
    addMessage(msg, true);
    const reply = getAIResponse(msg);
    setTimeout(() => addMessage(reply, false), 400);
    userInput.value = '';
  });
  if(userInput) {
    userInput.addEventListener('keypress', (e) => {
      if(e.key === 'Enter') sendBtn.click();
    });
  }

  // Simulasi skenario generator
  const simBtns = document.querySelectorAll('.sim-scenario');
  const simResultDiv = document.getElementById('simulasiResult');
  if(simBtns.length) simBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const scenario = btn.getAttribute('data-scenario');
      if(scenario === 'expansi') simResultDiv.innerHTML = `<i class="fas fa-chart-line"></i> 📊 PROYEKSI AI: Ekspansi pasar → Pertumbuhan pendapatan +34% dalam 3 tahun, peningkatan pangsa pasar 12%. Rekomendasi: pilot di 2 kota besar.`;
      else if(scenario === 'digital') simResultDiv.innerHTML = `<i class="fas fa-chart-line"></i> ⚙️ Transformasi Digital: Efisiensi operasional +40%, pengurangan biaya 18%. Dampak terhadap engagement karyawan +15 poin.`;
      else simResultDiv.innerHTML = `<i class="fas fa-chart-line"></i> 🏢 Restrukturisasi: Peningkatan produktivitas divisi inti +22%, indeks kolaborasi naik ke 8.1/10 dalam 6 bulan.`;
    });
  });
});
