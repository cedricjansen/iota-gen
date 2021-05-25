
// the host page will have access to `window.readConfig`,
// but not direct access to `readFileSync`
const generateButton = document.getElementById('seed-generator');

generateButton.addEventListener('click', function () {
  if(window.isElectron)
    window.ipcRenderer.send('generate')
})

window.ipcRenderer.on('generated', function (event, seed) {
  if(window.isElectron)
     document.getElementById('seed-container').innerHTML = seed
})
