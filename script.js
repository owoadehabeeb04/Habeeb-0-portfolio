"strict mode";
// hamburgermenu
const hamburger = document.querySelector('.hamburger')
const list = document.querySelector('.navlink ul')
const close = document.querySelector('.close')
console.log(list);
console.log(
hamburger.addEventListener('click', function(){
close.classList.remove('hidden')
list.classList.add('listed')
hamburger.style.opacity = '0'

}))
close.addEventListener('click', function(){
    list.classList.remove('listed')
    close.classList.add('hidden') 
   
    hamburger.style.opacity = '1'
})

// Activenav

const nav_items = document.querySelectorAll('.nav_link_item')

nav_items.forEach((navs)=>{
    navs.addEventListener('click', function(){
        list.classList.remove('listed')
        close.classList.add('hidden') 
        hamburger.style.opacity = '1'
        nav_items.forEach((navs)=>{
            navs.classList.remove('activeNav')
        })
        navs.classList.add('activeNav')
    })
})

// Project Tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
});

