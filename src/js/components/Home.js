export default class Home {
    constructor($view){
        this.view = $view;
        this.bind();
    }

    bind(){

        $(window).on('resize scroll', ()=> {
            if(this.isInViewport($(".project-list"))){
                $(".project-list").addClass("animated");
                $(".project-description").addClass("animated");
            } else {
                $(".project-list").removeClass("animated");
                $(".project-description").removeClass("animated");
            };
        });
    }

    isInViewport(el){
        let elementTop = $(el).offset().top;
        let elementBottom = elementTop + $(el).outerHeight();
        let viewportTop = $(window).scrollTop();
        let viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };
}