window.addEventListener('load', function() {
    $(document).ready(function () {
        let techInfo1024_1 = $('.tech-info-1024-1');
        let svgBorder = $('#svg-border');
        let svgCircle = $('#svg-circle')

        let techInfo2 = $(".tech-info-2");
        let techInfo1024_2 = $('.tech-info-1024-2');
        let techInfo3 = $(".tech-info-3");
        let techInfo1024_3 = $('.tech-info-1024-3');
        let techInfo4 = $(".tech-info-4");
        let techInfo1024_4 = $('.tech-info-1024-4');
        let techInfo5 = $(".tech-info-5");
        let techInfo1024_5 = $('.tech-info-1024-5');


        // Функции для блока technologies
        const mouseenterActions = (techInfo1024_num) => {
            return function () {
                techInfo1024_num.css("display", "block");
                techInfo1024_1.css("display", "none");
                svgBorder.css("stroke", "#ECC66BFF");
                svgCircle.css("fill", "#ECC66BFF");
            };
        };
        const mouseleaveActions = (techInfo1024_num) => {
            return function () {
                techInfo1024_num.css("display", "none");
                techInfo1024_1.css("display", "block");
                svgBorder.css("stroke", "#fcedcb");
                svgCircle.css("fill", "#fcedcb");
            }
        }

        techInfo2.on('mouseenter', mouseenterActions(techInfo1024_2));
        techInfo2.on('mouseleave', mouseleaveActions(techInfo1024_2));
        techInfo3.on('mouseenter', mouseenterActions(techInfo1024_3));
        techInfo3.on('mouseleave', mouseleaveActions(techInfo1024_3));
        techInfo4.on('mouseenter', mouseenterActions(techInfo1024_4));
        techInfo4.on('mouseleave', mouseleaveActions(techInfo1024_4));
        techInfo5.on('mouseenter', mouseenterActions(techInfo1024_5));
        techInfo5.on('mouseleave', mouseleaveActions(techInfo1024_5));


        function checkNumber(e, Maxlength) {
            if (isNaN(parseInt(e.key)) && e.key !== "Backspace") {
                return false;
            }
            if ($(e.target).val().length >= Maxlength && e.key !== "Backspace") {
                return false;
            }
        }

        let menu = $(".menu")
        $("#burger").click(function () {
            menu.addClass("menu-active");
        })
        $("#menu-close").click(function () {
            menu.removeClass("menu-active");
        })
        let otherProjectsButton = $(".other-projects-button");
        otherProjectsButton.click(function () {
            $(".other-projects-content").css("display", "block");
            otherProjectsButton.css("display", "none");
        })
        let closePopup = $("#closePopup");
        let excursionButton = $(".excursion-button");
        let excursionPopup = $(".excursion-popup");
        let excursionFormButton = $(".excursion-form-button");

        excursionButton.click(function () {
            excursionPopup.css("display", "block");
        })
        closePopup.click(function () {
            excursionPopup.css("display", "none");
        })

        let excursionPhoneInput = $("#excursionPhoneInput");
        let excursionPeopleInput = $("#excursionPeopleInput");

        // Валидация order-form
        let nameInput = $("#nameInput");
        let phoneInput = $("#phoneInput");
        let checkbox = $("#checkbox");
        let loader = $(".loaderDiv");
        let checkmark = $(".checkmark");

        $("#order-button").click(function () {
            $(".orderErrorDiv").hide();
            nameInput.css("border-color", "#fff");
            phoneInput.css("border-color", "#fff");
            checkmark.css("border-color", "#fff");
            let hasError = false;

            if (!nameInput.val()) {
                nameInput.next().css("display", "block");
                nameInput.css("border-color", "red");
                hasError = true;
            }
            if (!phoneInput.val()) {
                phoneInput.next().css("display", "block");
                phoneInput.css("border-color", "red");
                hasError = true;
            }
            if (!checkbox.is(":checked")) {
                checkmark.css("border-color", "red");
                hasError = true;
            }

            if (!hasError) {
                loader.css("display", "flex");
                $.ajax({
                    method: "POST",
                    url: "https://testologia.ru/checkout",
                    data: {name: nameInput.val(), phone: phoneInput.val()},
                })
                    .done(function (msg) {
                        loader.hide();
                        if (msg.success) {
                            $(".hideForThanks").css("display", "none");
                            $(".order-thanks").css("display", "block");
                        } else {
                            alert("Возникла ошибка при записи на консультацию, позвоните нам и мы вас проконсультируем");
                        }
                    });
            }
        })

        // Валидация excursion-form
        excursionFormButton.click(function () {
            let excursionNameInput = $("#excursionNameInput");
            let excursionDateInput = $("#excursionDateInput");
            let hasError = false;

            $(".excursionErrorDiv").hide();
            excursionNameInput.css("border-color", "#fff");
            excursionPhoneInput.css("border-color", "#fff");
            excursionDateInput.css("border-color", "#fff");
            excursionPeopleInput.css("border-color", "#fff");

            if (!excursionNameInput.val()) {
                excursionNameInput.next().css("display", "block");
                excursionNameInput.css("border-color", "red");
                hasError = true;
            }
            if (!excursionPhoneInput.val()) {
                excursionPhoneInput.next().css("display", "block");
                excursionPhoneInput.css("border-color", "red");
                hasError = true;
            }
            if (!excursionDateInput.val()) {
                excursionDateInput.next().css("display", "block");
                excursionDateInput.css("border-color", "red");
                hasError = true;
            }
            if (!excursionPeopleInput.val()) {
                excursionPeopleInput.next().css("display", "block");
                excursionPeopleInput.css("border-color", "red");
                hasError = true;
            }


            if (!hasError) {
                loader.css("display", "flex");
                $.ajax({
                    method: "POST",
                    url: "https://testologia.ru/checkout",
                    data: {
                        name: excursionNameInput.val(),
                        phone: excursionPhoneInput.val(),
                        date: excursionDateInput.val(),
                        people: excursionPeopleInput.val()
                    },
                })
                    .done(function (msg) {
                        loader.hide();
                        if (msg.success) {
                            excursionPopup.css("display", "none");
                            excursionButton.css("display", "none");
                            $(".excursion-thanks").css("display", "block");
                        } else {
                            alert("Возникла ошибка при записи на экскурсию, позвоните нам и мы запишем вас на экскурсию");
                            [excursionNameInput, excursionPhoneInput, excursionDateInput, excursionPeopleInput].forEach(function (e) {
                                $(e).val('');
                            });
                        }
                    });
            }
        })

        excursionPhoneInput.keydown(function (e) {
            return checkNumber(e, 15);
        })
        excursionPeopleInput.keydown(function (e) {
            return checkNumber(e, 1);
        })


        // Плавный скролл
        $('#technologiesScroll').click(function () {
            $(".technologies").get(0).scrollIntoView({behavior: "smooth"});
        })

        $('.scrollToOrder').click(function () {
            $("#order").get(0).scrollIntoView({behavior: "smooth"});
        })
        $('#projectsScroll').click(function () {
            $(".projects").get(0).scrollIntoView({behavior: "smooth"});
        })
        $('#conditionsScroll').click(function () {
            $(".conditions").get(0).scrollIntoView({behavior: "smooth"});
        })
        $('#stepsScroll').click(function () {
            $(".steps").get(0).scrollIntoView({behavior: "smooth"});
        })


        // использование сторонних ресурсов
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
        });

        $('.examples-slider').slick({
            dots: true,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                }
            ]
        });
        new WOW(
            {
                animateClass: 'animate__animated',
            }
        ).init();

    })
});
