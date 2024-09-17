let toggleElement = document.getElementById("toggle");
let bodyElement = document.getElementById("bodyElement");
let theme = localStorage.getItem("theme1");

if (!theme) {
	localStorage.setItem("theme1", "light");
}
console.log(theme);
if (theme === "dark") {
	bodyElement.classList.add("dark");
	toggleElement.checked = true;
}

toggleElement.addEventListener("click", function () {
	if (toggleElement.checked) {
		bodyElement.classList.add("dark");
	  localStorage.setItem("theme1","dark")
	} else {
		bodyElement.classList.remove("dark");
		localStorage.setItem("light")
	}
});
