function navigateTo(page) {
    window.location.href = page;
}

function toggleFields() {
    const studentFields = document.getElementById('studentFields');
    const teacherFields = document.getElementById('teacherFields');
    if (document.querySelector('input[name="role"]:checked').value === 'student') {
        studentFields.classList.remove('hidden');
        teacherFields.classList.add('hidden');
    } else {
        teacherFields.classList.remove('hidden');
        studentFields.classList.add('hidden');
    }
}