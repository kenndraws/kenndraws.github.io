$(document).ready(function () {
    //initValidation("#myform");   //in validation.js, should set up submit event handler
    main();
});
let displayed = true;
function displayMobileMenu() {
    //Get Menu and Menu-Button for Slide Effect

    //If menu slide in or out
    if (displayed) {
        $("#Menu").addClass("slide");
        $("#menu-button").addClass("button-slide");
    }
    else {
        $("#Menu").removeClass("slide");
        $("#menu-button").removeClass("button-slide");
    }
    //Swap menu display true or false
    displayed = !displayed;
}


function displayClickedMenu() {
    //Get Menu Item to add event listeners to each input
    $("#Menu").children("input").each(function () {
        isChecked(this); //Display default checked which is Home
        $(this).change(function () {
            isChecked(this); //Display Checked
            var mq = window.matchMedia("(max-width: 1200px)");
            if (mq.matches) displayMobileMenu(); //If using mobile then slide menu after click

            // This prevents the page from scrolling down to where it was previously.
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
            }
            // This is needed if the user scrolls down during page load and you want to make sure the page is scrolled to the top once it's fully loaded. This has Cross-browser support.
            window.scrollTo(0, 0);
        });
    });

    function isChecked(input) {
        //if input is checked display section corresponding to the button hide rest
        if (input.checked) {
            $("main").children().each(function () {
                const $class = $(this).attr("class")
                if ($class.includes(input.id)) {
                    $(this).show();
                }
                else $(this).hide();
                
                
            });
        }
    }
}

function submitForm($form, event) {
    //called on form submit. Gets contents of form, creates visitor object, 
    formEl = $form.get(0); //formElement

    event.preventDefault();  //prevent default browser submit
    event.stopPropagation(); //stop event bubbling

    validateForm();

    if (!formEl.checkValidity()) {
        $(":input").addClass("was-validated")
    }
    else {
        $form.hide(); //Hide Form
        $(".successMsg").show(); //display success message

        event.preventDefault();
        const formData = new FormData(event.target);
        const formProps = Object.values(Object.fromEntries(formData));

        let finds = {}
        $(".find-checks").children("input").each(function () {
            finds[this.value] = this.checked;
        });

        modelAddVisitor(new Visitor(
            people.length + 1,
            formProps[0],
            formProps[1],
            formProps[2],
            formProps[3],
            formProps[4],
            formProps[5],
            formProps[7],
            formProps[6],
            finds,
        ));

        console.log(people);

        $form.each(function () {
            this.reset();
        });

        main();

        setTimeout(() => {
            //Reset the form view
            $form.show();
            $(".successMsg").hide();
        }, 1000)
    }
}
function displayStyleButtons(){
    $(".display_style").each(function () {
        $(this).click(function(){
            if(!$(this).attr("class").includes("selected_display_style")){
                $(".selected_display_style").removeClass("selected_display_style");
                $(this).addClass("selected_display_style");
                changeVisitorStyle();
            }
        })
    });
}
function changeVisitorStyle(){
    if(!$(".Visiters").attr("class").includes("visitor_grid")){
        $(".Visiters").addClass("visitor_grid");
        $(".log_header").hide();
        
    }
    else{
        $(".Visiters").removeClass("visitor_grid");
        $(".log_header").show();
    }
}
function addVisitor() {
    //called on 'click' of 'New Visitor' button 
    //calls view 'clearForm' to clear form contents
    //calls view 'showForm'
    
    $("#formCancel").show(); //At least one user has been logged then we can show
    showForm();

}

function deleteVisitor(id) {
    //called on 'click' of 'delete' icon in visitor list 
    //calls model.js modelDeleteVisitor
    //calls view 'renderTable' 
    //calls view 'showTable'
}