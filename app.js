const STORAGE_KEY = 'poke-message-sender-api-key';
const API_URL = 'https://poke.com/api/v1/inbound/api-message';

const apiKeyInput = document.getElementById('apiKey');
const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const statusEl = document.getElementById('status');

apiKeyInput.value = localStorage.getItem(STORAGE_KEY) || '';

function setStatus(text, kind = '') {
  statusEl.textContent = text;
  statusEl.className = ['status', kind].filter(Boolean).join(' ');
}

apiKeyInput.addEventListener('input', () => {
  localStorage.setItem(STORAGE_KEY, apiKeyInput.value.trim());
});

clearBtn.addEventListener('click', () => {
  messageInput.value = '';
  setStatus('Nachricht geleert.');
  messageInput.focus();
});

sendBtn.addEventListener('click', async () => {
  const apiKey = apiKeyInput.value.trim();
  const message = messageInput.value.trim();

  if (!apiKey) {
    setStatus('Bitte den Poke API Key eintragen.', 'error');
    apiKeyInput.focus();
    return;
  }

  if (!message) {
    setStatus('Bitte eine Nachricht eingeben.', 'error');
    messageInput.focus();
    return;
  }

  sendBtn.disabled = true;
  setStatus('Sende Nachricht...');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    setStatus('Nachricht erfolgreich an Poke gesendet.', 'ok');
    messageInput.value = '';
  } catch (error) {
    setStatus(`Senden fehlgeschlagen: ${error.message}`, 'error');
  } finally {
    sendBtn.disabled = false;
  }
});

messageInput.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    sendBtn.click();
  }
});
