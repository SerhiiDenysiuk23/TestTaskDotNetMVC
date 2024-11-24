const stepsContent = [
  {
    title: "1. Choose game types",
    description: "You can choose several options for this question.",
    options: ["Holdem", "Omaha", "Chinese", "Stud", "Razz"]
  },
  {
    title: "2. Choose formats",
    description: "You can choose one option for this question.",
    options: ["MTT", "SnG", "Cash"]
  },
  {
    title: "3. Choose operating systems",
    description: "You can choose several options for this question.",
    options: ["Windows", "MacOS", "Android", "IOS", "Web"]
  },
  {
    title: "4. Choose payment systems",
    description: "You can choose several options for this question.",
    options: ["Visa", "Mastercard", "Skrill", "Neteller", "Bitcoin"]
  }
];



$(document).ready(function () {
  let currentStep = 0;
  let userData = []

  function collectCurrentStepData() {
    const selectedOptions = [];
    $("#dataForm input:checked").each(function () {
      selectedOptions.push($(this).next("label").text());
    });
    userData[currentStep] = selectedOptions;
  }

  function preloadStepData() {
    const answersForStep = userData[currentStep] || [];
    $("#dataForm input").each(function () {
      const label = $(this).next("label").text();
      $(this).prop("checked", answersForStep.includes(label));
    });
  }

  function renderProgressDots() {
    const progressHtml = stepsContent
      .map(
        (_, index) =>
          `<div class="progress__dot ${index === 0 ? "active" : ""
          }" data-step="${index}"></div>`
      )
      .join("");

    $(".progress").html(`
          <div class="progress__line progress__line__active"></div>
          <div class="progress__line progress__line__bg"></div>
          ${progressHtml}
        `);
  }

  function updateProgressDots() {
    const totalSteps = stepsContent.length - 1;
    const progressWidth = (currentStep / totalSteps) * 100;

    $(".progress__dot").each(function (index) {
      $(this).toggleClass("active", index <= currentStep);
    });

    $(".progress__line__active").css("width", `${progressWidth}%`).addClass("active");
  }

  function updateModalContent() {
    const step = stepsContent[currentStep];
    const optionsHtml = step.options
      .map(
        (option, index) => currentStep === 1
          ? `
                    <div class="form-check">
                      <input type="radio" id="option${index}" name="radio-group" class="form-check-input">
                      <label for="option${index}" class="form-check-label">${option}</label>
                    </div>
                  `
          : `
                    <div class="form-check">
                      <input type="checkbox" id="option${index}" class="form-check-input">
                      <label for="option${index}" class="form-check-label">${option}</label>
                    </div>
                  `
      )
      .join("");

    $("#modalContent").html(`
      <h6>${step.title}</h6>
      <p>${step.description}</p>
      <form id="dataForm">${optionsHtml}</form>
    `);

    updateProgressDots();
    preloadStepData();

    if (currentStep === stepsContent.length - 1) {
      $("#nextButton").text("Send");
    } else {
      $("#nextButton").text("Next question");
    }
  }

  $("#openModalButton").click(function () {
    currentStep = 0;
    renderProgressDots();
    updateModalContent();
    $("#modalOverlay, #formModal").fadeIn();
  });

  $("#closeModalButton, #modalOverlay").click(function () {
    $("#modalOverlay, #formModal").fadeOut();
  });

  $("#nextButton").click(function () {
    collectCurrentStepData();
    if (currentStep < stepsContent.length - 1) {
      currentStep++;
      updateModalContent();
    } else {
      $.ajax({
        url: "/Home/Submit",
        type: "POST",
        data: JSON.stringify({Answers: userData}),
        contentType: "application/json",
        success: function (response) {
          console.log(response.data)
          alert(response.message);
          $("#modalOverlay, #formModal").fadeOut();
        },
        error: function (error) {
          alert("Something went wrong. Please try again.");
        }
      });
    }
  });

  $("#prevButton").click(function () {
    if (currentStep > 0) {
      collectCurrentStepData();
      currentStep--;
      updateModalContent();
    }
  });
});