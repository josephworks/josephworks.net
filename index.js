window.addEventListener("load", function() {
    alert('Page is loaded!');
    console.log('Page is loaded!')
});

window.onload = function() {
    alert("Please note that this site is still in development!");
    console.log('Please note that this site is still in development!')
};

document.getElementById('hello').textContent = 'Hello, Console!'