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
// Clear display
function clear() {
    $('.employees, .message').empty();
}
// Displaying info
function render(dontClear, obj) {
    if (!dontClear) clear(); // if passed 'true' for dontClear, don't invoke clear()
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

function getInput() {
    return new Employee(
        $('.nameInput').val(),
        $('.officeNumInput').val(),
        $('.phoneNumInput').val()
    );
}

function clearInput() {
    $('.inputBars > input').val('');
    input = undefined;
}

function updateList() {
    input = getInput();
    if ($('.verify, .update, .delete').hasClass('activated')) {
        let found = false;
        clear();
        for (let i = 0; i < employeeList.length; i++) {
            if (employeeList[i].name.includes(input.name)) {
                render(true, employeeList[i]);
                found = true;
            }
        }
        if (!found) message(`Employee "${input.name}" not found.`);
    }
}
$('.inputBars').on(
    'input',
    updateList
);

function addEmployee(employee) {
    employeeList.push(employee);
}

function findEmployee(employee) {
    for (let i = 0; i < employeeList.length; i++) {
        if (employee.name === employeeList[i].name) {
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
$('.submitBtn').click( function() {
    if (input) {
        switch (this.innerText) {
            case 'add':
                if (findEmployee(input) > -1) {
                    message(`Employee "${input.name}" already exists.`);
                } else {
                    addEmployee(input);
                    render();
                    message(`Employee "${input.name}" created successfully.`)
                }
                break;
            case 'search':
                clear();
                var i = findEmployee(input);
                if (i !== -1) {
                    render(false, employeeList[i]);
                    message('Employee found.')
                } else {
                    render(false);
					message(`Employee "${input.name}" not found.`);
                }
                break;
            case 'edit':
                i = findEmployee(input);
                if (i !== -1) {
                    updateEmployee(employeeList[i], input);
                    render();
                    message(`Employee "${input.name}" updated successfully.`)
                } else {
                    render(false);
					message(`Employee "${input.name}" not found.`);
                }
                break;
            case 'delete':
                console.log(input);
                i = findEmployee(input);
                if (i !== -1) {
                    deleteEmployee(i);
                    render();
                    message(`Employee "${input.name}" deleted successfully.`)
                } else {
                    render(false);
					message(`Employee "${input.name}" not found.`)
                }
                break;
        }
        clearInput();
    }
});
$('.inputs').on('keyup', function(e) {
    if (e.key === 'Enter') {
        $('.submitBtn').click();
    }
});

$('.view').click();
