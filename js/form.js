const REQUIRED_FIELDS = ["name", "institution", "message"];

function setFieldError(input, errorEl, hasError) {
  input.setAttribute("aria-invalid", String(hasError));
  if (errorEl) errorEl.hidden = !hasError;
}

function clearFieldErrors(form, fieldName) {
  const input = form.elements[fieldName];
  if (input) input.setAttribute("aria-invalid", "false");
  form.querySelectorAll(`[id^="error-${fieldName}"]`).forEach((el) => {
    el.hidden = true;
  });
}

function validateForm(form) {
  let isValid = true;
  let firstInvalid = null;

  REQUIRED_FIELDS.forEach((fieldName) => {
    const input = form.elements[fieldName];
    const errorEl = document.getElementById(`error-${fieldName}`);
    const isEmpty = !input.value.trim();
    setFieldError(input, errorEl, isEmpty);
    if (isEmpty) {
      isValid = false;
      firstInvalid = firstInvalid || input;
    }
  });

  const emailInput = form.elements.email;
  const emailRequiredError = document.getElementById("error-email-required");
  const emailInvalidError = document.getElementById("error-email-invalid");
  const emailEmpty = !emailInput.value.trim();
  const emailInvalid = !emailEmpty && !emailInput.checkValidity();

  emailInput.setAttribute("aria-invalid", String(emailEmpty || emailInvalid));
  emailRequiredError.hidden = !emailEmpty;
  emailInvalidError.hidden = !emailInvalid;
  if (emailEmpty || emailInvalid) {
    isValid = false;
    firstInvalid = firstInvalid || emailInput;
  }

  return { isValid, firstInvalid };
}

export function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const successEl = document.getElementById("form-success");

  form.querySelectorAll("input, textarea, select").forEach((field) => {
    field.addEventListener("input", () => clearFieldErrors(form, field.name));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    successEl.hidden = true;

    const { isValid, firstInvalid } = validateForm(form);
    if (!isValid) {
      firstInvalid.focus();
      return;
    }

    form.reset();
    form.querySelectorAll("[aria-invalid]").forEach((el) => el.setAttribute("aria-invalid", "false"));
    successEl.hidden = false;
    successEl.focus();
  });
}
