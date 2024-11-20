function navigateTo(page) {
    window.location.href = page;
}

// Mezők megjelenítése szerep alapján
function toggleFields() {
    const studentFields = document.getElementById("studentFields");
    const teacherFields = document.getElementById("teacherFields");
    const role = document.querySelector('input[name="role"]:checked').value;

    if (role === "student") {
        studentFields.classList.remove("hidden");
        teacherFields.classList.add("hidden");
    } else if (role === "teacher") {
        teacherFields.classList.remove("hidden");
        studentFields.classList.add("hidden");
    }
    checkFormValidity();
}

// Jelszó követelmények ellenőrzése
function validatePassword(role) {
    const passwordField = document.getElementById(`password${role === 'Teacher' ? 'T' : ''}`);
    const password = passwordField.value;

    const requirements = [
        { id: `lowercase${role}`, regex: /[a-z]/ },
        { id: `uppercase${role}`, regex: /[A-Z]/ },
        { id: `number${role}`, regex: /[0-9]/ },
        { id: `specialChar${role}`, regex: /[\W_]/ }
    ];

    requirements.forEach(req => {
        const element = document.getElementById(req.id);
        element.checked = req.regex.test(password);
        element.parentElement.style.color = req.regex.test(password) ? "green" : "gray";
    });
    checkFormValidity();
}

// Mezők ellenőrzése
function checkFormValidity() {
    const role = document.querySelector('input[name="role"]:checked');
    const termsAccepted = document.getElementById("terms").checked;
    const registerButton = document.getElementById("registerBtn");

    if (!role) {
        registerButton.disabled = true;
        return;
    }

    const isStudent = role.value === "student";
    const requiredFields = isStudent
        ? ["firstName", "lastName", "userName", "email", "password", "phone", "class"]
        : ["firstNameT", "lastNameT", "userNameT", "emailT", "passwordT", "phoneT", "birthDate"];

    let allFieldsValid = true;

    requiredFields.forEach((fieldId) => {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim())
            allFieldsValid = false;
    });

    if (!validateEmail(isStudent ? "email" : "emailT")) {
        allFieldsValid = false;
    }

    if (!validatePhone(isStudent ? "phone" : "phoneT")) {
        allFieldsValid = false;
    }

    if (!isStudent && !validateBirthDate()) {
        allFieldsValid = false;
    }

    if (!validatePasswordRequirements(isStudent ? "Student" : "Teacher")) {
        allFieldsValid = false;
    }

    registerButton.disabled = !(allFieldsValid && termsAccepted);
}

// Email ellenőrzése
function validateEmail(emailFieldId) {
    const emailField = document.getElementById(emailFieldId);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(emailField.value);
    return isValid;
}

// Telefonszám ellenőrzése
function validatePhone(phoneFieldId) {
    const phoneField = document.getElementById(phoneFieldId);
    const phoneRegex = /^07\d{8}$/;
    const isValid = phoneRegex.test(phoneField.value);
    return isValid;
}

// Tanár születési dátumának ellenőrzése
function validateBirthDate() {
    const birthDateField = document.getElementById("birthDate");
    const birthDate = birthDateField.value;

    if (!birthDate) {
        return false;
    }

    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    const isValid = age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));
    showError(birthDateField, isValid, "A tanárnak legalább 18 évesnek kell lennie.");
    return isValid;
}

// Jelszó követelmények ellenőrzése
function validatePasswordRequirements(role) {
    const requirements = [
        { id: `lowercase${role}`, regex: /[a-z]/ },
        { id: `uppercase${role}`, regex: /[A-Z]/ },
        { id: `number${role}`, regex: /[0-9]/ },
        { id: `specialChar${role}`, regex: /[\W_]/ }
    ];

    return requirements.every(req => {
        const element = document.getElementById(req.id);
        return element.checked;
    });
}

// Hibaüzenet megjelenítése
function showError(field, isValid, errorMessage) {
    let errorElement = field.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains("error-message")) {
        errorElement = document.createElement("small");
        errorElement.className = "error-message";
        errorElement.style.color = "red";
        field.parentElement.appendChild(errorElement);
    }

    errorElement.textContent = isValid ? "" : errorMessage;
}
