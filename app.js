// global variable for user input employee
let input;
// array of displayed employees
let display = [];
// Create employee object
function Employee(name, officeNum, phoneNum) {
	this.name = name;
	this.officeNum = officeNum;
	this.phoneNum = phoneNum;
}
// Return html for employee
function formatEmployee(employee) {
	return '<div class="employee">\n' +
		`<p>${employee.name}</p>\n` +
		`<p>${employee.officeNum}</p>\n` +
		`<p>${employee.phoneNum}</p>\n` +
	'</div>';
}
// Clear display of employeeList
function clear() {
	$('.employees').empty();
}
function render(obj) {
	if (typeof obj === 'object') {
		$('.employees').prepend(
			formatEmployee(obj)
		);
	} else if (obj) {
		$('.employees').prepend(
			obj
		);
	} else {
		clear();
		$(employeeList).each(
			function(i, currEmployee) {
				$('.employees').prepend(
					formatEmployee(currEmployee)
				);
			}
		);
	}
}
function toThreeDigits(num) {
	return ('000' + num).slice(-3);
}
function setActiveNav(clicked) {
	$('.activated').removeClass('activated');
	clicked.classList.add('activated');
}
$('.view').click(function() {
	setActiveNav(this);
	clearInput();
	$('.inputs *').hide();
	render();
});
$('.add').click(function() {
	setActiveNav(this);
	clearInput();
	$('.inputs *').show('inherit');
	$('.submitBtn').text('add');
	render();
});
$('.verify').click(function() {
	setActiveNav(this);
	clearInput();
	$('.inputs *').show('inherit');
	$('.inputBars *:not(.nameInput)').hide();
	$('.submitBtn').text('search');
	render();
});
$('.update').click(function() {
	setActiveNav(this);
	clearInput();
	$('.inputs *').show('inherit');
	$('.submitBtn').text('edit');
	render();
});
$('.delete').click(function() {
	setActiveNav(this);
	clearInput();
	$('.inputs *').show('inherit');
	$('.inputBars *:not(.nameInput)').hide();
	$('.submitBtn').text('delete');
	render();
});
$('.inputBars').on(
	'input',
	function() {
		if ($('.verify, .update, .delete').hasClass('activated')) {
			input = getInputEmployee();
			let found = false;
			clear();
			for (let i = 0; i < employeeList.length; i++) {
				if(employeeList[i].name.includes(input.name)) {
					render(employeeList[i]);
					found = true;
				}
			}
			if (!found) render('Employee not found.');
		}
	}
);

function getInputEmployee() {
	return new Employee(
		$('.nameInput').val(),
		$('.officeNumInput').val(),
		$('.phoneNumInput').val()
	);
}
function clearInput() {
	$('.inputBars > input').val('');
}
function addEmployee(employee) {
	employeeList.push(employee);
}
function findEmployee(employee) {
	for (let i = 0; i < employeeList.length; i++) {
		if(employee.name === employeeList[i].name) {
			return i;
		}
	}
	return -1;

}
function updateEmployee(origEmployee, newEmployee) {
	origEmployee.officeNum = newEmployee.officeNum || origEmployee.officeNum;
	origEmployee.phoneNum = newEmployee.phoneNum || origEmployee.phoneNum;
}
function deleteEmployee(employeeIndex) {
	employeeList.splice(employeeIndex, 1);
}
$('.submitBtn').click(function() {
	const input = getInputEmployee();
	clearInput();
	switch(this.innerText) {
		case 'add':
			if (findEmployee(input) !== -1) {
				render('Employee already exists.');
			} else {
				addEmployee(input);
				render();
			}
			break;
		case 'search':
			clear();
			var i = findEmployee(input);
			if (i !== -1) {
				render(employeeList[i]);
			} else {
				render('Employee not found.');
			}
			break;
		case 'edit':
			i = findEmployee(input);
			if (i !== -1) {
				updateEmployee(employeeList[i], input);
				render();
			} else {
				render();
				render('Employee not found.');
			}
			break;
		case 'delete':
			i = findEmployee(input);
			if (i !== -1) {
				deleteEmployee(i);
			}
			render();
			break;
	}
	clearInput();
});

$('.view').click();
