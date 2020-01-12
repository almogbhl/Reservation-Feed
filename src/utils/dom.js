export const getRootElement = () => {
	let div = document.getElementById('root');
	if (!div) {
		div = document.createElement('div');
		div.setAttribute('id', 'root');
		document.body.appendChild(div);
	}

	return div;
};
