console.log('Licze srednia...');

window.addEventListener('load', function() {
	setTimeout(() => {
		adding();
	}, 1500);
});

let buttons = document.querySelectorAll('button');

buttons.forEach((b) => {
	b.addEventListener('click', setTimeout(adding, 1500));
});

function adding() {
	console.log('adding()');
	//if (!ocenyczesciowebutton) return;

	let el = document.querySelectorAll(
		'.x-dataitem.x-container.x-component.x-item-no-tap.x-layout-auto-item > div > div > div > div.x-body-wrap-el > .x-body-el > .x-innerhtml'
	);

	if (el.length == 0) return;

	const getNumber = (number) => {
		let realNumber = parseInt(number);

		if (number == ',') return;
		if (!number[1]) return realNumber;

		switch (number[1]) {
			case '+':
				return realNumber + 0.25;
				break;
			case '-':
				return realNumber - 0.25;
				break;
		}
	};

	el.forEach((e) => {
		let allMarks = [];
		let length = [];

		let allMarksSum = 0;
		let allDevideSum = 0;

		let marks = e.querySelectorAll('span');

		marks.forEach((m) => {
			if (!isNaN(getNumber(m.innerText))) {
				let label = m.ariaLabel.split(', ');
				let waga = parseInt(label[2].replace('waga: ', ''));

				length[waga] = (length[waga] || 0) + 1;

				allMarks[waga] = (allMarks[waga] || 0) + getNumber(m.innerText);
			}
		});

		allMarks.forEach((m, i) => {
			allMarksSum += allMarks[i] * i;
		});

		length.forEach((l, i) => {
			allDevideSum += length[i] * i;
		});

		let srednia = (allMarksSum / allDevideSum).toFixed(2);

		if (!isNaN(srednia))
			e.innerHTML += `<h4 class = "podliczona-srednia" style = "color: #809d2e; float: right; margin-right: 30px">${srednia}</h4>`;
	});

	// SREDNIA WAZONA OCEN

	let div = document.querySelector('#ext-element-172');
	let policzone = document.querySelectorAll('.podliczona-srednia');
	let wszystkie = document.querySelectorAll(
		'.x-dataitem.x-container.x-component.x-item-no-tap.x-layout-auto-item > div > div > div > label > span'
	);

	let sum = 0;

	policzone.forEach((e) => {
		sum += parseFloat(e.innerText);
	});

	sum = (sum / policzone.length).toFixed(2);

	div.innerHTML += `<h3 style = "margin-left: 10%; color: yellow">${sum} <span style = "color: gray">(Podliczono z ${policzone.length} / ${wszystkie.length})</span></h3>`;
}
