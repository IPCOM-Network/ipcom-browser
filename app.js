const ipc = require("electron").ipcRenderer
console.log("begin")

ipc.on("changeWeb", (event, message) => {
  console.log("received", message)
  const frame = document.getElementById("framex")
  frame.src = message
})