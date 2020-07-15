(function($) {
    $(document).ready(function() {
        /**
         * Career form
         */
        $(document).on('click', '#apply-now-trigger', function(e) {
            e.preventDefault();
            $("#applyNowModal").modal('show');
        })

        var allowed_file_size 	= "1048576"; //1 MB allowed file size
        var allowed_file_types 	= [ 'image/png', 'image/gif', 'image/jpeg', 'image/pjpeg',
            'application/x-zip-compressed', 'application/pdf', 'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]; //Allowed file types
        var border_color 		= "#C2C2C2"; //initial input border color
        var maximum_files 		= 1; //Maximum number of files allowed

        $("#contact_form").submit(function(e){
            e.preventDefault(); //prevent default action
            proceed = true;

            //simple input validation
            $($(this).find("input[data-required=true], textarea[data-required=true]")).each(function(){
                if(!$.trim($(this).val())){ //if this field is empty
                    $(this).css('border-color','red'); //change border color to red
                    proceed = false; //set do not proceed flag
                }
                //check invalid email
                var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
                    $(this).css('border-color','red'); //change border color to red
                    proceed = false; //set do not proceed flag
                }
            }).on("input", function(){ //change border color to original
                $(this).css('border-color', border_color);
            });

            //check file size and type before upload, works in all modern browsers
            if(window.File && window.FileReader && window.FileList && window.Blob){
                var total_files_size = 0;
                if(this.elements['file_attach[]'].files.length > maximum_files){
                    alert( "Can not select more than "+maximum_files+" file(s)");
                    proceed = false;
                }
                $(this.elements['file_attach[]'].files).each(function(i, ifile){
                    if(ifile.value !== ""){ //continue only if file(s) are selected
                        if(allowed_file_types.indexOf(ifile.type) === -1){ //check unsupported file
                            alert( ifile.name + " is not allowed!");
                            proceed = false;
                        }
                        total_files_size = total_files_size + ifile.size; //add file size to total size
                    }
                });
                if(total_files_size > allowed_file_size){
                    alert( "Make sure total file size is less than 1 MB!");
                    proceed = false;
                }
            }

            var post_url = $(this).attr("action"); //get form action url
            var request_method = $(this).attr("method"); //get form GET/POST method
            var form_data = new FormData(this); //Creates new FormData object

            //if everything's ok, continue with Ajax form submit
            if(proceed){
                $.ajax({ //ajax form submit
                    url : post_url,
                    type: request_method,
                    data : form_data,
                    dataType : "json",
                    contentType: false,
                    cache: false,
                    processData:false,
                    success: function(res) {
                        console.log(res)
                    }
                }).done(function(res){ //fetch server "json" messages when done
                    if(res.type == "error"){
                        $("#contact_results").html('<div class="error">'+ res.text +"</div>");
                    }
                    if(res.type == "done"){
                        $("#contact_results").html('<div class="success">'+ res.text +"</div>");
                    }
                });
            }
        });


        /**
         * Navigation
         */
        if ($(window).width() < 1200) {
            // $('.nav-opened').addClass('mobilenav');
        };

        $('.navbar-toggler').on('click', function() {
            $('div.mobilenav').toggleClass('opened');
            $('body').toggleClass('overflow-none');
            $('div.mobilenav').addClass('animated');
        });

       /* $('.slick-partners').slick({
            slidesToShow: 3,
            variableWidth: false,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        variableWidth: true,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 2700,
                        infinite: true,
                    }
                },
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });*/

        /**
         * Demo modal
         */
        $('#menu-item-1819').on('click', function(e) {
            e.preventDefault();
            $('#trial-modal').modal('show');
        })
        $('#menu-item-1826').on('click', function(e) {
            e.preventDefault();
            $('#trial-modal').modal('show');
        })
        $('.modal-open').on('click', function(e) {
            e.preventDefault();
            $('#trial-modal').modal('show');
        })
    });

    
})(jQuery);

document.querySelector('.menu-item-has-children').addEventListener('click', () => {
    event.currentTarget.classList.toggle('rotate');
    event.preventDefault();
    document.querySelector('.dropdown-menu').addEventListener('click', () => {
        event.stopPropagation();
    })

   
});
