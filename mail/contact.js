$(function () {

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            $.ajax({
                url: "https://formspree.io/f/xrbokkez",
                type: "POST",
                dataType: 'json',
                headers: {
                    'Accept': 'application/json'
                },
                data: {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                },
                cache: false,
                success: function (response) {
                    // Show inline success message near the send button
                    $('#formFeedback').html("<div class='alert alert-success' role='alert'>Message sent successfully!!</div>");
                    $('#contactForm').trigger("reset");
                },
                error: function (xhr) {
                    // Show inline error message near the send button
                    var errMsg = "Sorry " + name + ", it seems there was an error sending your message. Please try again later.";
                    $('#formFeedback').html("<div class='alert alert-danger' role='alert'>" + errMsg + "</div>");
                    $('#contactForm').trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                }
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#formFeedback').html('');
});
