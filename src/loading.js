const {
    ipcRenderer
} = require('electron')


function load() {
    fetch('https://natabox.herokuapp.com')
        .then(res => res.text())
        .then(txt => {
            if (txt == 'Works') {
                setTimeout(() => {
                    ipcRenderer.send('app-loaded')
                }, 0)
                return
            }
            load()
        })
}

load()