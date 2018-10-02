function renderList() {
	$('.employees').empty();
	$(employeeList).each(
		function(i, employee) {
			$('.employees').append(
				'<div class="employee">\n' +
					`<p>${employee.name}</p>\n` +
					`<p>${toThreeDigits(employee.officeNum)}</p>\n` +
					`<p>${employee.phoneNum}</p>\n` +
				'</div>'
			)
		}
	);
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
	$('.inputs *').hide();
	renderList();
});
$('.add').click(function() {
	setActiveNav(this);
	$('.inputs *').show('inherit');
	$('.submitBtn').text('add');
	renderList();
});
$('.verify').click(function() {
	setActiveNav(this);
	$('.inputs *').show('inherit');
	$('.inputBars *:not(.nameInput)').hide();
	$('.submitBtn').text('search');
	renderList();
});
$('.update').click(function() {
	$('.inputs *').show('inherit');
	$('.submitBtn').text('edit');
	setActiveNav(this);
});
$('.delete').click(function() {
	$('.inputs *').show('inherit');
	$('.inputBars *:not(.nameInput)').hide();
	$('.submitBtn').text('delete');
	setActiveNav(this);
});

$('.view').click();
