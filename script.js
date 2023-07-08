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

