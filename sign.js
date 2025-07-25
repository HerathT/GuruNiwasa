let generatedOTP = "";
const otpModal = document.getElementById("otpModal");
const otpInput = document.getElementById("otpInput");
const otpError = document.getElementById("otpError");
const successModal = document.getElementById("successModal");

document.querySelector('.registration-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const phoneInput = document.querySelector('input[type="tel"]');
  const phoneNumber = phoneInput.value.trim();

  if (!/^\d{10}$/.test(phoneNumber)) {
    alert("Phone number must be exactly 10 digits.");
    phoneInput.focus();
    return;
  }

  // Simulate storing form data in localStorage
  const formData = {};
  document.querySelectorAll('.form-group input, .form-group select').forEach(input => {
    formData[input.previousElementSibling.innerText] = input.value.trim();
  });

  localStorage.setItem('GuruNiwasaUser', JSON.stringify(formData));

  // Simulate sending OTP
  generatedOTP = (Math.floor(1000 + Math.random() * 9000)).toString(); // 4-digit OTP
  console.log("Simulated OTP (for demo):", generatedOTP); // For demo only

  otpModal.style.display = "flex";
});

function verifyOTP() {
  const enteredOTP = otpInput.value.trim();
  if (enteredOTP === generatedOTP) {
    otpModal.style.display = "none";
    successModal.style.display = "flex";
  } else {
    otpError.innerText = "Incorrect OTP. Please try again.";
  }
}

function closeOTPModal() {
  otpModal.style.display = "none";
}

function closeSuccessModal() {
  successModal.style.display = "none";
  window.location.href = "login.html"; // Redirect to login after successful registration
}
