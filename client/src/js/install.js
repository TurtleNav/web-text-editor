const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event;
  butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  // Hacky way to detect non-Chromium based browsers WHICH DO NOT support WPA's
  // i.e. for firefox, promptEvent will be undefined.
  // Note: undefined ≠ null. typeof(null) is 'object' while typeof(undefined) is 'undefined'
  // Warn users of these browsers won't be able to install before returning at the next conditional
  if (typeof(promptEvent) === 'undefined') {
    alert('If you are using Firefox or some other non-Chromium based browser then you will NOT be able to install a WPA');
  }

  if (!promptEvent) return;

  promptEvent.prompt();

  window.deferredPrompt = null;

  butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => window.deferredPrompt = null);
