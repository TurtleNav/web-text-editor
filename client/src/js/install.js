const installButton = document.getElementById('buttonInstall');

let installPrompt = null;

// beforeinstallprompt is fired before an install prompt is displayed to the user.
// use the global variable 'installPrompt' to save the event
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.removeAttribute("hidden"); // 
});

// fired once the user clicks on the instal button. If that click occurs after an 'beforeinstallprompt', we re-fire the event
installButton.addEventListener("click", async () => {
  if (!installPrompt) return;
  installPrompt.prompt();
  installPrompt = null;
  installButton.setAttribute("hidden", ""); // hide install button post installation
});

window.addEventListener('appinstalled', (event) => installPrompt = null);
