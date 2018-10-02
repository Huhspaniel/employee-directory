const $ = function(selector) {
	const isSelector = (typeof selector === 'string');
	const nodeList = isSelector ? document.querySelectorAll(selector) : selector;

    const text = function(content) {
		for (let i = 0; i < nodeList.length; i++) {
			nodeList[i].innerText = content;
        }
    }

    const html = function(content) {
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].innerHTML = content;
        }
    }

    const addClass = function(className) {
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].classList.add(className);
        }
    }

    const removeClass = function(className) {
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].classList.remove(className);
        }
    }

    const toggleClass = function(className) {
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].classList.toggle(className);
        }
    }

    const empty = function() {
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].innerHTML = '';
        }
    }

    const append = function(content) {
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].innerHTML += content;
        }
    }

    const prepend = function(content) {
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].innerHTML = content + nodeList[i].innerHTML;
        }
    }

    const val = function(content) {
        if (content === undefined) {
            return nodeList[0].value;
        } else {
            nodeList[0].value = content;
        }
    }

    const on = function(action, cb) {
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].addEventListener(action, cb);
        }
    }

    const each = function(cb) {
        for (i = 0; i < nodeList.length; i++) {
			cb(i, nodeList[i]);
        }
    }

	const click = function(cb) {
		if (cb === undefined) {
			for (i = 0; i < nodeList.length; i++) {
				nodeList[i].dispatchEvent(new MouseEvent('click'));
	        }
		} else {
			this.on('click', cb);
		}
	}

	const hide = function() {
		for (i = 0; i < nodeList.length; i++) {
			nodeList[i].style.display = 'none';
        }
	}

	const show = function(display) {
		if (display === undefined) {
			for (i = 0; i < nodeList.length; i++) {
				nodeList[i].style.display = 'initial';
	        }
		} else {
			for (i = 0; i < nodeList.length; i++) {
				nodeList[i].style.display = display;
		    }
		}
	}

    return {
		nodeList: nodeList,
        text: text,
        html: html,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        empty: empty,
        append: append,
        prepend: prepend,
        on: on,
        val: val,
		each: each,
		click: click,
		hide: hide,
		show: show
    };
}
