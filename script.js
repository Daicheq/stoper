const startBtn = document.querySelector('.start')
const pauseBtn = document.querySelector('.pause')
const stopBtn = document.querySelector('.stop')
const resetBtn = document.querySelector('.reset')
const historyBtn = document.querySelector('.history')
const stopwatch = document.querySelector('.stopwatch')
const time = document.querySelector('.time')
const timeList = document.querySelector('.time-list')

const infoBtn = document.querySelector('.info')
const modalShadow = document.querySelector('.modal-shadow')
const closeModalBtn = document.querySelector('.close')

const brushBtn = document.querySelector('.color-btn')
const colorDiv = document.querySelector('.color-block')
const redBtn = document.querySelector('.red')
const greenBtn = document.querySelector('.green')
const blueBtn = document.querySelector('.blue')
const root = document.documentElement

let countTime
let minutes = 0
let seconds = 0

let timesArr = []

const handleStart = () => {
	clearInterval(countTime)
	countTime = setInterval(() => {
		if (seconds < 9) {
			seconds++
			stopwatch.textContent = `${minutes}:0${seconds}`
		} else if (seconds >= 9 && seconds < 59) {
			seconds++
			stopwatch.textContent = `${minutes}:${seconds}`
		} else {
			minutes++
			seconds = 0
			stopwatch.textContent = `${minutes}:00`
		}
	}, 1000)
}

const handlePause = () => {
	clearInterval(countTime)
}

const handleStop = () => {
	time.innerHTML = `Ostatni czas: ${stopwatch.textContent}`

	if (stopwatch.textContent !== '0:00') {
		time.style.visibility = 'visible'
		timesArr.push(stopwatch.textContent)
	}

	clearStuff()
}

const handleReset = () => {
	time.style.visibility = 'hidden'
	timesArr = []
	clearStuff()
}

const clearStuff = () => {
	clearInterval(countTime)
	stopwatch.textContent = '0:00'
	timeList.textContent = ''
	seconds = 0
	minutes = 0
}

const showHistory = () => {
	let i = 1
	timeList.textContent = ''
	timesArr.forEach(t => {
		const newTime = document.createElement('li')
		newTime.innerHTML = `Pomiar nr ${i}: <span>${t}</span>`

		timeList.appendChild(newTime)
		i++
	})
}

const showModal = () => {
	if (!(modalShadow.style.display === 'block')) {
		modalShadow.style.display = 'block'
	} else {
		modalShadow.style.display = 'none'
	}

	modalShadow.classList.toggle('modal-animation')
}

const showColorDiv = () => {
	colorDiv.classList.toggle('show-color-block')
}

const changeToRedColor = () => {
	root.style.setProperty('--first-color', 'rgb(250, 20, 6)')
	root.style.setProperty('--darker-first-color', 'rgb(200, 14, 4)')
	showColorDiv()
}
const changeToGreenColor = () => {
	root.style.setProperty('--first-color', 'rgb(14, 243, 14)')
	root.style.setProperty('--darker-first-color', 'rgb(10, 219, 10)')
	showColorDiv()
}
const changeToBlueColor = () => {
	root.style.setProperty('--first-color', 'rgb(33, 136, 233)')
	root.style.setProperty('--darker-first-color', 'rgb(21, 118, 209)')
	showColorDiv()
}

startBtn.addEventListener('click', handleStart)
pauseBtn.addEventListener('click', handlePause)
stopBtn.addEventListener('click', handleStop)
resetBtn.addEventListener('click', handleReset)
historyBtn.addEventListener('click', showHistory)

infoBtn.addEventListener('click', showModal)
closeModalBtn.addEventListener('click', showModal)
window.addEventListener('click', e => {
	if (e.target === modalShadow) {
		showModal()
	}
})

brushBtn.addEventListener('click', showColorDiv)
redBtn.addEventListener('click', changeToRedColor)
greenBtn.addEventListener('click', changeToGreenColor)
blueBtn.addEventListener('click', changeToBlueColor)
