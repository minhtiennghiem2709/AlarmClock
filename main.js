const selectMenu = document.querySelectorAll("select")
const currentTime = document.querySelector("h1")
const alarmBtn = document.querySelector("Button")
const content = document.querySelector(".content")
const ringtone = new Audio("./files/ringtone.mp3")
let alarmTime, isAlarmSet
for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i
  let option = `<option value="${i}">${i}</option>`
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option)
}

for (let i = 59; i > 0; i--) {
  i = i < 10 ? "0" + i : i
  let option = `<option value="${i}">${i}</option>`
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option)
}

setInterval(() => {
  let date = new Date()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  let ampm = "AM"
  if (hour >= 12) {
    hour -= 12
    ampm = "PM"
  }

  hour = hour == 0 ? 12 : hour
  hour = hour < 10 ? "0" + hour : hour
  minute < 10 ? "0" + minute : minute
  second = second < 10 ? "0" + second : second

  currentTime.innerHTML = `${hour}:${minute}:${second}: ${ampm}`
  if (alarmTime == `${hour}:${minute}:${ampm}`) {
    ringtone.play()
    ringtone.loop = true
  }
}, 1000)

alarmBtn.addEventListener("click", () => {
  if (isAlarmSet) {
    alarmTime = ""
    ringtone.pause()
    content.classList.remove("disabled")
    alarmBtn.innerHTML = "Set Alarm"
    return (isAlarmSet = false)
  }
  let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}`
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Invalid time")
  }
  alarmTime = time
  isAlarmSet = true
  content.classList.add("disabled")
  alarmBtn.innerHTML = "Clear Alarm"
  console.log(time)
})
