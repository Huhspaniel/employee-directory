// global variable for user input employee
let input;
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
	$('.employees, .message').empty();
}
// Displaying info
function render(doClear, obj) {
	if (doClear) clear(); // if passed 'true' for doClear, invoke clear() to empty .employees
	if (typeof obj === 'object') { // if passed employee object, prepend to div.employees
		$('.employees').prepend(
			formatEmployee(obj)
		);
	} else { // if passed nothing for obj, render current employeeList
		$(employeeList).each(
			function(i, currEmployee) {
				$('.employees').prepend(
					formatEmployee(currEmployee)
				);
			}
		);
	}
}
function message(msg) {
	$('.message').text(msg);
}
function setActiveNav(clicked) {
	$('.activated').removeClass('activated');
	clicked.classList.add('activated');
}
$('.view').click(function() {
	setActiveNav(this);
	clearInput();
	$('.inputs *').hide();
	render(true);
});
$('.add').click(function() {
	setActiveNav(this);
	clearInput();
	$('.inputs *').show('inherit');
	$('.submitBtn').text('add');
	render(true);
});
$('.verify').click(function() {
	setActiveNav(this);
	clearInput();
	$('.inputs *').show('inherit');
	$('.inputBars *:not(.nameInput)').hide();
	$('.submitBtn').text('search');
	render(true);
});
$('.update').click(function() {
	setActiveNav(this);
	clearInput();
	$('.inputs *').show('inherit');
	$('.submitBtn').text('edit');
	render(true);
});
$('.delete').click(function() {
	setActiveNav(this);
	clearInput();
	$('.inputs *').show('inherit');
	$('.inputBars *:not(.nameInput)').hide();
	$('.submitBtn').text('delete');
	render(true);
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
					render(false, employeeList[i]);
					found = true;
				}
			}
			if (!found) message(`Employee "${input.name}" not found.`);
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
	switch(this.innerText) {
		case 'add':
			const employee = getInputEmployee();
			if (findEmployee(employee) !== -1) {
				message(`Employee "${employee.name}" already exists.`);
			} else {
				addEmployee(input);
				render(true);
			}
			break;
		case 'search':
			clear();
			var i = findEmployee(input);
			if (i !== -1) {
				render(true, employeeList[i]);
			} else {
				message(`Employee "${input.name}" not found.`);
			}
			break;
		case 'edit':
			i = findEmployee(input);
			if (i !== -1) {
				updateEmployee(employeeList[i], input);
				render(true);
			} else {
				message(`Employee "${input.name}" not found.`);
			}
			break;
		case 'delete':
			i = findEmployee(input);
			if (i !== -1) {
				deleteEmployee(i);
				render(true);
			}
			break;
	}
	clearInput();
});

$('.view').click();
