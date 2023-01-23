function toggleMenu() {
    const menuContainer = document.getElementById("menuContainer");
    menuContainer.classList.remove("defaultMenu");
    menuContainer.classList.add("defaultMenu");
    menuContainer.classList.toggle("hideMenu");
    menuContainer.classList.toggle("showMenu");
}