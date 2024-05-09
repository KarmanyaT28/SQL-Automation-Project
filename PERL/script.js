document.getElementById('updateForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);

    fetch('update.cgi', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('message').innerHTML = data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
