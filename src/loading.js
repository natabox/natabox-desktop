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
                }, 2000)
                return
            }
            load()
        })
}

load()