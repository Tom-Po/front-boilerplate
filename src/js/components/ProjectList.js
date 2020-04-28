export default class ProjectList {
    constructor($view) {
        this.view = $view;
        this.$listItems = this.view.find('.project-list-item');
        this.$description = this.view.find('.project-description');
        this.bind();
    }
    bind(){
         $(this.$listItems).each((i, el) => {
             $(el).on('click', 'a', (e)=> {
                e.preventDefault();
                let title = $(e.currentTarget).text();
                this.setActive(e.currentTarget);
                 $(this.$description).removeClass("animated");
                 $(this.$description).css('opacity', 0);
                 setTimeout(() => {
                    let descriptionTitle = $(this.$description).find('h3'); 
                    $(descriptionTitle).text(title)
                    $(this.$description).css('opacity', 1);
                    $(this.$description).addClass("animated");
                 }, 100);
             })
         })
    }   
    setActive(el){
        $(this.$listItems).each((i, el)=> {
            $(el).find('a').removeClass("active")
        });
        $(el).addClass('active');
          
    }
}